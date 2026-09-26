# db

A arquitetura será:

HTTP
 ↓
Route
 ↓
Controller       → recebe HTTP / devolve HTTP
 ↓
Service          → regra de negócio
 ↓
Repository       → acesso ao MongoDB
 ↓
Model            → estrutura/validação do documento
 ↓
MongoDB

```powershell
npm run dev          # sobe a API local (porta 3000)
npm run seed:admin   # cria o admin usando ADMIN_EMAIL / ADMIN_PASSWORD do .env
```

---

# Comandos da API (PowerShell)

## 0. Preparação (rode sempre primeiro no terminal)

```powershell
# Escolha UM dos dois
$baseUrl = "http://localhost:3000"
# $baseUrl = "https://swimrank-api.onrender.com"

# charset=utf-8 evita o "Jo�o" no banco (PowerShell 5.1 manda ISO-8859-1 por padrão)
$json = "application/json; charset=utf-8"
```

Health check:

```powershell
Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
```

### Resumo das rotas

| Recurso | Método | Rota | Auth |
|---|---|---|---|
| Auth | POST | `/auth/login` | — |
| Users | POST / GET / GET :id / PATCH :id / DELETE :id | `/users` | ADMIN |
| Participants | POST / GET / GET :id / PATCH :id / DELETE :id | `/participants` | — |
| Trainings | POST / GET / GET :id / PATCH :id / DELETE :id | `/trainings` | — |
| Activities | POST / GET / GET :id / PATCH :id / DELETE :id | `/activities` | — |
| Activities | GET | `/activities/participant/:participantId` | — |
| Activities | PATCH | `/activities/:id/validation` | TEACHER ou ADMIN |
| Rankings | GET | `/rankings/weekly?date=` `/weekly/distance?date=` `/weekly/attendance?date=` `/monthly?date=` `/general` | — |
| Achievements | GET / GET :id | `/achievements` | — |
| Achievements | POST / PATCH :id / DELETE :id | `/achievements` | ADMIN |
| Participant achievements | POST / GET | `/participant-achievements` | TEACHER ou ADMIN |
| Participant achievements | GET :id / GET participant/:participantId | `/participant-achievements` | — |

> Participant achievements **não tem** PATCH nem DELETE.

---

## 1. Auth (login)

Login como admin:

```powershell
$loginAdmin = Invoke-RestMethod `
  -Uri "$baseUrl/auth/login" `
  -Method POST `
  -ContentType $json `
  -Body '{"email":"admin@swimrank.com","password":"SUA_SENHA"}'

$adminToken = $loginAdmin.token
$loginAdmin.user
```

Login como professor:

```powershell
$loginTeacher = Invoke-RestMethod `
  -Uri "$baseUrl/auth/login" `
  -Method POST `
  -ContentType $json `
  -Body '{"email":"professor@swimrank.com","password":"SUA_SENHA"}'

$teacherToken = $loginTeacher.token
$loginTeacher.user
```

Headers prontos pra reaproveitar:

```powershell
$adminHeaders   = @{ Authorization = "Bearer $adminToken" }
$teacherHeaders = @{ Authorization = "Bearer $teacherToken" }
```

> O token expira em **8h**. Se der `401 INVALID_TOKEN`, faça login de novo.

---

## 2. Users (somente ADMIN)

Campos: `name` (2–100), `email`, `password` (6–100, só no POST), `role` (`TEACHER` | `ADMIN`).

**Criar**

```powershell
$body = @{
  name     = "Professor SwimRank"
  email    = "professor@swimrank.com"
  password = "123456"
  role     = "TEACHER"
} | ConvertTo-Json

$user = Invoke-RestMethod `
  -Uri "$baseUrl/users" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType $json `
  -Body $body

$userId = $user._id
$user
```

**Listar todos**

```powershell
Invoke-RestMethod -Uri "$baseUrl/users" -Method GET -Headers $adminHeaders |
  ConvertTo-Json -Depth 10
```

**Buscar por id**

```powershell
Invoke-RestMethod -Uri "$baseUrl/users/$userId" -Method GET -Headers $adminHeaders
```

**Alterar** (pelo menos 1 campo; senha não pode ser alterada aqui)

```powershell
$body = @{ name = "Professor Lucas"; role = "TEACHER" } | ConvertTo-Json

Invoke-RestMethod `
  -Uri "$baseUrl/users/$userId" `
  -Method PATCH `
  -Headers $adminHeaders `
  -ContentType $json `
  -Body $body
```

**Deletar**

```powershell
Invoke-RestMethod -Uri "$baseUrl/users/$userId" -Method DELETE -Headers $adminHeaders
```

---

## 3. Participants (sem auth)

Campos: `name` (2–100), `birthdate` (`YYYY-MM-DD`). `points` é calculado pelo sistema.
Não pode repetir o mesmo `name` + `birthdate` (409 `PARTICIPANT_ALREADY_EXISTS`).

**Criar**

```powershell
$body = @{ name = "João Silva"; birthdate = "2000-05-15" } | ConvertTo-Json

