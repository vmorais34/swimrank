# SwimRank — To-do

Delivery: 27 de outubro
41 dias

Node: 24.11.1

## 1. Planejamento

- [x] Definir objetivo do MVP
- [x] Definir escopo da V1
- [x] Definir o que NÃO fará parte da V1
- [x] Definir público-alvo
- [ ] Levantar requisitos com professores (Em paralelo)
- [ ] Validar fluxo de utilização com a instituição (Em paralelo)
- [ ] Definir regras de pontuação (Em paralelo)
- [ ] Definir regras do ranking (Em paralelo)
- [ ] Definir regras das conquistas (Em paralelo)
- [ ] Definir quais dados serão registrados (Em paralelo)
- [ ] Definir indicadores de sucesso (Em paralelo)
- [x] Definir cronograma do desenvolvimento

---

## 2. Documentação inicial

- [ ] Create `README.md`
  - [ ] Descrição do projeto
  - [ ] Problema
  - [ ] Objetivo
  - [ ] Público-alvo
  - [ ] Escopo da V1
  - [ ] Tecnologias
  - [ ] Como executar o projeto
  - [ ] Arquitetura
  - [ ] Roadmap

- [ ] Create `docs/`
  - [ ] Requisitos funcionais
  - [ ] Requisitos não funcionais
  - [ ] Modelo de dados
  - [ ] Regras de pontuação
  - [ ] Estratégia de testes
  - [ ] Registro de decisões técnicas
  - [ ] Registro dos testes com usuários
  - [ ] Evolução do projeto

---

## 3. Repository / Git

- [x] Create Git repository
- [x] Create `.gitignore`
- [x] Create first commit
- [x] Create initial project structure

---

# 4. Frontend / App

## 4.1 Inicialização

- [x] Create folder `app`
- [x] Initialize React Native project
- [x] Configure Expo
- [x] Configure TypeScript
- [ ] Verify local development environment
- [ ] Run first build
- [ ] Generate first web URL
- [ ] Verify application on mobile browser

## 4.2 Estrutura

- [ ] Define folder structure
- [ ] Configure navigation
- [ ] Configure environment variables
- [ ] Define reusable components
- [ ] Define basic design system
- [ ] Define typography
- [ ] Define spacing
- [ ] Define buttons / inputs / cards

## 4.3 First screens

- [ ] Create initial/splash screen
- [ ] Create participant identification screen
- [ ] Create home screen
- [ ] Create ranking screen
- [ ] Create activity history screen
- [ ] Create achievements screen
- [ ] Create basic professor/admin screen

---

# 5. Identificação do participante — V1

- [ ] Create participant name input
- [ ] Validate name
- [ ] Generate local participant identifier
- [ ] Save participant identifier locally
- [ ] Save participant name locally
- [ ] Recover participant on application startup
- [ ] Define behavior when local data is unavailable
- [ ] Define behavior when participant changes device

> Nota:
> A V1 não terá autenticação.
> A identificação local será utilizada apenas para reduzir a complexidade do MVP.

---

# 6. Backend

## 6.1 Inicialização

- [x] Create folder `backend`
- [x] Initialize Node.js project
- [x] Configure TypeScript
- [x] Install Express
- [x] Configure development server
- [ ] Create health-check endpoint
- [ ] Test first API request
- [ ] Configure environment variables

## 6.2 Estrutura da API

- [ ] Define routes
- [ ] Define controllers
- [ ] Define services
- [ ] Define repositories/data access
- [ ] Define validation
- [ ] Define error handling
- [ ] Define HTTP status conventions
- [ ] Define API response pattern

---

# 7. Database

## 7.1 MongoDB

- [ ] Create MongoDB database
- [ ] Configure connection
- [ ] Configure environment variables
- [ ] Test database connection
- [ ] Define collections

## 7.2 Collections

### Participants

- [ ] Define schema
- [ ] Define unique identifier
- [ ] Define participant name
- [ ] Define points
- [ ] Define timestamps

### Activities

- [ ] Define schema
- [ ] Define participant reference
- [ ] Define date
- [ ] Define activity type
- [ ] Define distance
- [ ] Define time
- [ ] Define points

### Achievements

- [ ] Define schema
- [ ] Define achievement name
- [ ] Define description
- [ ] Define requirement
- [ ] Define points/reward

## 7.3 Database rules

- [ ] Define relationships/references
- [ ] Define indexes
- [ ] Define required fields
- [ ] Define validation rules
- [ ] Define seed data for development
- [ ] Test CRUD operations

---

# 8. API — V1

## Participants

- [ ] `POST /participants`
- [ ] `GET /participants/:id`
- [ ] `GET /participants`
- [ ] Test participant creation
- [ ] Test participant retrieval

## Activities

- [ ] `POST /activities`
- [ ] `GET /participants/:id/activities`
- [ ] Test activity creation
- [ ] Test activity retrieval

## Points

- [ ] Define point calculation
- [ ] Create point registration flow
- [ ] Prevent participant from directly modifying points
- [ ] Test point calculation
- [ ] Test point persistence

## Ranking

- [ ] Create ranking endpoint
- [ ] Sort participants by points
- [ ] Define tie-breaking rule
- [ ] Test ranking
- [ ] Test ranking with multiple participants

## Achievements

- [ ] Define achievement rules
- [ ] Create achievement evaluation
- [ ] Save unlocked achievements
- [ ] Test achievement unlocking

