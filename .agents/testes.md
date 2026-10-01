# Testes manuais

> Rodar backend (`cd backend && npm run dev`) e frontend (`cd app && npx expo start --web`) antes de testar.

## Bloco 2 — Identificação do participante

> Cobre: Splash (`/`), Identificação (`/identify`), SessionContext e API client.

### Preparo

- Backend em `http://localhost:3000` (ver `app/.env`, que deve apontar `EXPO_PUBLIC_API_URL=http://localhost:3000`).
- Para simular "primeiro acesso"/"app novo", limpe o storage do navegador entre cenários:
  - DevTools → Console → `localStorage.clear()` → recarregar a página.

### Cenários

### 1. Primeiro acesso (0 cadastros com a data)
1. Limpe o storage e acesse `http://localhost:8081`.
2. Aguarde a Splash → deve ir para `/identify`.
3. Digite uma data de nascimento nova (ex.: `01/01/2010`) e toque **Continuar**.
4. Deve abrir **"Complete seu cadastro"** pedindo o nome.
5. Digite um nome (ex.: `Teste Um`) e toque **Concluir cadastro**.
6. Deve navegar para `/home` (hoje ainda é o placeholder "Em construção").
7. Confirme no backend: `curl "http://localhost:3000/participants?birthdate=2010-01-01"` deve retornar o participante criado.

### 2. Login com 1 cadastro existente
1. Limpe o storage e recarregue.
2. Digite a **mesma data** do cenário 1 (`01/01/2010`) e toque **Continuar**.
3. Deve ir direto para `/home` (sem pedir nome), pois só há 1 cadastro com essa data.

### 3. Sessão persistida
1. Com o participante já logado (cenário 2), apenas recarregue a página (sem limpar storage).
2. A Splash deve levar direto para `/home`, sem passar por `/identify`.

### 4. Desempate (mais de 1 cadastro com a mesma data)
1. Crie um segundo participante com a mesma data via API:
   ```bash
   curl -X POST http://localhost:3000/participants -H "Content-Type: application/json" \
     -d '{"name":"Teste Dois","birthdate":"2010-01-01"}'
   ```
2. Limpe o storage e recarregue.
3. Digite `01/01/2010` e toque **Continuar**.
4. Deve abrir **"Quem é você?"** listando "Teste Um" e "Teste Dois".
5. Tocar em um nome deve logar com aquele participante e ir para `/home`.
6. Voltar (seta no header) deve retornar para a tela de data de nascimento.
7. Em "Quem é você?", tocar **"Não encontrei meu nome"** deve abrir o cadastro (nome) mantendo a mesma data.

Done :whitecheck:

> Lembrar de apagar os participantes de teste depois (`DELETE /participants/:id`), pois o banco é o mesmo do Render (nuvem).

### 5. Validações e erros
- Botão **Continuar** deve ficar desabilitado até completar os 8 dígitos da data.
- Data inválida (ex.: `31/02/2020`, dia que não existe) → erro **"Informe uma data de nascimento válida."** abaixo do campo.
- Data futura → mesmo erro de validação.
- Nome com menos de 2 caracteres no cadastro → erro **"Informe seu nome completo."**.
- Backend fora do ar (parar `npm run dev` do backend) → ao tocar Continuar, deve aparecer um aviso vermelho inline: "Não foi possível conectar ao servidor. Verifique sua conexão." (sem travar a tela).

### 6. Acesso do professor
- Na tela inicial de identificação, tocar **"Acessar como professor"** deve ir para `/teacher-login` (ainda placeholder "Em construção").

### 7. Temas
- Repetir o cenário 1 com o sistema operacional/navegador em modo claro e escuro (ou trocar em `/design-system` se aplicável) e conferir contraste e legibilidade em ambos.

---

## Bloco 3 — Home

> Cobre: `(app)/home.tsx`. Precisa de um participante logado (rode o Bloco 2 antes).

### Preparo — dados de exemplo

```bash
# Pontos/atividades: crie 1 atividade aprovada para o participante logado (troque o PARTICIPANT_ID)
curl -X POST http://localhost:3000/participants -H "Content-Type: application/json" \
  -d '{"name":"Teste Home","birthdate":"2011-05-20"}'
# copie o _id retornado -> PARTICIPANT_ID

curl -X POST http://localhost:3000/activities -H "Content-Type: application/json" \
  -d '{"participantId":"PARTICIPANT_ID","date":"2026-09-29","type":"Livre","distance":800,"time":900}'
# copie o _id retornado -> ACTIVITY_ID (fica PENDING)

# Treino principal da semana atual: "date" deve ser a segunda-feira desta semana
curl -X POST http://localhost:3000/trainings -H "Content-Type: application/json" \
  -d '{"date":"SEGUNDA_DESTA_SEMANA","type":"Livre","isMain":true}'

# Aprovar a atividade (precisa de login de professor/admin — ver seed:admin do backend)
curl -X PATCH http://localhost:3000/activities/ACTIVITY_ID/validation \
  -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" \
  -d '{"status":"APPROVED"}'
```

