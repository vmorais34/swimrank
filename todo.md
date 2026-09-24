# SwimRank — To-do

**Delivery:** 27 de outubro
**Prazo:** 37 dias
**Node:** 24.11.1

---

# 1. Planejamento

* [x] Definir objetivo do MVP
* [x] Definir escopo da V1
* [x] Definir o que NÃO fará parte da V1
* [x] Definir público-alvo
* [x] Levantar requisitos com professores
* [x] Validar fluxo de utilização com a instituição
* [x] Definir regras de pontuação
* [x] Definir regras do ranking
* [x] Definir regras das conquistas
* [x] Definir quais dados serão registrados
* [ ] Definir indicadores de sucesso
* [x] Definir cronograma do desenvolvimento

---

# 2. Documentação inicial

## 2.1 README

* [ ] Criar `README.md`

  * [ ] Descrição do projeto
  * [ ] Problema
  * [ ] Objetivo
  * [ ] Público-alvo
  * [ ] Escopo da V1
  * [ ] Tecnologias
  * [ ] Como executar o projeto
  * [ ] Arquitetura
  * [ ] Roadmap

## 2.2 Documentação técnica

* [ ] Criar `docs/`

  * [ ] Requisitos funcionais
  * [ ] Requisitos não funcionais
  * [ ] Modelo de dados
  * [ ] Regras de pontuação
  * [ ] Estratégia de testes
  * [ ] Registro de decisões técnicas
  * [ ] Registro dos testes com usuários
  * [ ] Evolução do projeto

---

# 3. Repository / Git

* [x] Criar repositório Git
* [x] Criar `.gitignore`
* [x] Criar primeiro commit
* [x] Criar estrutura inicial do projeto

---

# 4. Frontend / App

## 4.1 Inicialização

* [x] Criar pasta `app`
* [x] Inicializar React Native
* [x] Configurar Expo
* [x] Configurar TypeScript
* [x] Verificar ambiente local
* [ ] Executar primeiro build
* [ ] Gerar primeira URL web
* [ ] Validar aplicação no navegador mobile

## 4.2 Estrutura

* [ ] Definir estrutura de pastas
* [ ] Configurar navegação
* [ ] Configurar variáveis de ambiente
* [ ] Criar componentes reutilizáveis
* [ ] Criar design system
* [ ] Definir design tokens
* [ ] Definir tipografia
* [ ] Definir espaçamentos
* [ ] Definir botões
* [ ] Definir inputs
* [ ] Definir cards
* [ ] Definir ícones/SVG

## 4.3 Telas V1

* [ ] Splash
* [ ] Identificação / cadastro
* [ ] Home
* [ ] Registro de atividade
* [ ] Histórico de atividades
* [ ] Ranking
* [ ] Conquistas
* [ ] Fluxo básico professor/admin

---

# 5. Identificação do participante — V1

> A V1 não terá autenticação tradicional.
> A identificação inicial será simplificada para o MVP.

* [ ] Criar tela de identificação
* [ ] Criar input de nome
* [ ] Validar nome
* [ ] Definir identificador local
* [ ] Salvar identificador localmente
* [ ] Salvar nome localmente
* [ ] Recuperar participante ao iniciar aplicação
* [ ] Definir comportamento quando os dados locais não existirem
* [ ] Definir comportamento quando participante trocar de dispositivo

---

# 6. Backend

## 6.1 Inicialização

* [x] Criar pasta `backend`
* [x] Inicializar Node.js
* [x] Configurar TypeScript
* [x] Instalar Express
* [x] Configurar servidor de desenvolvimento
* [x] Criar health-check
* [x] Testar primeira requisição
* [x] Configurar variáveis de ambiente

## 6.2 Arquitetura da API

* [x] Definir routes
* [x] Definir controllers
* [x] Definir services
* [x] Definir repositories
* [x] Definir validações
* [x] Definir tratamento de erros
* [x] Definir status HTTP
* [x] Definir padrão de respostas

---

# 7. Database

## 7.1 MongoDB

* [x] Criar banco MongoDB
* [x] Configurar conexão
* [x] Configurar variáveis de ambiente
* [x] Testar conexão
* [x] Definir collections

## 7.2 Participants