---

# 9. Frontend ↔ Backend

- [ ] Configure API base URL
- [ ] Create API client
- [ ] Create participant service
- [ ] Create activity service
- [ ] Create ranking service
- [ ] Create achievement service
- [ ] Handle loading states
- [ ] Handle API errors
- [ ] Handle offline/network failure
- [ ] Validate API responses
- [ ] Test complete data flow

---

# 10. Gamification

- [ ] Define point rules
- [ ] Define participation points
- [ ] Define performance points
- [ ] Define achievement rules
- [ ] Define ranking rules
- [ ] Define possible anti-cheating rules
- [ ] Validate rules with professors
- [ ] Implement rules
- [ ] Test edge cases

---

# 11. UI / UX

- [ ] Create wireframes
- [ ] Validate navigation flow
- [ ] Implement mobile-first layout
- [ ] Implement participant dashboard
- [ ] Implement ranking
- [ ] Implement activity history
- [ ] Implement achievements
- [ ] Implement professor flow
- [ ] Add empty states
- [ ] Add loading states
- [ ] Add error states
- [ ] Test usability with users

---

# 12. Testing

## Unit tests

- [ ] Test point calculation
- [ ] Test ranking calculation
- [ ] Test achievement rules
- [ ] Test data validation

## API tests

- [ ] Test participant endpoints
- [ ] Test activity endpoints
- [ ] Test ranking endpoint
- [ ] Test achievement endpoint
- [ ] Test invalid requests
- [ ] Test missing data
- [ ] Test server errors

## Integration tests

- [ ] Test frontend → API
- [ ] Test API → MongoDB
- [ ] Test complete activity registration flow
- [ ] Test complete ranking flow

## Manual tests

- [ ] Test first access
- [ ] Test returning user
- [ ] Test participant with no activities
- [ ] Test participant with activities
- [ ] Test multiple participants
- [ ] Test ranking updates
- [ ] Test achievement unlocking
- [ ] Test mobile layouts
- [ ] Test different screen sizes
- [ ] Test network failure

---

# 13. Testes com a instituição

- [ ] Prepare test environment
- [ ] Create test participants
- [ ] Define test scenario
- [ ] Test with teachers
- [ ] Test with students
- [ ] Collect feedback
- [ ] Record usability problems
- [ ] Record technical problems
- [ ] Record feature requests
- [ ] Record observations
- [ ] Consolidate feedback

---

# 14. Análise técnica

- [ ] Compare requirements × implemented features
- [ ] Identify missing requirements
- [ ] Identify technical limitations
- [ ] Identify usability problems
- [ ] Identify data consistency problems
- [ ] Analyze user feedback
- [ ] Analyze indicators
- [ ] Document lessons learned
- [ ] Identify opportunities for improvement

---

# 15. V1 Release

- [ ] Review MVP scope
- [ ] Fix critical bugs
- [ ] Review security
- [ ] Review environment variables
- [ ] Remove development credentials
- [ ] Configure production database
- [ ] Configure production API
- [ ] Configure production frontend
- [ ] Test production environment
- [ ] Generate final build
- [ ] Validate final MVP

---

# 16. Publication / Distribution

## Initial

- [ ] Make MVP available through web URL
- [ ] Share test URL with institution
- [ ] Validate access from mobile devices

## Future Android publication

- [ ] Create Google Play Developer account
- [ ] Configure application package name
- [ ] Create application icon
- [ ] Create screenshots
- [ ] Create store description
- [ ] Define privacy/data disclosure information
- [ ] Generate Android App Bundle (`.aab`)
- [ ] Configure internal testing
- [ ] Configure closed testing
- [ ] Collect required testers
- [ ] Validate application
- [ ] Prepare production release

---

# 17. PEX Documentation

- [ ] Document planning
- [ ] Document requirements gathering
- [ ] Document technical decisions
- [ ] Document development process
- [ ] Document implementation
- [ ] Document tests
- [ ] Document user feedback
- [ ] Document technical diagnosis
- [ ] Document problems encountered
- [ ] Document solutions implemented
- [ ] Document lessons learned
- [ ] Document indicators
- [ ] Document results
- [ ] Document limitations
- [ ] Document continuity plan

---

# 18. V2 — Future roadmap

## Authentication

- [ ] Create user registration
- [ ] Create login
- [ ] Create password recovery
- [ ] Implement authentication/session
- [ ] Migrate V1 local identity to authenticated account

## User profile

- [ ] Create profile
- [ ] Edit profile
- [ ] View personal statistics
- [ ] View activity history

## Gamification

- [ ] Create levels
- [ ] Create challenges
- [ ] Create weekly/monthly rankings
- [ ] Create goals
- [ ] Expand achievements

## Sports data

- [ ] Evaluate Garmin integration
- [ ] Evaluate Strava integration
- [ ] Evaluate automatic activity import
- [ ] Evaluate performance metrics

## Notifications

- [ ] Evaluate push notifications
- [ ] Activity reminders
- [ ] Achievement notifications
- [ ] Challenge notifications

---

# 19. Final Review

- [ ] Review source code
- [ ] Review architecture
- [ ] Review database
- [ ] Review API
- [ ] Review tests
- [ ] Review documentation
- [ ] Review PEX requirements
- [ ] Review evidence collected
- [ ] Review continuity plan
- [ ] Create final project version
- [ ] Create final presentation
- [ ] Prepare project demonstration