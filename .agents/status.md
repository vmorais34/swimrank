# SwimRank — Status do projeto (Frontend & Backend)

> Gerado a partir da leitura do código-fonte, `todo.md` e `docs/decisions.md` em 2026-09-23.
> Prazo de entrega: 27/10 (41 dias a partir do início do projeto).

---

## 1. Visão geral

SwimRank é um app de gamificação para natação (Projeto de Extensão VI, parceiro Patrick Esportes). Participantes registram atividades, professores validam, e o sistema calcula pontos/ranking/conquistas.

Stack:
- **Backend**: Node.js + TypeScript + Express 5 + Mongoose 9 (MongoDB) + Zod 4 + JWT + bcrypt — pasta `backend/`
- **Frontend**: React Native + Expo (SDK 57) + Expo Router + TypeScript — pasta `app/`

Arquitetura do backend (`docs/decisions.md`):
```
HTTP → Route → Controller → Service → Repository → Model → MongoDB
```

---

## 2. Backend — o que já está feito

### 2.1 Infraestrutura
- Projeto Node/TS/Express configurado, servidor de dev (`npm run dev`), variáveis de ambiente (`.env`).
- Endpoint `GET /health` retornando status da API e da conexão com o MongoDB.
- Conexão com MongoDB configurada (`src/config/database.ts`).
- Tratamento de erro centralizado: `AppError` (`src/errors/app-error.ts`) + middleware `errorHandler`, evitando try/catch espalhado nos controllers.

### 2.2 Autenticação e autorização
- Entidade `User` (roles `TEACHER` | `ADMIN`), senha com hash `bcrypt`, nunca expõe `passwordHash`.
- `POST /auth/login` retorna JWT.
- Middlewares `authenticate` (valida JWT) e `authorize(...roles)` (RBAC) protegendo rotas administrativas.
- Cadastro de usuários é privado: só `ADMIN` autenticado pode criar/listar/editar/excluir usuários (`POST/GET/PATCH/DELETE /users`, todos atrás de `authenticate + authorize('ADMIN')`).
- Primeiro ADMIN criado via script `npm run seed:admin` (idempotente, credenciais no `.env`).
- Decisão registrada: identificação local do participante ≠ autenticação de professor/admin — participantes continuam sem login na V1.

### 2.3 Entidades / CRUDs implementados
| Entidade | Rotas | Observações |
|---|---|---|
| **Participants** | `POST /participants`, `GET /participants`, `GET /participants/:id`, `PATCH /participants/:id`, `DELETE /participants/:id` | schema: `name`, `birthdate`, `points` (não editável pelo cliente), timestamps. Testado (criação, duplicidade, listagem, update, delete, casos inválidos). |
| **Trainings** | `POST/GET/GET:id/PATCH/DELETE /trainings` | schema: `date`, `type`, `isMain`. Regra "apenas um treino principal por período" implementada e testada. |
| **Activities** | `POST /activities`, `GET /activities`, `GET /activities/:id`, `GET /activities/participant/:participantId`, `PATCH /activities/:id`, `PATCH /activities/:id/validation` (protegida: `TEACHER`/`ADMIN`) | schema: `participantId`, `date`, `type`, `distance`, `time`, `points`, `status` (`PENDING/APPROVED/REJECTED`), `validatedAt`. Fluxo de aprovação/rejeição implementado. |
| **Users** | CRUD completo, protegido por `ADMIN` | ver seção autenticação acima. |

### 2.4 Validação
- Validação de entrada com **Zod** para as entidades acima (`src/validations/*`).
- Observação registrada em `decisions.md`: os controllers ainda repetem o padrão `if (!result.success) return res.status(400)...` em GET e POST — refatoração para um middleware `validate()` está planejada, mas **ainda não implementada**.

### 2.5 Regras de negócio já decididas (mas não implementadas em código)
Documentadas em `docs/decisions.md`, ainda pendentes de implementação:
- Cálculo de pontos dinâmico, isolado em um `scoring.service.ts` (ainda não existe):
  - aula completa → 100% da pontuação base
  - aula pela metade → 50%
  - falta → 0
  - presença em todos os dias da semana → bônus de 25%
- Pontuação é feita **apenas** sobre a atividade principal da semana (definida pelo `Training.isMain`/`type`), não por presença/distância/tempo em geral.
- Sem ranking por sexo.
- Ranking V1: semanal e mensal (não geral).
- Empate é permitido; professor **não** corrige pontos manualmente (cálculo é automático).

