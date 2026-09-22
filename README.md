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