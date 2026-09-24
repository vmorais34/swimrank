# SwimRank — Status do projeto

> Atualizado em 2026-09-23 (fim do Bloco 1 do frontend: seções 4.1 e 4.2 do `todo.md`).
> Entrega: **27/10**. Node 24.11.1.

---

## 1. Onde estamos

| Área | Situação |
|---|---|
| Backend (`backend/`) | ✅ Pronto para a V1 (seções 6–10 do `todo.md`). Faltam 2 ajustes para o front (ver §4). |
| Frontend 4.1 Inicialização | ✅ Feito (falta só validar em celular real). |
| Frontend 4.2 Estrutura / design system | ✅ Feito e validado no navegador (tema claro e escuro). |
| Frontend 4.3 Telas V1 | ⏳ **Próximo passo.** Por enquanto só existem placeholders "Em construção". |
| Integração Front ↔ API (seção 11) | ⏳ Não iniciada. Os tipos das respostas já existem em `app/src/types/api.ts`. |

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
│   ├── index.tsx             # PROVISÓRIO: hub + catálogo do design system (vira Splash na 4.3)
│   ├── (auth)/identify.tsx, teacher-login.tsx
│   ├── (app)/_layout.tsx     # tab bar: Início / Registrar / Ranking / Perfil
│   ├── (app)/home, register, ranking, profile, history*, achievements*   (*fora da tab bar)
│   └── teacher/index.tsx     # área do professor (/teacher)
├── components/
│   ├── ui/                   # design system (barrel em ui/index.ts)
│   └── placeholder-screen.tsx
├── contexts/theme-context.tsx   # AppThemeProvider, useTheme(), useAppTheme()
├── config/env.ts             # EXPO_PUBLIC_API_URL, EXPO_PUBLIC_API_TIMEOUT_MS
├── lib/storage.ts            # wrapper JSON do AsyncStorage + StorageKeys
├── theme/                    # colors (light/dark), typography, spacing, radius, shadows, dimensions
├── types/api.ts              # tipos das respostas do backend
└── hooks/use-color-scheme*.ts
```

**Componentes UI:** AppText, Button, TextField, Card (default/highlight/hero), Screen, Header, Avatar, IconBadge, StatusBadge, SegmentedControl, ListRow, Logo, LoadingState, EmptyState, ErrorState, InlineMessage.

**Rodar:**
```bash
cd app
npx expo start --web       # http://localhost:8081  → "/" mostra o catálogo do design system
npx tsc --noEmit           # typecheck
npx expo export -p web     # build web (pasta dist/)
```
Env: copiar `app/.env.example` para `app/.env`. Em celular físico ou emulador Android, use o IP da máquina no lugar de `localhost`.

---

## 4. Pendências no backend (necessárias antes/durante a 4.3)

1. **CORS:** o `backend/src/app.ts` não tem CORS, e o app web (localhost:8081) não consegue chamar a API sem isso.
2. **Rota de identificação por data de nascimento:** hoje só existe `POST /participants`, que devolve 409 se o participante já existe.
   - Sugestão: `POST /participants/identify { birthdate, name? }`.
   - 0 encontrados → 404, e o front pede o nome e cadastra.
   - 1 encontrado → devolve o participante.
   - Mais de 1 com a mesma data → exige `name`, porque o índice único do model é `name + birthdate`.

> Confirmar com o usuário antes de mexer no backend.

### Endpoints que o front vai usar
- `POST /participants`, `GET /participants/:id`
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
2. **Backend:** adicionar CORS e a rota `identify` (§4).
3. **Bloco 2 — 4.3 Splash + Identificação + seções 5 e 12 "Participante":**
   - Splash substitui o `index.tsx` provisório. Se o catálogo ainda for útil, mover para `/design-system`.
   - API client (`src/services/api.ts`: fetch + timeout + erros + offline) e participant service.
   - SessionContext: participante salvo no AsyncStorage (`StorageKeys.participant`), recuperado no startup, com redirect para `/identify` ou `/home`.
   - Tela de identificação (data de nascimento → nome se não houver cadastro) + botão de professor.
4. **Bloco 3 — Home:** saudação, pontos, distância semanal/mensal, conquistas recentes, treino principal da semana, CTA "Registrar treino".
5. **Bloco 4 — Registro de atividade + Histórico:**
   - Só natação.
   - Campos: data, tipo (pré-selecionar o treino principal), distância, tempo.
   - Histórico com StatusBadge.
6. **Bloco 5 — Ranking:** abas Semanal/Mensal/Geral + distância e presença; destaque "Minha posição".
7. **Bloco 6 — Conquistas:** desbloqueadas × bloqueadas.
8. **Bloco 7 — Professor:** login JWT (salvo em `StorageKeys.teacherSession`), lista de pendentes, aprovar/rejeitar.
9. Seção 13 (estados vazios, loading e erro já têm componentes prontos), testes (14) e deploy web (17/18).