* [x] Definir schema

  * `name` → obrigatório, 2–100 caracteres
  * `birthdate` → obrigatório
  * `points` → inicia em 0, nunca negativo
  * `timestamps`
  * `_id` automático
* [x] Definir identificador
* [x] Definir nome
* [x] Definir pontos
* [x] Definir timestamps

## 7.3 Activities

* [x] Definir schema

  * `participantId`
  * `date`
  * `type`
  * `distance`
  * `time`
  * `points`
  * `status`
  * `validatedAt`
  * `createdAt`
  * `updatedAt`
* [x] Definir referência ao participante
* [x] Definir data
* [x] Definir tipo
* [x] Definir distância
* [x] Definir tempo
* [x] Definir pontos
* [x] Definir status
* [x] Definir validação

## 7.4 Trainings

* [x] Definir schema

  * `date`
  * `type`
  * `isMain`
  * `createdAt`
  * `updatedAt`
* [x] Definir tipo
* [x] Definir data
* [x] Definir `isMain`
* [x] Definir timestamps

## 7.5 Users

* [x] Criar POST `/users`
* [x] Hash de senha com bcrypt
* [x] Não expor `passwordHash`
* [x] Impedir email duplicado
* [x] Criar GET `/users`
* [x] Criar GET `/users/:id`
* [x] Validar ID inválido
* [x] Tratar usuário inexistente
* [x] Criar PATCH `/users/:id`
* [x] Tratar usuário inexistente
* [x] Criar DELETE `/users/:id`
* [x] Tratar usuário inexistente

> Autenticação/autorização não faz parte da V1.

## 7.6 Achievements

* [x] Definir schema

  * `name`
  * `description`
  * `requirement`
  * `points`
* [x] Definir nome
* [x] Definir descrição
* [x] Definir requisitos
* [x] Definir tipos de requisitos
* [x] Definir recompensa

## 7.7 ParticipantAchievements

* [x] Definir schema

  * `participantId`
  * `achievementId`
  * `unlockedAt`
  * `createdAt`
* [x] Definir referência ao participante
* [x] Definir referência à conquista
* [x] Definir timestamp
* [x] Impedir desbloqueio duplicado

## 7.8 Regras do banco

* [x] Definir relacionamentos/referências
* [x] Definir índices
* [x] Definir campos obrigatórios
* [x] Definir validações
* [x] Definir constraints
* [x] Criar seed de desenvolvimento
* [x] Testar operações do banco

---

# 8. API — V1

## 8.1 Participants

* [x] POST `/participants`
* [x] GET `/participants/:id`
* [x] GET `/participants`
* [x] PATCH `/participants/:id`
* [x] DELETE `/participants/:id`

### Testes

* [x] Criar participante
* [x] Impedir participante duplicado
* [x] Buscar participante
* [x] Listar participantes
* [x] Atualizar participante
* [x] Atualizar parcialmente
* [x] Rejeitar dados inválidos
* [x] Excluir participante
* [x] Tratar exclusão inexistente

---

## 8.2 Trainings

* [x] POST `/trainings`
* [x] GET `/trainings`
* [x] GET `/trainings/:id`
* [x] PATCH `/trainings/:id`
* [x] DELETE `/trainings/:id`

### Testes

* [x] Criar treino
* [x] Buscar treino
* [x] Atualizar treino
* [x] Excluir treino
* [x] Validar regra `isMain`
* [x] Impedir múltiplos treinos principais no mesmo período

---

## 8.3 Activities

* [x] POST `/activities`
* [x] GET `/activities/:id`
* [x] GET `/activities/participant/:participantId`
* [x] PATCH `/activities/:id`

### Testes

* [x] Criar atividade
* [x] Buscar atividade
* [x] Listar atividades
* [x] Validar atividade
* [x] Criar fluxo `PENDING`
* [x] Aprovar atividade
* [x] Rejeitar atividade
* [x] Preencher `validatedAt`
* [x] Impedir atividade rejeitada de pontuar
* [x] Impedir atividade pendente de pontuar

### Fora do escopo da V1

* [—] Testar validação sem autorização
* [—] Testar validação específica de professor

> A V1 não possui autenticação/autorização implementada.

---

# 9. Pontos, Ranking e Gamificação

## 9.1 Pontuação