### Cenários

1. **Sem dados (participante novo, sem atividades/conquistas/treino):**
   - Login com um participante recém-criado → Home deve mostrar 0 pontos, "0 m" nas duas estatísticas, "Nenhum treino principal definido para esta semana." e o estado vazio "Nenhuma conquista ainda".
2. **Com atividade aprovada nesta semana:**
   - Depois de aprovar a atividade do preparo acima, recarregue a Home (ou puxe para atualizar).
   - "Essa semana" deve mostrar a distância da atividade (ex.: `800 m`); "Esse mês" deve incluir a mesma atividade.
   - Se o `type` da atividade bater com o treino principal (`isMain`), os pontos totais devem ter sido somados (conferir com `GET /participants/PARTICIPANT_ID`).
3. **Treino principal da semana:**
   - Com o treino do preparo cadastrado, a seção "Treino principal da semana" deve mostrar o `type` cadastrado (ex.: "Livre").
4. **Pull-to-refresh:** arraste a tela para baixo — deve mostrar o spinner de atualização e re-buscar os dados sem piscar a tela toda.
5. **CTA "Registrar treino":** toque no botão fixo no rodapé → deve ir para `/register` (ainda placeholder "Em construção").
6. **Backend fora do ar:** pare o backend e recarregue a Home → deve aparecer a tela de erro com botão "Tentar novamente" (não deve travar em loading infinito).
7. **Sem sessão:** limpe o storage e acesse `http://localhost:8081/home` diretamente pela URL → deve redirecionar para `/identify` (Home não deve ficar em branco).

> Lembrar de apagar os dados de teste depois (`DELETE /participants/:id`, `/activities/:id`, `/trainings/:id`), pois o banco é o mesmo do Render (nuvem).

Done :whitecheck:

---

## Bloco 4 — Registro de atividade + Histórico

> Cobre: `(app)/register.tsx`, `(app)/history.tsx`. Precisa de um participante logado.

### Cenários

1. **Pré-preenchimento do tipo:** cadastre um treino principal para a semana atual (ver preparo do Bloco 3) e abra a aba **Registrar**. O campo "Tipo" deve vir preenchido com o `type` do treino principal, e a dica abaixo do campo deve mostrar "Treino principal da semana: ...".
2. **Sem treino principal:** sem nenhum treino `isMain` cadastrado para a semana atual, o campo "Tipo" deve abrir vazio (sem travar a tela).
3. **Registro válido:** preencha Data (hoje), Tipo, Distância (ex.: `800`) e Tempo (ex.: `12` min / `30` seg) e toque **Registrar**. Deve navegar para `/history` e a nova atividade deve aparecer no topo da lista com o badge **Pendente**.
4. **Validações:**
   - Data futura → erro "Informe uma data válida." (o teclado numérico some o "Registrar" habilitado só com os 8 dígitos preenchidos, mas a validação final roda ao tocar o botão).
   - Tipo vazio → erro "Informe o tipo da atividade."
   - Distância vazia ou `0` → erro "Informe uma distância válida."
   - Minutos e segundos vazios (tempo total 0), ou segundos ≥ 60 → erro "Informe um tempo válido."
5. **Erro de rede:** pare o backend e tente registrar → deve aparecer o aviso inline vermelho sem perder os dados digitados no formulário.
6. **Histórico vazio:** participante sem nenhuma atividade → `/history` mostra o estado vazio "Nenhuma atividade registrada".
7. **Histórico com dados:** cada linha deve mostrar `DD/MM/AAAA`, `Tipo • distância • mm:ss` e o `StatusBadge` (Pendente/Aprovada/Rejeitada) condizente com o status real (confira aprovando uma atividade via `PATCH /activities/:id/validation`, como no preparo do Bloco 3, e recarregando o histórico).
8. **Pull-to-refresh** no histórico atualiza a lista sem piscar a tela toda.
9. **Voltar:** a seta no cabeçalho do histórico deve voltar para a tela anterior.

Done :whitecheck:

---

## Bloco 5 — Ranking

> Cobre: `(app)/ranking.tsx`. Precisa de pelo menos uma atividade **aprovada** para aparecer nos rankings (ver preparo do Bloco 3).

### Cenários