$participant = Invoke-RestMethod `
  -Uri "$baseUrl/participants" `
  -Method POST `
  -ContentType $json `
  -Body $body

$participantId = $participant._id
$participant
```

**Listar todos**

```powershell
Invoke-RestMethod -Uri "$baseUrl/participants" -Method GET | ConvertTo-Json -Depth 10
```

**Buscar por id**

```powershell
Invoke-RestMethod -Uri "$baseUrl/participants/$participantId" -Method GET
```

**Alterar**

```powershell
$body = @{ name = "João da Silva" } | ConvertTo-Json

Invoke-RestMethod `
  -Uri "$baseUrl/participants/$participantId" `
  -Method PATCH `
  -ContentType $json `
  -Body $body
```

**Deletar**

```powershell
Invoke-RestMethod -Uri "$baseUrl/participants/$participantId" -Method DELETE
```

Conferir no mongosh:

```
mongosh
use swimrank
db.participants.find().pretty()
```

---

## 4. Trainings (sem auth)

Campos: `date` (`YYYY-MM-DD`), `type` (até 50), `isMain` (boolean).
Só pode existir **1 treinamento principal (`isMain: true`) por semana** (409 `MAIN_TRAINING_ALREADY_EXISTS`).

**Criar**

```powershell
$body = @{ date = "2026-09-28"; type = "FREESTYLE"; isMain = $true } | ConvertTo-Json

$training = Invoke-RestMethod `
  -Uri "$baseUrl/trainings" `
  -Method POST `
  -ContentType $json `
  -Body $body

$trainingId = $training._id
$training
```

**Listar todos**

```powershell
Invoke-RestMethod -Uri "$baseUrl/trainings" -Method GET | ConvertTo-Json -Depth 10
```

**Buscar por id**

```powershell
Invoke-RestMethod -Uri "$baseUrl/trainings/$trainingId" -Method GET
```

**Alterar**

```powershell
$body = @{ date = "2026-10-05"; isMain = $true } | ConvertTo-Json

Invoke-RestMethod `
  -Uri "$baseUrl/trainings/$trainingId" `
  -Method PATCH `
  -ContentType $json `
  -Body $body
```

**Deletar**

```powershell
Invoke-RestMethod -Uri "$baseUrl/trainings/$trainingId" -Method DELETE
```

---

## 5. Activities

Campos: `participantId`, `date` (`YYYY-MM-DD`), `type` (até 50), `distance` (> 0, metros), `time` (> 0, segundos).
Toda atividade nasce com `status: PENDING` e `points: 0`. Os pontos só entram quando um professor/admin aprova.

**Criar** (sem auth)

```powershell
$body = @{
  participantId = $participantId
  date          = "2026-09-23"
  type          = "BACKSTROKE"
  distance      = 1000
  time          = 1800
} | ConvertTo-Json

$activity = Invoke-RestMethod `
  -Uri "$baseUrl/activities" `
  -Method POST `
  -ContentType $json `
  -Body $body

$activityId = $activity._id
$activity
```

**Listar todas**

```powershell
Invoke-RestMethod -Uri "$baseUrl/activities" -Method GET | ConvertTo-Json -Depth 10
```

**Listar atividades de um participante**

```powershell
Invoke-RestMethod -Uri "$baseUrl/activities/participant/$participantId" -Method GET |
  ConvertTo-Json -Depth 10
```

**Buscar por id**

```powershell
Invoke-RestMethod -Uri "$baseUrl/activities/$activityId" -Method GET
```

**Alterar** (não altera `participantId` nem `status`)

```powershell
$body = @{ distance = 1500; time = 2400 } | ConvertTo-Json

Invoke-RestMethod `
  -Uri "$baseUrl/activities/$activityId" `
  -Method PATCH `
  -ContentType $json `
  -Body $body
```

**Validar (aprovar / rejeitar)** — precisa de token TEACHER ou ADMIN

```powershell
Invoke-RestMethod `
  -Uri "$baseUrl/activities/$activityId/validation" `
  -Method PATCH `
  -Headers $teacherHeaders `
  -ContentType $json `
  -Body '{"status":"APPROVED"}'    # ou "REJECTED"
```

> Só valida uma vez (409 `ACTIVITY_ALREADY_VALIDATED`).

**Deletar**

```powershell
Invoke-RestMethod -Uri "$baseUrl/activities/$activityId" -Method DELETE
```

---

## 6. Rankings (somente leitura, sem auth)

`date` é obrigatório (`YYYY-MM-DD`) em todos, menos no geral. A semana vai de segunda a domingo da data informada.