* [x] Definir regras de pontuação
* [x] Definir correspondência com treino principal
* [x] Pontuar somente atividades aprovadas
* [x] Pontuar somente quando o tipo corresponde ao treino principal
* [x] Definir pontuação parcial
* [x] Definir pontuação integral
* [x] Definir bônus semanal
* [x] Definir regra de ausência
* [x] Criar fluxo de registro de pontos
* [x] Impedir participante de alterar pontos diretamente
* [x] Testar cálculo
* [x] Testar persistência

## 9.2 Ranking

### Ranking por pontos

* [x] Criar ranking semanal
* [x] Criar ranking mensal
* [x] Criar ranking geral
* [x] Ordenar por pontos
* [x] Retornar posição

### Ranking por distância

* [x] Criar ranking semanal
* [x] Somar distância das atividades aprovadas
* [x] Ignorar atividades rejeitadas
* [x] Retornar posição
* [x] Testar ranking

### Ranking por presença

> Regra: **1 atividade `APPROVED` = 1 presença.**

* [x] Criar ranking semanal
* [x] Contabilizar atividades aprovadas
* [x] Ignorar `PENDING`
* [x] Ignorar `REJECTED`
* [x] Retornar posição
* [x] Testar ranking

### Ranking geral

* [x] Definir regra de desempate
* [x] Aplicar posições com empate
* [x] Testar múltiplos participantes

---

# 10. Achievements

* [x] Criar achievement
* [x] Listar achievements
* [x] Buscar achievement
* [x] Definir requisitos
* [x] Criar avaliação automática
* [x] Criar fluxo de desbloqueio
* [x] Impedir duplicidade
* [x] Registrar ParticipantAchievement
* [x] Listar conquistas do participante
* [x] Testar desbloqueio
* [x] Testar cálculo dos requisitos

---

# 11. Frontend ↔ Backend

* [ ] Configurar API Base URL
* [ ] Criar API client
* [ ] Criar participant service
* [ ] Criar activity service
* [ ] Criar ranking service
* [ ] Criar achievement service
* [ ] Implementar loading states
* [ ] Implementar tratamento de erros
* [ ] Implementar tratamento offline/network
* [ ] Validar respostas da API
* [ ] Testar fluxo completo Frontend → API → MongoDB

---

# 12. Frontend — Funcionalidades V1

## Participante

* [ ] Criar cadastro/identificação
* [ ] Conectar identificação à API
* [ ] Persistir participante localmente
* [ ] Recuperar participante no startup

## Atividades

* [ ] Criar tela de registro
* [ ] Permitir somente atividades de natação
* [ ] Conectar registro à API
* [ ] Exibir histórico
* [ ] Exibir status da atividade

## Ranking

* [ ] Criar ranking principal
* [ ] Criar ranking de pontos
* [ ] Criar ranking de distância
* [ ] Criar ranking de presença
* [ ] Exibir posição do participante

## Achievements

* [ ] Criar tela de conquistas
* [ ] Exibir conquistas desbloqueadas
* [ ] Exibir conquistas bloqueadas

## Professor/Admin

* [ ] Criar fluxo básico
* [ ] Visualizar atividades pendentes
* [ ] Aprovar atividade
* [ ] Rejeitar atividade

---

# 13. UI / UX

* [ ] Criar wireframes finais
* [ ] Validar fluxo de navegação
* [ ] Implementar layout mobile-first
* [ ] Implementar dashboard
* [ ] Implementar ranking
* [ ] Implementar histórico
* [ ] Implementar conquistas
* [ ] Implementar fluxo professor
* [ ] Criar estados vazios
* [ ] Criar estados de carregamento
* [ ] Criar estados de erro
* [ ] Testar usabilidade
* [ ] Testar diferentes tamanhos de tela

---

# 14. Testing

## 14.1 Unit tests

* [ ] Testar cálculo de pontos
* [ ] Testar cálculo de ranking
* [ ] Testar regras de achievements
* [ ] Testar validações

## 14.2 API tests

* [ ] Testar endpoints de participantes
* [ ] Testar endpoints de atividades
* [ ] Testar endpoints de ranking
* [ ] Testar endpoints de achievements
* [ ] Testar requisições inválidas
* [ ] Testar dados ausentes
* [ ] Testar erros do servidor

## 14.3 Integration tests

