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