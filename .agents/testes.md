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
