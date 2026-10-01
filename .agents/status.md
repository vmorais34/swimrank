# SwimRank — Status do projeto

> Atualizado em 2026-09-30 (Identificação do participante pronta e testada; API client + SessionContext).
> Entrega: **27/10**. Node 24.11.1.

---

## 1. Onde estamos

| Área | Situação |
|---|---|
| Backend (`backend/`) | ✅ Pronto para a V1 (seções 6–10 do `todo.md`). Em produção: https://swimrank-api.onrender.com/health. CORS ✅; filtro `?birthdate=` ✅ (ver §4). |
| Frontend 4.1 Inicialização | ✅ Feito (falta só validar em celular real). |
| Frontend 4.2 Estrutura / design system | ✅ Feito e validado no navegador (tema claro e escuro). |
| Frontend 4.3 Telas V1 | ⏳ Em andamento. Splash, Identificação e Home prontas (ver §3 e `.agents/testes.md`); demais telas ainda são placeholders "Em construção". **Próximo passo: Bloco 4 — Registro de atividade + Histórico.** |
| Integração Front ↔ API (seção 11) | ⏳ Em andamento: `api.ts` + services de participant, activity (só leitura), training e participant-achievement prontos; falta ranking service e activity create/update. |

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
│   ├── (auth)/teacher-login.tsx   # ainda placeholder (Bloco 7)
│   ├── (app)/_layout.tsx     # tab bar: Início / Registrar / Ranking / Perfil
│   ├── (app)/home.tsx        # pontos, distância semana/mês, treino principal, conquistas recentes, CTA registrar
│   ├── (app)/register, ranking, profile, history*, achievements*   (*fora da tab bar, ainda placeholders)
│   └── teacher/index.tsx     # área do professor (/teacher)
├── components/
│   ├── ui/                   # design system (barrel em ui/index.ts)
│   └── placeholder-screen.tsx
├── contexts/
│   ├── theme-context.tsx     # AppThemeProvider, useTheme(), useAppTheme()
│   └── session-context.tsx   # SessionProvider, useSession() — participante logado (persistido no storage)
├── services/
│   ├── api.ts                     # fetch client: timeout, ApiError (corpo `{error,message,details}`), NetworkError (offline/timeout)
│   ├── participant.service.ts     # findByBirthdate, create, getById
│   ├── activity.service.ts        # listByParticipant (create vem no Bloco 4)
│   ├── training.service.ts        # list
│   └── participant-achievement.service.ts   # listByParticipant
├── lib/
│   ├── storage.ts             # wrapper JSON do AsyncStorage + StorageKeys
│   ├── date.ts                # todayIso, isoDateUTC, weekStartIso (mesma regra de semana do backend)
│   └── format.ts               # formatDistance (m/km)
├── config/env.ts             # EXPO_PUBLIC_API_URL, EXPO_PUBLIC_API_TIMEOUT_MS
├── theme/                    # colors (light/dark), typography, spacing, radius, shadows, dimensions
├── types/api.ts              # tipos das respostas do backend
└── hooks/use-color-scheme*.ts
```

**Componentes UI:** AppText, Button, TextField, Card (default/highlight/hero), Screen, Header, Avatar, IconBadge, StatusBadge, SegmentedControl, ListRow, Logo, LoadingState, EmptyState, ErrorState, InlineMessage.

**Testes manuais da tela de Identificação:** roteiro em `.agents/testes.md`.

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
   - Pendente: `teacher-login.tsx` continua placeholder (é o Bloco 7).
4. ✅ **Bloco 3 — Home:** saudação, pontos totais (`Participant.points`), distância aprovada da semana/mês (calculada no front a partir de `GET /activities/participant/:id`, sem endpoint de distância mensal no backend), conquistas recentes (`GET /participant-achievements/participant/:id`, top 3), treino principal da semana (`GET /trainings`, filtrado no front por `isMain` + semana atual — sem endpoint de filtro no backend), CTA "Registrar treino" → `/register`. Pull-to-refresh. Novos: `src/lib/date.ts`, `src/lib/format.ts`, `src/services/{activity,training,participant-achievement}.service.ts`.
   - Roteiro de teste: `.agents/testes.md` §Home.
5. **Bloco 4 — Registro de atividade + Histórico (próximo):**
   - Só natação.
   - Campos: data, tipo (pré-selecionar o treino principal), distância, tempo.
   - Histórico com StatusBadge.
6. **Bloco 5 — Ranking:** abas Semanal/Mensal/Geral + distância e presença; destaque "Minha posição".
7. **Bloco 6 — Conquistas:** desbloqueadas × bloqueadas.
8. **Bloco 7 — Professor:** login JWT (salvo em `StorageKeys.teacherSession`), lista de pendentes, aprovar/rejeitar.
9. Seção 13 (estados vazios, loading e erro já têm componentes prontos), testes (14) e deploy web (17/18).
