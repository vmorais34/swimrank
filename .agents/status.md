# SwimRank — Status do projeto

> Atualizado em 2026-09-30 (Bloco 7 — Professor pronto: todas as telas da 4.3 implementadas, falta validar).
> Entrega: **27/10**. Node 24.11.1.

---

## 1. Onde estamos

| Área | Situação |
|---|---|
| Backend (`backend/`) | ✅ Pronto para a V1 (seções 6–10 do `todo.md`). Em produção: https://swimrank-api.onrender.com/health. CORS ✅; filtro `?birthdate=` ✅ (ver §4). |
| Frontend 4.1 Inicialização | ✅ Feito (falta só validar em celular real). |
| Frontend 4.2 Estrutura / design system | ✅ Feito e validado no navegador (tema claro e escuro). |
| Frontend 4.3 Telas V1 | ✅ Todas as telas implementadas (Splash, Identificação, Home, Registro, Histórico, Ranking, Conquistas, Professor — ver §3 e `.agents/testes.md`). Falta só validar o Bloco 7 e a 4.1 em celular real. |
| Integração Front ↔ API (seção 11) | ✅ Todos os services prontos: participant, activity (leitura + criação + validação), training, participant-achievement, ranking, achievement e auth. |

### Forma de trabalho combinada
- Seguir o `todo.md` **bloco a bloco** e parar ao fim de cada bloco para validação.
- Não começar o próximo bloco sem aprovação.
- Marcar os checkboxes no `todo.md` quando o bloco estiver pronto.

---

## 2. Decisões tomadas

- **Temas:** claro, baseado em `.agents/references/mockup-mobile.png`, e escuro, com a paleta do `.agents/rules/DESIGN_TOKENS.md`.
  - Segue o tema do sistema; o usuário pode escolher Sistema/Claro/Escuro, e a escolha fica salva.
  - No tema claro, `brand.primary` = `#0369A1` para manter o contraste AA do texto branco nos botões.
- **Login do participante (sem autenticação na V1):**
  - Tela com **um input de data de nascimento**.
  - Se o participante já tem cadastro, a data basta para entrar.
  - Se não tem, pede também o **nome** e cadastra.
  - Abaixo, um botão **"Acessar como professor"** leva para e-mail + senha (JWT via `POST /auth/login`).
  - A tela de login do mockup (e-mail/Google) é **só referência visual**.
- **Web:** `web.output = "single"` (SPA) no `app.json`.
- **Fonte:** Inter (`@expo-google-fonts/inter`). **Ícones:** SVG próprios em `components/ui/icon.tsx`, estilo Lucide, stroke 2.

---

## 3. Frontend — o que existe (`app/`)

Stack: Expo SDK 57 + Expo Router + TypeScript + React Compiler.
Libs adicionadas: `react-native-svg`, `@react-native-async-storage/async-storage`, `@expo-google-fonts/inter`.

```
app/src/
├── app/                      # rotas (Expo Router)
│   ├── _layout.tsx           # fontes, SafeArea, ThemeProvider, Stack
│   ├── index.tsx             # Splash: logo SwimRank + "Propriedade" Patrick Esportes → /home ou /identify (via SessionContext)
│   ├── design-system.tsx     # catálogo do design system + atalhos (ferramenta de dev)
│   ├── (auth)/identify.tsx   # data de nascimento → login direto (1 match) / desempate (>1) / cadastro (0)
│   ├── (auth)/teacher-login.tsx   # e-mail + senha → JWT, salvo na TeacherSessionContext
│   ├── (app)/_layout.tsx     # tab bar: Início / Registrar / Ranking / Perfil
│   ├── (app)/home.tsx        # pontos, distância semana/mês, treino principal, conquistas recentes, CTA registrar
│   ├── (app)/register.tsx    # data, tipo (pré-selecionado com o treino principal), distância, tempo (min+seg)
│   ├── (app)/history.tsx     # lista de atividades do participante com StatusBadge
│   ├── (app)/ranking.tsx     # abas Semanal/Mensal/Geral (+ Distância/Presença na semanal), destaque "Minha posição"
│   ├── (app)/achievements.tsx   # conquistas desbloqueadas × bloqueadas (fora da tab bar)
│   ├── (app)/profile.tsx     # ainda placeholder
│   └── teacher/index.tsx     # lista de atividades PENDING (nome resolvido via GET /participants) + aprovar/rejeitar
├── components/
│   ├── ui/                   # design system (barrel em ui/index.ts)
│   └── placeholder-screen.tsx
├── contexts/
│   ├── theme-context.tsx          # AppThemeProvider, useTheme(), useAppTheme()
│   ├── session-context.tsx        # SessionProvider, useSession() — participante logado (persistido no storage)
│   └── teacher-session-context.tsx   # TeacherSessionProvider, useTeacherSession() — { token, user } do professor
├── services/
│   ├── api.ts                     # fetch client: timeout, ApiError (corpo `{error,message,details}`), NetworkError (offline/timeout)
│   ├── participant.service.ts     # findByBirthdate, create, getById, list
│   ├── activity.service.ts        # listByParticipant, listAll, create, validate (Bearer)
│   ├── training.service.ts        # list
│   ├── participant-achievement.service.ts   # listByParticipant
│   ├── ranking.service.ts         # weekly, monthly, general, weeklyDistance, weeklyAttendance
│   ├── achievement.service.ts     # list (catálogo completo, rota pública)
│   └── auth.service.ts            # login → { token, user }
├── lib/
│   ├── storage.ts             # wrapper JSON do AsyncStorage + StorageKeys
│   ├── date.ts                # todayIso, isoDateUTC, weekStartIso, digitsToIsoDate/formatDateDigits/isoToDigits (máscara DD/MM/AAAA)
│   ├── format.ts              # formatDistance (m/km), formatDuration (mm:ss), formatDateBR
│   └── training.ts            # findMainTraining(trainings, weekStart) — usado por Home e Registro
├── config/env.ts             # EXPO_PUBLIC_API_URL, EXPO_PUBLIC_API_TIMEOUT_MS
├── theme/                    # colors (light/dark), typography, spacing, radius, shadows, dimensions
├── types/api.ts              # tipos das respostas do backend
└── hooks/use-color-scheme*.ts
```

