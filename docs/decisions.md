# Projeto SwimRank
arquivo vivo.

versão node escolhida 24.x.x


## Backend

boa oportunidade para pensar:
  Por que eu não deveria permitir que o cliente envie points no cadastro?

Decisão fundamental quando construirmos a lógica de pontuação do SwimRank.
Apenas no path da pontuação vamos poder mexer nesse dado, visto que posteriorme isso poderá ser editado via professores.

E na verdade a pontuação será com base em uma tabela/ a pontuação sera dinamica;
1. fez aula toda: 
  - pontuação total
2. fez aula pela metade:
  - metade da pontuação
3. não faltou nenhum dia da semana
  - 25% a mais
4. faltou aula
 - não recebe pontuação

esse lógica da regra deverá ficar em um serviço específico.

src/
├── models/
│   ├── Participant.ts
│   └── Activity.ts
│
├── services/
│   └── scoring/
│       └── scoring.service.ts

## Pontuação e Gamificação

* `Participant.points` representa o saldo acumulado de pontos e não deve ser alterado diretamente pelo cliente.
* Pontos são calculados a partir das atividades realizadas e das regras de pontuação do SwimRank.
* A pontuação será dinâmica, baseada em uma tabela/configuração de regras.
* Aula completa: 100% da pontuação base.
* Aula pela metade: 50% da pontuação base.
* Falta: 0 pontos.
* Participação em todos os dias/aulas previstos na semana: bônus de 25%.
* A lógica de cálculo ficará isolada em um serviço de pontuação, evitando regras espalhadas pelos controllers/models.
* Alterações manuais de pontuação por professores deverão ser rastreáveis, preferencialmente por meio de registros de ajuste, e não pela edição direta de `Participant.points`.
* A regra do bônus semanal depende de identificar quais aulas/dias estavam previstos para cada participante.
* `Activity` armazenará o evento realizado e os pontos resultantes do cálculo, permitindo histórico e auditoria.


## Zod para validações de schema

1. validação ocorrendo pelo birthdate único! e não pelo nome;

## Validação de Erros da API

Ótimo momento para fazer isso, porque agora temos Zod + Service + Repository + MongoDB, e não queremos que cada controller fique responsável por descobrir como cada erro deve virar HTTP.

Não quero continuar fazendo:
  throw new Error('PARTICIPANT_ALREADY_EXISTS');

Agora será de maneira profissional:
  throw new AppError(
    'Participante já cadastrado',
    409,
    'PARTICIPANT_ALREADY_EXISTS'
  );

Antes:
Controller
├── valida
├── try
├── catch duplicidade
├── catch erro genérico
├── resposta 400
├── resposta 409
└── resposta 500

Agora:
Controller
└── HTTP

Muito melhor.

--

### Uma observação arquitetural
Percebi que o GET está começando a repetir isso:

if (!result.success) {
  return res.status(400).json(...)
}

E o POST também faz isso.
Não vou resolver isso agora.

Depois que terminar o CRUD, usaremos um middleware validate()

### Fluxo
Participante registra
        ↓
Activity
status = PENDING
        ↓
Professor verifica
        ↓
   ┌────┴────┐
   ↓         ↓
APPROVED   REJECTED
   ↓
entra no ranking




## 3 decisões de negócio importantes:

A. O que exatamente é uma Activity?
R: qualquer atividade de natação que o participant registra no app

B. Quem define o type do treino principal?

Professor define:
Ex: Semana 38
→ treino principal = CRAWL

C. Como vocês definem presença?
R: Aluno registra atividade e professor valida; a validação conta como presença.

                    ┌──────────────┐
                    │  Participant │
                    └──────┬───────┘
                           │
                           │ registra
                           ↓
                    ┌──────────────┐
                    │   Activity   │
                    └──────┬───────┘
                           │
                           │ Validado pelo
                           ↓
                    ┌──────────────┐
                    │   Training   │ Registrado pelo Professor
                    └──────────────┘

                    ┌──────────────┐
                    │ Achievement  │
                    └──────┬───────┘
                           │
                           ↓
              ┌────────────────────────┐
              │ ParticipantAchievement │
              └────────────────────────┘

Training = treino oficial definido pelo professor para aquela semana.
Activity = atividade que o aluno realizou e registrou no app.

Training
    ↓
define regra do ranking

Activity
    ↓
registra o que o aluno fez


## Autenticação e autorização de professores

Foi decidido que, embora a V1 não utilize autenticação para participantes — que continuarão sendo identificados localmente no dispositivo —, operações privilegiadas realizadas por professores não podem permanecer sem controle de acesso. A aprovação ou rejeição de atividades, assim como outras operações administrativas, deve ser executada somente por usuários autenticados com permissão adequada. Para isso, será criada uma entidade `User`, inicialmente destinada aos papéis `TEACHER` e `ADMIN`, com autenticação por credenciais e autorização baseada em papel (role). As rotas que alteram dados administrativos, como a validação de atividades e o gerenciamento dos treinamentos, serão protegidas por middleware de autenticação e autorização. A identidade do professor nunca será recebida livremente no corpo da requisição como forma de autenticação; ela será obtida a partir da sessão/token autenticado. A autenticação completa dos participantes permanece fora do escopo da V1 e fica planejada para uma versão futura, sendo essa limitação considerada no modelo de segurança do MVP.

identificação local do participante ≠ autenticação/autorização do professor.

Fluxo:
                    ┌──────────────┐
                    │     User     │
                    │              │
                    │ TEACHER      │
                    │ ADMIN        │
                    └──────┬───────┘
                           │
                      autenticação
                           │
                           ▼
                    ┌──────────────┐
                    │      API     │
                    └──────┬───────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
       Participant                    Teacher
       operations                  operations
             │                           │
             ▼                           ▼
        Activities                 Validation

## Ranking

  1. Não vai ter ranking por sexo.

  
## Alinhado com o stakeholders

Principalmente “regras da gamificação” antes do código.

1. O aluno ganha pontos por presença? distancia, tempo?
R: Não, será apenas pontuado a atividade principal da semana.
1. Por completar determinada atividade?
R: Sim, Na atividade principal da semana.
2. Professor pode corrigir pontos?
R: Não, sera automatico
3. Pode haver empate?
R: Sim
4. O ranking é geral ou semanal/mensal ou semestral?
R: Para a V! semanal e mensal.
5. Quem treina mais vezes na semana ganha mais pontos?
R: Resolvido, pontunado apenas na atividade principal da semana

## Pontuação
aula completa → pontuação total
meia aula → metade
semana sem faltas → +25%
falta → 0
atividade precisa estar APPROVED
ranking considera o Training principal da semana
atividade precisa ter o mesmo type do treinamento principal