* [ ] Frontend → API
* [ ] API → MongoDB
* [ ] Registro completo de atividade
* [ ] Fluxo completo de ranking
* [ ] Fluxo completo de achievement

## 14.4 Testes manuais

* [ ] Primeiro acesso
* [ ] Usuário retornando
* [ ] Participante sem atividades
* [ ] Participante com atividades
* [ ] Múltiplos participantes
* [ ] Atualização do ranking
* [ ] Desbloqueio de achievement
* [ ] Layout mobile
* [ ] Diferentes tamanhos de tela
* [ ] Falha de rede

---

# 15. Testes com a instituição

* [ ] Preparar ambiente de testes
* [ ] Criar participantes de teste
* [ ] Definir cenários
* [ ] Testar com professores
* [ ] Testar com alunos
* [ ] Coletar feedback
* [ ] Registrar problemas de usabilidade
* [ ] Registrar problemas técnicos
* [ ] Registrar solicitações de funcionalidades
* [ ] Registrar observações
* [ ] Consolidar feedback

---

# 16. Análise técnica

* [ ] Comparar requisitos × funcionalidades
* [ ] Identificar requisitos faltantes
* [ ] Identificar limitações técnicas
* [ ] Identificar problemas de usabilidade
* [ ] Identificar problemas de consistência de dados
* [ ] Analisar feedback
* [ ] Analisar indicadores
* [ ] Documentar aprendizados
* [ ] Identificar melhorias futuras

---

# 17. V1 Release

* [ ] Revisar escopo do MVP
* [ ] Corrigir bugs críticos
* [ ] Revisar segurança
* [ ] Revisar variáveis de ambiente
* [ ] Remover credenciais de desenvolvimento
* [ ] Configurar banco de produção
* [ ] Configurar API de produção
* [ ] Configurar frontend de produção
* [ ] Testar ambiente de produção
* [ ] Gerar build final
* [ ] Validar MVP final

---

# 18. Publicação / Distribuição

## Web — V1

* [ ] Disponibilizar MVP através de URL
* [ ] Compartilhar URL com instituição
* [ ] Validar acesso em dispositivos móveis

## Android — Futuro

* [ ] Criar conta Google Play Developer
* [ ] Configurar package name
* [ ] Criar ícone
* [ ] Criar screenshots
* [ ] Criar descrição
* [ ] Definir informações de privacidade
* [ ] Gerar `.aab`
* [ ] Configurar teste interno
* [ ] Configurar teste fechado
* [ ] Coletar testers
* [ ] Validar aplicação
* [ ] Preparar publicação

---

# 19. PEX Documentation

* [ ] Documentar planejamento
* [ ] Documentar levantamento de requisitos
* [ ] Documentar decisões técnicas
* [ ] Documentar desenvolvimento
* [ ] Documentar implementação
* [ ] Documentar testes
* [ ] Documentar feedback dos usuários
* [ ] Documentar diagnóstico técnico
* [ ] Documentar problemas encontrados
* [ ] Documentar soluções
* [ ] Documentar aprendizados
* [ ] Documentar indicadores
* [ ] Documentar resultados
* [ ] Documentar limitações
* [ ] Documentar continuidade

---

# 20. V2 — Future roadmap

## Authentication

* [ ] Criar cadastro de usuário
* [ ] Criar login
* [ ] Recuperação de senha
* [ ] Implementar autenticação/sessão
* [ ] Migrar identidade local para conta autenticada

## Profile

* [ ] Criar perfil
* [ ] Editar perfil
* [ ] Visualizar estatísticas
* [ ] Visualizar histórico

## Gamification

* [ ] Criar níveis
* [ ] Criar desafios
* [ ] Expandir rankings
* [ ] Criar metas
* [ ] Expandir achievements

## Notifications

* [ ] Avaliar push notifications
* [ ] Lembretes de atividade
* [ ] Notificações de achievements
* [ ] Notificações de desafios

---

# 21. Final Review

* [ ] Revisar código
* [ ] Revisar arquitetura
* [ ] Revisar banco
* [ ] Revisar API
* [ ] Revisar testes
* [ ] Revisar documentação
* [ ] Revisar requisitos do PEX
* [ ] Revisar evidências
* [ ] Revisar plano de continuidade
* [ ] Criar versão final
* [ ] Criar apresentação final
* [ ] Preparar demonstração
