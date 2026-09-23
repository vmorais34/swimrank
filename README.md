# swimrank

Projeto desenvolvido no Projeto de Extensão VI para o parceiro Patrick Esportes.
O objetivo é fomentar através de estratégoas interativas e motivacionais para aumentar adesão e aproveitamento, além de reduzir a taxa de abandono.

## Funcionalidades

O SwimRank V1 será composto pelas seguintes funcionalidades principais:
**Cadastro/Login**: será feito com nome e data de nascimento. E o login sendo feito apenas com data de nascimento.

**Pontuação:** cada participante possuirá uma pontuação associada às atividades registradas e checadas pelos professores. 
obs: **O participante não pode alterar points diretamente.**

**Ranking:** os participantes poderão visualizar sua posição em relação aos demais alunos, utilizando a classificação como elemento de gamificação.

**Histórico:** o sistema permitirá visualizar de forma simplificada as atividades e os resultados registrados para cada participante.

**Conquistas:** determinadas condições poderão desbloquear conquistas, como atingir determinada quantidade de atividades, determinada pontuação ou distância.

**Gerenciamento pelos professores:** os responsáveis pelas atividades poderão registrar ou validar a participação dos alunos e seus respectivos resultados.


#### As tecnologias inicialmente previstas são:
1. React Native: desenvolvimento da aplicação com foco em dispositivos móveis e possibilidade de reutilização da base tecnológica em futuras versões.
2. TypeScript: tipagem estática e maior segurança durante o desenvolvimento e manutenção do código.
3. Node.js: execução do ambiente de backend.
4. Express: desenvolvimento da API responsável pela comunicação entre a aplicação e o servidor.
5. MongoDB: armazenamento dos dados da aplicação.
6. Git/GitHub: versionamento e organização do código-fonte.


#### Modelo de dados inicial
O modelo inicial será estruturado de forma simples, contemplando os principais elementos necessários para o funcionamento da gamificação.

User - Admin/Teacher
├── _id
├── name
├── email
├── passwordHash
├── role: TEACHER | ADMIN
├── createdAt
└── updatedAt

Participant
├── _id
├── name
├── birthdate
├── points
├── createdAt
└── updatedAt


Training
├── _id
├── date
├── type
├── isMain
├── createdAt
└── updatedAt


Activity
├── _id
├── participantId
├── date
├── type
├── distance
├── time
├── points
├── status
├── validatedAt
├── createdAt
└── updatedAt


Achievement
├── _id
├── name
├── description
├── requirement
│   ├── type
│   └── target
└── points


ParticipantAchievement
├── _id
├── participantId
├── achievementId
├── unlockedAt
└── createdAt

é preciso ter:

type: "ACTIVITY_COUNT"
target: 10

ou:

**Em metros**
type: "DISTANCE"
target: 50

ou:

type: "POINTS"
target: 500

Isso é uma decisão que podemos deixar para quando implementar Achievement.


### Role 
Resumo

No SwimRank, o cadastro de usuários da API é privado: somente usuários com role: ADMIN podem criar, listar, editar ou excluir outros usuários. O primeiro administrador é criado através do seed-admin, enquanto os demais professores são criados pelo ADMIN autenticado usando POST /users. Professores (TEACHER) podem fazer login e executar as operações permitidas a esse papel, mas não podem gerenciar usuários. As senhas nunca são armazenadas em texto puro: são transformadas em passwordHash com bcrypt, e esse hash nunca é retornado pela API. Para acessar a área administrativa, basta fazer login, guardar o JWT retornado e enviá-lo como Authorization: Bearer <token> nas requisições protegidas.

🔑 Primeiro ADMIN — somente se precisar recriá-lo
npm run seed:admin

As credenciais ficam no .env:

ADMIN_EMAIL=admin@swimrank.com
ADMIN_PASSWORD=123456

O seed verifica se o email já existe antes de criar, então pode ser executado novamente sem duplicar o ADMIN.

👨‍🏫 Criar um novo professor

1. Login como ADMIN:

$loginAdmin = Invoke-RestMethod `
  -Uri "http://localhost:3000/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{
    "email": "admin@swimrank.com",
    "password": "123456"
  }'

$adminToken = $loginAdmin.token

2. Criar o professor:

$body = @{
    name = "Nome do Professor"
    email = "professor@email.com"
    password = "senha-do-professor"
    role = "TEACHER"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:3000/users" `
  -Method POST `
  -Headers @{
    Authorization = "Bearer $adminToken"
  } `
  -ContentType "application/json" `
  -Body $body

A resposta deve trazer id, name, email, role, etc., mas nunca passwordHash.

🔐 Professor fazendo login

Quando o professor precisar acessar o sistema:

$loginTeacher = Invoke-RestMethod `
  -Uri "http://localhost:3000/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{
    "email": "professor@email.com",
    "password": "senha-do-professor"
  }'

$teacherToken = $loginTeacher.token

Depois, nas rotas que exigem autenticação:

-Headers @{
    Authorization = "Bearer $teacherToken"
}

🧠 Fluxo para lembrar
SEED
  ↓
primeiro ADMIN
  ↓
ADMIN faz login
  ↓
JWT
  ↓
POST /users
  ↓
cria TEACHER
  ↓
TEACHER faz login
  ↓
JWT
  ↓
acessa operações permitidas

Em produção, depois ajustamos as credenciais do .env para uma senha forte e mantida fora do código/repositório.