**Componentes UI:** AppText, Button, TextField, Card (default/highlight/hero), Screen, Header, Avatar, IconBadge, StatusBadge, SegmentedControl, ListRow, Logo, LoadingState, EmptyState, ErrorState, InlineMessage.

**Roteiros de teste manuais:** `.agents/testes.md` (um bloco por seção).

**Rodar:**
```bash
cd app
npx expo start --web       # http://localhost:8081  → "/" Splash; "/design-system" catálogo
npx tsc --noEmit           # typecheck
npx expo export -p web     # build web (pasta dist/)
```
Env: copiar `app/.env.example` para `app/.env`. API de produção: `https://swimrank-api.onrender.com` (plano free do Render hiberna; o primeiro request pode levar ~50s). Em celular físico ou emulador Android, use o IP da máquina no lugar de `localhost`.

---

## 4. Pendências no backend (necessárias antes/durante a 4.3)

1. ✅ **CORS:** feito em `backend/src/config/cors.ts`. Origens liberadas pela env `CORS_ORIGINS` (separadas por vírgula; padrão `http://localhost:8081`).
   - **Ao publicar o front web, adicionar a URL dele em `CORS_ORIGINS` no painel do Render.**
2. ✅ **Identificação por data de nascimento (decidido em 2026-09-29):** sem rota nova, só um filtro opcional em `GET /participants?birthdate=YYYY-MM-DD`.
   - Lista vazia → primeiro acesso: pede o nome e chama `POST /participants { name, birthdate }`.
   - 1 resultado → entra direto com esse participante.
   - Mais de 1 → pede o nome para desempatar (comparar entre os resultados retornados).

> Confirmar com o usuário antes de mexer no backend.

### Endpoints que o front vai usar
- `GET /participants?birthdate=YYYY-MM-DD` (login), `POST /participants` (primeiro acesso), `GET /participants/:id`
- `POST /activities` com `{ participantId, date: 'YYYY-MM-DD', type, distance (m), time (s) }`, criada como `PENDING`
- `GET /activities/participant/:participantId`
- `GET /activities`; `PATCH /activities/:id/validation { status: APPROVED|REJECTED }` (Bearer TEACHER/ADMIN)
- `GET /trainings` → treino principal da semana (`isMain`). **A atividade só pontua se `type` = tipo do treino principal.**
- `GET /rankings/weekly|monthly?date=YYYY-MM-DD` → `{ position, participantId, name, points }`
- `GET /rankings/general`
- `GET /rankings/weekly/distance?date=` → `distance`; `GET /rankings/weekly/attendance?date=` → `attendance`
- `GET /achievements`, `GET /participant-achievements/participant/:participantId`
- `POST /auth/login { email, password }` → `{ token, user }`
- Formato de erro: `{ error: CODE, message, details? }`

---

## 5. Próximos passos (em ordem)