1. **Abas de período:** abra a aba **Ranking** → por padrão abre em "Semanal". Alterne entre Semanal / Mensal / Geral — a lista deve recarregar a cada troca.
2. **Sub-abas (só na Semanal):** com "Semanal" selecionado, deve aparecer uma segunda barra Pontos / Distância / Presença; ao trocar em "Mensal" ou "Geral" essa segunda barra some.
3. **Minha posição:** com o participante logado tendo atividade aprovada no período, o card "Sua posição" deve mostrar `#posição` e o valor (pontos/distância/presença conforme a aba). Sem atividade aprovada no período → "Você ainda não aparece neste ranking."
4. **Minha linha destacada:** na lista abaixo, a linha do participante logado deve aparecer com destaque visual (fundo diferente), igual às outras linhas no mesmo formato (posição, nome, valor).
5. **Top 3:** as posições 1, 2 e 3 devem ter o badge de posição colorido (ouro/prata/bronze); da 4ª em diante, cor neutra.
6. **Ranking vazio:** período sem nenhuma atividade aprovada → estado vazio "Ninguém pontuou ainda".
7. **Erro de rede:** pare o backend e troque de aba → tela de erro com "Tentar novamente".
8. **Sem sessão:** limpe o storage e acesse `/ranking` direto pela URL → redireciona para `/identify`.

---

## Bloco 6 — Conquistas

> Cobre: `(app)/achievements.tsx`. As conquistas em si são cadastradas via API (admin) — ver `backend/achievements.md` / `POST /achievements`.

### Cenários

1. **Sem conquistas desbloqueadas:** participante novo (sem `ParticipantAchievement`) → seção "Desbloqueadas (0)" mostra o estado vazio "Nenhuma conquista ainda"; "Bloqueadas (N)" lista todas as conquistas cadastradas com ícone de cadeado.
2. **Com conquistas desbloqueadas:** depois que o motor de conquistas desbloquear alguma (ao aprovar uma atividade, ver `evaluateAchievementsForParticipant` no backend), recarregue a tela → ela deve sair de "Bloqueadas" e aparecer em "Desbloqueadas", com ícone colorido (verde) condizente com o `requirement.type` (ex.: `TOTAL_DISTANCE` → ícone de rota) e a data em que foi desbloqueada.
3. **Pontos:** cada linha (desbloqueada ou bloqueada) deve mostrar `+{points} pts` à direita.
4. **Todas desbloqueadas:** se o participante tiver todas as conquistas cadastradas, "Bloqueadas (0)" mostra a mensagem "Você desbloqueou todas as conquistas disponíveis!".
5. **Pull-to-refresh** atualiza as duas listas.
6. **Erro de rede:** pare o backend → tela de erro com "Tentar novamente".
7. **Voltar:** a seta no cabeçalho deve voltar para a tela anterior.
8. **Sem sessão:** limpe o storage e acesse `/achievements` direto pela URL → redireciona para `/identify`.

---

## Bloco 7 — Professor

> Cobre: `(auth)/teacher-login.tsx`, `teacher/index.tsx`, `TeacherSessionContext`. Precisa de um usuário TEACHER/ADMIN (ver `backend/readme.md` seção de login — `seed:admin` cria o primeiro admin).

### Preparo

1. Garanta que existe pelo menos uma atividade `PENDING` (registre uma pelo app, ou via `POST /activities`).
2. Tenha em mãos o e-mail/senha de um usuário TEACHER ou ADMIN (seed-admin, ou criado via `POST /users` por um admin).

### Cenários

1. **Login:** na tela de Identificação, toque **"Acessar como professor"** → preencha e-mail/senha válidos → toque **Entrar** → deve ir para `/teacher`.
2. **Credenciais inválidas:** e-mail ou senha errados → aviso inline "Email ou senha inválidos" (mensagem vem direto do backend), sem travar a tela.
3. **Campos vazios:** tentar entrar sem preencher → aviso "Informe e-mail e senha." sem chamar a API.
4. **Lista de pendentes:** `/teacher` deve mostrar cada atividade `PENDING` com nome do participante (resolvido via `GET /participants`), data, tipo, distância e duração.
5. **Aprovar:** toque **Aprovar** em um item → o botão mostra loading, o item some da lista ao concluir. Confirme com `GET /activities/ID` que o `status` virou `APPROVED` e `points` foi calculado (se o tipo bater com o treino principal da semana daquela atividade).
6. **Rejeitar:** toque **Rejeitar** em outro item → mesma UX, item some, `status` vira `REJECTED` com `points: 0`.
7. **Sem pendentes:** aprove/rejeite tudo → deve aparecer o estado vazio "Tudo em dia".
8. **Erro de rede:** pare o backend e tente aprovar/rejeitar → aviso vermelho **na linha do item** (não trava a lista toda), e o item continua lá para tentar de novo.
9. **Sessão persistida:** feche e reabra o app (sem limpar storage) → deve continuar logado como professor ao acessar `/teacher` (não devolve pro login).
10. **Sair:** toque **Sair** no cabeçalho → desloga e volta para `/identify`; acessar `/teacher` de novo deve pedir login.
11. **Token expirado/inválido:** simule um 401 (ex.: edite o `token` salvo no `localStorage` em `@swimrank/teacher-session` para um valor inválido) e tente aprovar uma atividade → deve deslogar e voltar para `/teacher-login` automaticamente.
12. **Sem sessão:** limpe o storage e acesse `/teacher` direto pela URL → redireciona para `/teacher-login`.