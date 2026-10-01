
# 4. Frontend / App

## 4.1 Inicialização

* [x] Criar pasta `app`
* [x] Inicializar React Native
* [x] Configurar Expo
* [x] Configurar TypeScript
* [x] Verificar ambiente local
* [x] Executar primeiro build
* [x] Gerar primeira URL web
* [ ] Validar aplicação no navegador mobile

## 4.2 Estrutura

* [x] Definir estrutura de pastas
* [x] Configurar navegação
* [x] Configurar variáveis de ambiente
* [x] Criar componentes reutilizáveis
* [x] Criar design system
* [x] Definir design tokens
* [x] Definir tipografia
* [x] Definir espaçamentos
* [x] Definir botões
* [x] Definir inputs
* [x] Definir cards
* [x] Definir ícones/SVG

## 4.3 Telas V1

* [x] Splash
* [x] Identificação / cadastro
* [x] Home
* [ ] Registro de atividade
* [ ] Histórico de atividades
* [ ] Ranking
* [ ] Conquistas
* [ ] Fluxo básico professor/admin

---

# 5. Identificação do participante — V1

> A V1 não terá autenticação tradicional.
> A identificação inicial será simplificada para o MVP.

* [x] Criar tela de identificação
* [x] Criar input de nome
* [x] Validar nome
* [x] Definir identificador local
* [x] Salvar identificador localmente
* [x] Salvar nome localmente
* [x] Recuperar participante ao iniciar aplicação
* [x] Definir comportamento quando os dados locais não existirem
* [x] Definir comportamento quando participante trocar de dispositivo

---

# 11. Frontend ↔ Backend

* [x] Configurar API Base URL
* [x] Criar API client
* [x] Criar participant service
* [ ] Criar activity service
* [ ] Criar ranking service
* [ ] Criar achievement service
* [x] Implementar loading states
* [x] Implementar tratamento de erros
* [x] Implementar tratamento offline/network
* [x] Validar respostas da API (fluxo de participantes)
* [ ] Testar fluxo completo Frontend → API → MongoDB (falta 4.3 completa)

---

# 12. Frontend — Funcionalidades V1

## Participante

* [x] Criar cadastro/identificação
* [x] Conectar identificação à API
* [x] Persistir participante localmente
* [x] Recuperar participante no startup

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

> A criação de conquistas será somente via API! Não terá tela

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