1. **Validar a 4.1 no celular:** abrir a URL web pela rede local (IP da máquina) no navegador do celular.
2. ✅ **Backend:** CORS e filtro `GET /participants?birthdate=` (§4).
3. ✅ **Bloco 2 — 4.3 Splash + Identificação + seções 5 e 12 "Participante":**
   - ✅ Splash (`index.tsx`): logo SwimRank + "Propriedade" com o logo Patrick Esportes. Mínimo de 1,2s; agora usa `useSession()` (SessionContext) em vez de ler o storage direto.
   - ✅ API client (`src/services/api.ts`: fetch + timeout + `ApiError`/`NetworkError`) e `src/services/participant.service.ts`.
   - ✅ SessionContext (`src/contexts/session-context.tsx`): participante salvo no AsyncStorage (`StorageKeys.participant`), recuperado no startup, provider adicionado no `_layout.tsx` raiz.
   - ✅ Tela de identificação (`(auth)/identify.tsx`): data de nascimento (máscara `DD/MM/AAAA`, validada) → 0 resultados pede nome e cadastra, 1 resultado entra direto, >1 mostra lista para escolher (ou "Não encontrei meu nome" → cadastro) + botão "Acessar como professor". Testado manualmente nos 3 casos, temas claro/escuro e erros de validação.
   - Roteiro de testes manuais: `.agents/testes.md`.
4. ✅ **Bloco 3 — Home:** saudação, pontos totais (`Participant.points`), distância aprovada da semana/mês (calculada no front a partir de `GET /activities/participant/:id`, sem endpoint de distância mensal no backend), conquistas recentes (`GET /participant-achievements/participant/:id`, top 3), treino principal da semana (`GET /trainings`, filtrado no front por `isMain` + semana atual — sem endpoint de filtro no backend), CTA "Registrar treino" → `/register`. Pull-to-refresh. Novos: `src/lib/date.ts`, `src/lib/format.ts`, `src/services/{activity,training,participant-achievement}.service.ts`.
   - Roteiro de teste: `.agents/testes.md` §Home.
5. ✅ **Bloco 4 — Registro de atividade + Histórico:**
   - `register.tsx`: data (máscara, não aceita futuro), tipo (texto livre, pré-preenchido com o treino principal da semana se existir, editável), distância (metros), tempo (minutos + segundos → somados em segundos para a API). Cria como `PENDING` e navega para `/history`.
   - `history.tsx`: lista as atividades do participante (`GET /activities/participant/:id`, já vem ordenado por data desc), cada item com data, tipo, distância, duração e `StatusBadge`. Loading/erro/vazio/pull-to-refresh.
   - Refactor: `digitsToIsoDate`/`formatDateDigits` (máscara de data) e `findMainTraining` extraídos para `src/lib/` e reaproveitados pela Identificação e Home.
   - Roteiro de teste: `.agents/testes.md` §Bloco 4.
6. ✅ **Bloco 5 — Ranking:**
   - `ranking.tsx`: abas Semanal/Mensal/Geral (pontos); na semanal, segunda aba Pontos/Distância/Presença (únicas rankings que o backend expõe por distância/presença). Card "Sua posição" em destaque + linha do participante destacada (`selected`) na lista; badge de posição com cores de ouro/prata/bronze para o top 3.
   - Novo: `src/services/ranking.service.ts`.
   - Roteiro de teste: `.agents/testes.md` §Bloco 5.
7. ✅ **Bloco 6 — Conquistas:**
   - `achievements.tsx`: lista todas as conquistas (`GET /achievements`, catálogo público) cruzada com as desbloqueadas do participante (`GET /participant-achievements/participant/:id`, já vem com `achievementId` populado). Seção "Desbloqueadas" (ícone colorido por `requirement.type`, mais data) e "Bloqueadas" (ícone de cadeado). Sem tela de criação — conquistas são cadastradas só via API pelo admin (`todo.md` §12, decisão do usuário).
   - Novo: `src/services/achievement.service.ts`.
   - Roteiro de teste: `.agents/testes.md` §Bloco 6.
8. ✅ **Bloco 7 — Professor:**
   - `teacher-login.tsx`: e-mail + senha → `POST /auth/login`, sessão salva via `TeacherSessionContext` (`StorageKeys.teacherSession`) → `/teacher`.
   - `teacher/index.tsx`: lista atividades `PENDING` (`GET /activities`, sem filtro no backend — filtrado no front) cruzadas com `GET /participants` pra mostrar o nome; botões Aprovar/Rejeitar chamam `PATCH /activities/:id/validation` com o Bearer token; remove o item da lista otimisticamente ao validar. Erro 401 (token expirado) desloga e volta pro login. Botão "Sair" no cabeçalho.
   - Correção: `types/api.ts` `User` tinha `_id`, mas o backend retorna `id` no `POST /auth/login` (`auth.service.ts`) — corrigido.
   - Novos: `src/contexts/teacher-session-context.tsx`, `src/services/auth.service.ts`; `activity.service.ts` ganhou `listAll`/`validate`, `participant.service.ts` ganhou `list`.
   - Roteiro de teste: `.agents/testes.md` §Bloco 7.
9. Todas as telas da seção 4.3 estão implementadas. Falta: validar a 4.1 em celular real (item 1 acima), seção 13 (wireframes/usabilidade — os estados vazio/loading/erro já estão em todas as telas), testes (14) e deploy web (17/18).