### 2.6 O que falta no backend (do `todo.md`)
- **Achievements**: schema, CRUD e regras de desbloqueio — nada implementado ainda.
- **ParticipantAchievements**: schema e lógica de unlock (com prevenção de duplicidade) — não implementado.
- **Regras de banco**: índices, relações formais, seeds de desenvolvimento, unique constraints — pendentes.
- **Cálculo de pontos** (seção 9.1 do todo): nenhuma linha de código ainda; é o próximo grande bloco de trabalho.
- **Ranking** (seção 9.2): endpoints de ranking principal, por distância, por frequência, posição do participante — nada implementado.
- Testes pendentes: validação de atividade não autorizada, validação por professor (parcialmente coberto), exclusão de atividades `PENDING`/`REJECTED` do ranking.

---

## 3. Frontend — o que já está feito

O app (`app/`) está **no estado inicial do template padrão do Expo Router** (`create-expo-app`), sem telas de produto ainda implementadas:
- Projeto Expo (SDK 57) + TypeScript + Expo Router inicializado e funcional.
- Estrutura padrão: `src/app/_layout.tsx`, `src/app/index.tsx` (tela "Welcome to SwimRank!" de boas-vindas do template), `src/app/explore.tsx`.
- Componentes de UI base reaproveitáveis do template: `themed-text`, `themed-view`, `app-tabs` (navegação em abas), `animated-icon`, `hint-row`, `external-link`, `web-badge`, `collapsible`.
- Hooks de tema (`use-color-scheme`, `use-theme`) e constantes de design (`constants/theme.ts` — espaçamento, cores).
- Suporte a Web/iOS/Android/dark-mode já configurado (theming com `ThemeProvider`).

Não há nenhuma tela de produto (identificação de participante, cadastro de atividade, ranking, conquistas, admin) nem nenhuma chamada de API implementada.

### 3.1 O que falta no frontend (do `todo.md`)
- **Build/deploy inicial**: primeiro build, gerar URL web, validar em navegador mobile.
- **Estrutura do produto**: estrutura de pastas definitiva, configuração de variáveis de ambiente, design system (tipografia, spacing, botões/inputs/cards) além do que veio do template.
- **Telas principais**: splash, identificação do participante, home, ranking, histórico de atividades, conquistas, tela básica de professor/admin — **nenhuma criada ainda**.
- **Identificação do participante (V1, sem autenticação)**: input de nome, geração/persistência local de identificador, recuperação no startup, comportamento sem dados locais/troca de dispositivo.
- **Integração com backend**: nenhuma — falta client de API, base URL configurável, services (participant/activity/ranking/achievement), tratamento de loading/erro/offline.
- Telas de atividades, ranking (principal/distância/frequência) e conquistas — dependem de endpoints que também ainda não existem no backend (ranking, achievements).

---

## 4. Panorama consolidado: o que falta fazer (a partir do `todo.md`)

### Alta prioridade (bloqueiam o MVP)
1. **Serviço de pontuação** (`scoring.service.ts`): implementar as regras já decididas (aula completa/parcial/falta, bônus semanal), aplicado só à atividade principal da semana.
2. **Ranking**: endpoints semanal/mensal, ordenação, empate, exclusão de atividades `PENDING`/`REJECTED`.
3. **Achievements + ParticipantAchievements**: schema, CRUD, regra de desbloqueio, prevenção de duplicidade.
4. **Frontend — telas de produto**: identificação do participante (sem auth), cadastro/listagem de atividades, ranking, conquistas, tela de professor.
5. **Integração frontend ↔ backend**: client HTTP, services por domínio, tratamento de erro/loading/offline.

### Média prioridade
- Regras de banco (índices, constraints únicas, seeds de dev).
- Middleware `validate()` para eliminar a repetição de validação Zod nos controllers.
- Testes pendentes de autorização em `PATCH /activities/:id/validation`.
- Documentação: `README.md` do projeto ainda não cobre todos os itens do checklist (arquitetura, roadmap etc.), pastas `docs/` com requisitos funcionais/não funcionais, modelo de dados, estratégia de testes ainda não criadas como documentos formais.

### Baixa prioridade / pós-MVP (V2, conforme `todo.md` seção 18)
- Autenticação real de participantes (login, cadastro, recuperação de senha, migração da identidade local).
- Perfil de usuário, estatísticas pessoais.
- Gamificação expandida (níveis, desafios, rankings semanais/mensais adicionais, metas).
- Notificações push.
- Publicação na Google Play.

---

## 5. Observações úteis para quem for continuar

- Regra de negócio central: **o cliente nunca envia `points` diretamente** — pontos só são escritos pelo futuro serviço de pontuação.
- Fluxo de atividade: `Participant registra → Activity (PENDING) → Professor valida → APPROVED (entra no ranking) | REJECTED`.
- Autenticação de professor/admin é via JWT (`Authorization: Bearer <token>`); participantes seguem sem login na V1.
- Exemplos de chamadas via PowerShell (`Invoke-RestMethod`) para criar participant, treino, atividade e validar com token de professor estão em `backend/readme.md`.