```powershell
# Semanal por pontos
Invoke-RestMethod -Uri "$baseUrl/rankings/weekly?date=2026-09-23" -Method GET | ConvertTo-Json -Depth 10

# Semanal por distância
Invoke-RestMethod -Uri "$baseUrl/rankings/weekly/distance?date=2026-09-23" -Method GET | ConvertTo-Json -Depth 10

# Semanal por presença
Invoke-RestMethod -Uri "$baseUrl/rankings/weekly/attendance?date=2026-09-23" -Method GET | ConvertTo-Json -Depth 10

# Mensal (mês da data informada)
Invoke-RestMethod -Uri "$baseUrl/rankings/monthly?date=2026-09-01" -Method GET | ConvertTo-Json -Depth 10

# Geral
Invoke-RestMethod -Uri "$baseUrl/rankings/general" -Method GET | ConvertTo-Json -Depth 10
```

---

## 7. Achievements (conquistas)

Campos: `name` (2–100), `description` (até 500), `category` (até 50), `points` (≥ 0),
`requirement.type` (`FIRST_ACTIVITY` | `TOTAL_DISTANCE` | `RANKING_POSITION` | `PARTICIPATION_MONTHS`), `requirement.value` (≥ 0).

**Criar** (ADMIN)

```powershell
$body = @{
  name        = "Primeira Braçada"
  description = "Registre sua primeira atividade de natação."
  category    = "FIRST_STEPS"
  requirement = @{ type = "FIRST_ACTIVITY"; value = 1 }
  points      = 100
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType $json `
  -Body $body

$achievementId = $achievement._id
$achievement | ConvertTo-Json -Depth 10
```

Outros exemplos de requisito:

```powershell
requirement = @{ type = "TOTAL_DISTANCE";       value = 10000 }  # 10 km acumulados
requirement = @{ type = "RANKING_POSITION";     value = 1 }      # ficar em 1º
requirement = @{ type = "PARTICIPATION_MONTHS"; value = 3 }      # 3 meses participando
```

**Listar todas** (sem auth)

```powershell
Invoke-RestMethod -Uri "$baseUrl/achievements" -Method GET | ConvertTo-Json -Depth 10
```

**Buscar por id** (sem auth)

```powershell
Invoke-RestMethod -Uri "$baseUrl/achievements/$achievementId" -Method GET | ConvertTo-Json -Depth 10
```

**Alterar** (ADMIN)

```powershell
$body = @{
  description = "Registre e tenha sua primeira atividade de natação aprovada."
  points      = 120
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "$baseUrl/achievements/$achievementId" `
  -Method PATCH `
  -Headers $adminHeaders `
  -ContentType $json `
  -Body $body |
  ConvertTo-Json -Depth 10
```

**Deletar** (ADMIN)

```powershell
Invoke-RestMethod -Uri "$baseUrl/achievements/$achievementId" -Method DELETE -Headers $adminHeaders
```

---

## 8. Participant achievements (conquista desbloqueada por participante)

Campos: `participantId`, `achievementId`. O participante não pode ganhar a mesma conquista 2x (409 `ACHIEVEMENT_ALREADY_UNLOCKED`).

**Criar / conceder** (TEACHER ou ADMIN)

```powershell
$body = @{
  participantId = $participantId
  achievementId = $achievementId
} | ConvertTo-Json

$participantAchievement = Invoke-RestMethod `
  -Uri "$baseUrl/participant-achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType $json `
  -Body $body

$participantAchievementId = $participantAchievement._id
$participantAchievement | ConvertTo-Json -Depth 10
```

**Listar todas** (TEACHER ou ADMIN)

```powershell
Invoke-RestMethod -Uri "$baseUrl/participant-achievements" -Method GET -Headers $adminHeaders |
  ConvertTo-Json -Depth 10
```

**Listar conquistas de um participante** (sem auth)

```powershell
Invoke-RestMethod -Uri "$baseUrl/participant-achievements/participant/$participantId" -Method GET |
  ConvertTo-Json -Depth 10
```

**Buscar por id** (sem auth)

```powershell
Invoke-RestMethod -Uri "$baseUrl/participant-achievements/$participantAchievementId" -Method GET |
  ConvertTo-Json -Depth 10
```

---

## 9. Fluxo completo de teste (copiar e colar em ordem)

1. Seção 0 → define `$baseUrl` e `$json`
2. Seção 1 → login admin (`$adminHeaders`)
3. Seção 2 → cria um professor e faz login com ele (`$teacherHeaders`)
4. Seção 3 → cria participante (`$participantId`)
5. Seção 5 → cria atividade (`$activityId`) e valida com `$teacherHeaders`
6. Seção 6 → confere o ranking
7. Seção 7 e 8 → cria conquista e concede ao participante

## Ver o erro completo quando a API responde 4xx/5xx

O `Invoke-RestMethod` esconde o JSON do erro. Para ver o `details` da validação:

```powershell
try {
  Invoke-RestMethod -Uri "$baseUrl/participants" -Method POST -ContentType $json -Body '{}'
} catch {
  $_.ErrorDetails.Message
}
```
