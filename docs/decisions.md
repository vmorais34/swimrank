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

# ADR — Estratégia de domínio e infraestrutura para produção

**Status:** Planejado
**Data:** 25/09/2026

## Contexto

O SwimRank está sendo desenvolvido inicialmente com backend em Node.js/Express, MongoDB e aplicativo mobile utilizando Expo/React Native.

Como a aplicação terá como objetivo principal funcionar como um aplicativo mobile, não será necessário manter um frontend web para que o produto funcione.

Entretanto, será utilizado um domínio próprio para separar a identidade pública do projeto da infraestrutura de backend.

## Decisão

A arquitetura futura do SwimRank utilizará:

```text
swimrank.com
    ↓
Site institucional / páginas públicas
    ├── Apresentação do projeto
    ├── Política de privacidade
    ├── Termos de uso
    └── Suporte / informações do aplicativo


api.swimrank.com
    ↓
Backend Node.js + Express
    ↓
MongoDB Atlas


Aplicativo Mobile
    ↓ HTTPS
https://api.swimrank.com
    ↓
Backend
    ↓
MongoDB Atlas
```

O aplicativo mobile não dependerá de um frontend web para sua execução.

O domínio `api.swimrank.com` será utilizado como endereço público e estável da API, independentemente da plataforma de hospedagem utilizada pelo backend.

## Motivações

* Separar claramente frontend/site institucional e backend.
* Evitar que o aplicativo dependa diretamente do domínio ou URL da plataforma de hospedagem.
* Permitir migração futura de infraestrutura sem necessidade de alterar a arquitetura do aplicativo.
* Disponibilizar uma identidade própria para a API.
* Facilitar a publicação de políticas, termos e páginas de suporte.
* Preparar o projeto para evolução futura sem introduzir uma dependência obrigatória de frontend web.

## Infraestrutura planejada

Inicialmente, o backend poderá ser hospedado em uma plataforma gerenciada, como Render ou Railway.

O banco de dados de produção será hospedado no MongoDB Atlas.

O domínio e DNS poderão ser gerenciados pelo Cloudflare.

Exemplo:

```text
Cloudflare
    │
    ├── swimrank.com
    │       ↓
    │   Site institucional
    │
    └── api.swimrank.com
            ↓
        Backend hospedado
            ↓
        MongoDB Atlas
```

## Ambientes

A arquitetura deverá considerar a separação entre desenvolvimento, staging e produção:

```text
Development
localhost
    ↓
MongoDB local


Staging
api-staging.swimrank.com
    ↓
Backend de testes
    ↓
MongoDB Atlas — staging


Production
api.swimrank.com
    ↓
Backend de produção
    ↓
MongoDB Atlas — production
```

Hoje já deixei pronto
                 ┌─────────────────┐
                 │   Expo / Mobile │
                 └────────┬────────┘
                          │ HTTPS
                          ▼
                ┌───────────────────┐
                │  Render           │
                │  Express + TS     │
                │                   │
                │ Auth / JWT        │
                │ RBAC              │
                │ Controllers       │
                │ Services          │
                │ Repositories      │
                │ Validation        │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │   MongoDB Atlas   │
                └───────────────────┘

## Segurança

As credenciais e informações sensíveis deverão permanecer em variáveis de ambiente.

O arquivo `.env` não deverá ser versionado no Git.

A comunicação entre aplicativo e API deverá utilizar HTTPS.

O banco de produção deverá possuir credenciais e configuração independentes do ambiente de desenvolvimento.

## Consequências

### Positivas

* Arquitetura preparada para produção.
* Menor acoplamento entre aplicativo e infraestrutura.
* Possibilidade de trocar o provedor de hospedagem.
* Endereço estável para consumo da API.
* Estrutura preparada para crescimento futuro.

### Negativas

* Necessidade de administrar domínio e DNS.
* Custos futuros de domínio/hospedagem, dependendo dos provedores escolhidos.
* Maior quantidade de componentes de infraestrutura.
* Necessidade de configurar ambientes separados.

## Próximas etapas

1. Registrar o domínio `swimrank.com`.
2. Configurar DNS através do Cloudflare.
3. Criar banco de produção no MongoDB Atlas.
4. Hospedar o backend em uma plataforma gerenciada.
5. Configurar variáveis de ambiente de produção.
6. Configurar `api.swimrank.com`.
7. Configurar HTTPS.
8. Validar o endpoint `/health` em produção.
9. Configurar o aplicativo Expo para consumir a API de produção.
10. Criar páginas públicas de política de privacidade, termos e suporte.
11. Separar configurações de Development, Staging e Production.
12. Documentar o processo de deploy e rollback.

## Decisão futura

A implementação de um frontend web completo permanece fora do escopo inicial do aplicativo mobile.

Caso futuramente seja necessário disponibilizar uma versão web, ela poderá ser adicionada sem modificar a função do domínio da API:

```text
swimrank.com       → Web / institucional
app.swimrank.com   → Frontend web, caso necessário
api.swimrank.com   → Backend
```
