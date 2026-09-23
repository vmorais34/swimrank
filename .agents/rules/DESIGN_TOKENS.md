# SwimRank — Design Tokens

> Design system base para o aplicativo mobile SwimRank.
>
> Objetivo: centralizar cores, tipografia, espaçamentos, bordas, sombras e dimensões para manter consistência visual entre todas as telas.

---

## 1. Princípios visuais

O SwimRank utiliza uma identidade visual inspirada em:

* Água e piscina
* Esporte
* Performance
* Gamificação
* Leveza
* Clareza
* Evolução

A interface deve transmitir uma sensação de **ambiente aquático moderno**, evitando excesso de elementos visuais.

### Diretrizes

* Fundo predominantemente azul/azul-marinho.
* Superfícies ligeiramente mais claras que o fundo.
* Azul/ciano utilizado como cor de destaque.
* Branco para informações principais.
* Cinza-azulado para informações secundárias.
* Verde para estados positivos/aprovação.
* Vermelho apenas para erros ou estados críticos.
* Bordas arredondadas.
* Sombras discretas.
* Evitar preto puro.
* Evitar branco puro como fundo principal.

---

# 2. Color Tokens

## 2.1 Brand

Cores principais da identidade do SwimRank.

| Token                         | Hex       | Uso                         |
| ----------------------------- | --------- | --------------------------- |
| `color-brand-primary`         | `#0EA5E9` | Ações principais, destaques |
| `color-brand-primary-dark`    | `#0284C7` | Pressed states              |
| `color-brand-primary-light`   | `#38BDF8` | Destaques secundários       |
| `color-brand-secondary`       | `#06B6D4` | Elementos aquáticos         |
| `color-brand-secondary-light` | `#22D3EE` | Ícones e pequenos destaques |

### Uso

```text
Primary
████████  #0EA5E9

Primary Dark
████████  #0284C7

Primary Light
████████  #38BDF8

Secondary
████████  #06B6D4

Secondary Light
████████  #22D3EE
```

---

# 3. Background Colors

## 3.1 App Background

| Token                            | Hex       | Uso                           |
| -------------------------------- | --------- | ----------------------------- |
| `color-background-primary`       | `#071A2B` | Fundo principal               |
| `color-background-secondary`     | `#0A2238` | Seções secundárias            |
| `color-background-tertiary`      | `#0D2D47` | Áreas elevadas                |
| `color-background-surface`       | `#103852` | Cards e containers            |
| `color-background-surface-hover` | `#15445F` | Estado pressionado/interativo |

### Hierarquia

```text
Primary
#071A2B

Secondary
#0A2238

Tertiary
#0D2D47

Surface
#103852

Surface Hover
#15445F
```

A regra é:

> Quanto mais elevado visualmente o componente, mais clara pode ser sua superfície.

---

# 4. Text Colors

| Token                   | Hex       | Uso                              |
| ----------------------- | --------- | -------------------------------- |
| `color-text-primary`    | `#F8FAFC` | Títulos e informações principais |
| `color-text-secondary`  | `#CBD5E1` | Textos secundários               |
| `color-text-tertiary`   | `#94A3B8` | Labels e informações auxiliares  |
| `color-text-disabled`   | `#64748B` | Elementos desabilitados          |
| `color-text-on-primary` | `#FFFFFF` | Texto sobre Primary              |
| `color-text-link`       | `#38BDF8` | Links e ações secundárias        |

### Regra de contraste

Informações importantes devem utilizar:

```text
Primary text
#F8FAFC
```

Informações auxiliares:

```text
Secondary text
#CBD5E1

Tertiary text
#94A3B8
```

---

# 5. Semantic Colors

## 5.1 Success

| Token                      | Hex       | Uso                   |
| -------------------------- | --------- | --------------------- |
| `color-success`            | `#22C55E` | Sucesso               |
| `color-success-dark`       | `#16A34A` | Estado pressionado    |
| `color-success-background` | `#123B2A` | Background de sucesso |
| `color-success-text`       | `#86EFAC` | Texto de sucesso      |

Exemplos:

* Atividade aprovada
* Meta concluída
* Presença confirmada
* Pontuação adicionada

---

## 5.2 Warning

| Token                      | Hex       | Uso                |
| -------------------------- | --------- | ------------------ |
| `color-warning`            | `#F59E0B` | Avisos             |
| `color-warning-dark`       | `#D97706` | Estado pressionado |
| `color-warning-background` | `#3B2A0F` | Background         |
| `color-warning-text`       | `#FCD34D` | Texto              |

Exemplos:

* Atividade pendente
* Informação incompleta
* Atenção necessária

---

## 5.3 Error

| Token                    | Hex       | Uso                |
| ------------------------ | --------- | ------------------ |
| `color-error`            | `#EF4444` | Erros              |
| `color-error-dark`       | `#DC2626` | Estado pressionado |
| `color-error-background` | `#3B1515` | Background         |
| `color-error-text`       | `#FCA5A5` | Texto              |

Exemplos:

* Erro de validação
* Login inválido
* Falha na requisição

---

## 5.4 Info

| Token                   | Hex       | Uso        |
| ----------------------- | --------- | ---------- |
| `color-info`            | `#38BDF8` | Informação |
| `color-info-background` | `#0C3047` | Background |
| `color-info-text`       | `#7DD3FC` | Texto      |

---

# 6. Ranking Colors

Como o ranking é uma das funcionalidades centrais do SwimRank, ele possui tokens próprios.

## 6.1 Medalhas

| Token                  | Hex       | Uso      |
| ---------------------- | --------- | -------- |
| `color-ranking-gold`   | `#FACC15` | 1º lugar |
| `color-ranking-silver` | `#CBD5E1` | 2º lugar |
| `color-ranking-bronze` | `#D97706` | 3º lugar |

### Destaque do primeiro colocado

```text
#FACC15
```

deve ser utilizado com moderação.

Exemplos:

* Ícone da medalha
* Borda do primeiro colocado
* Pequeno destaque de pontuação

Não utilizar como background da tela inteira.

---

# 7. Activity Status Colors

As atividades possuem estados relacionados ao fluxo de validação.

## Pending

```text
Background: #3B2A0F
Text:       #FCD34D
Icon:       #F59E0B
```

## Approved

```text
Background: #123B2A
Text:       #86EFAC
Icon:       #22C55E
```

## Rejected

```text
Background: #3B1515
Text:       #FCA5A5
Icon:       #EF4444
```

---

# 8. Typography

## 8.1 Font Family

A família tipográfica principal deve priorizar uma fonte sans-serif moderna e legível.

### Primary

```text
Inter
```

Fallback:

```text
System
```

No React Native:

```ts
fontFamily: 'Inter'
```

Quando o projeto estiver configurado para utilizar a fonte nativa do sistema:

```ts
fontFamily: 'System'
```

### Font stack conceitual

```text
Inter
↓
System
↓
sans-serif
```

---

# 9. Font Sizes

| Token           |   Size | Uso                    |
| --------------- | -----: | ---------------------- |
| `font-size-xs`  | `12px` | Informações auxiliares |
| `font-size-sm`  | `14px` | Labels                 |
| `font-size-md`  | `16px` | Texto padrão           |
| `font-size-lg`  | `18px` | Texto destacado        |
| `font-size-xl`  | `20px` | Subtítulos             |
| `font-size-2xl` | `24px` | Títulos                |
| `font-size-3xl` | `30px` | Grandes títulos        |
| `font-size-4xl` | `36px` | Hero / Splash          |

---

# 10. Font Weights

| Token                   | Weight | Uso                 |
| ----------------------- | -----: | ------------------- |
| `font-weight-regular`   |  `400` | Texto normal        |
| `font-weight-medium`    |  `500` | Labels              |
| `font-weight-semibold`  |  `600` | Botões e subtítulos |
| `font-weight-bold`      |  `700` | Títulos             |
| `font-weight-extrabold` |  `800` | Números/destaques   |

### Regra

Evitar utilizar `800` ou mais em grandes quantidades.

O peso principal da interface deve ficar entre:

```text
400 → 700
```

---

# 11. Line Heights

| Token                 | Value |
| --------------------- | ----: |
| `line-height-tight`   | `1.2` |
| `line-height-normal`  | `1.5` |
| `line-height-relaxed` | `1.6` |

### Aplicação

Títulos:

```text
line-height-tight
```

Textos:

```text
line-height-normal
```

Descrições maiores:

```text
line-height-relaxed
```

---

# 12. Spacing

Sistema baseado em múltiplos de 4.

| Token        |  Value |
| ------------ | -----: |
| `spacing-1`  |  `4px` |
| `spacing-2`  |  `8px` |
| `spacing-3`  | `12px` |
| `spacing-4`  | `16px` |
| `spacing-5`  | `20px` |
| `spacing-6`  | `24px` |
| `spacing-7`  | `28px` |
| `spacing-8`  | `32px` |
| `spacing-10` | `40px` |
| `spacing-12` | `48px` |
| `spacing-16` | `64px` |
| `spacing-20` | `80px` |

### Regra principal

O espaçamento padrão entre elementos relacionados deve ser:

```text
8px
12px
16px
```

Espaçamentos maiores:

```text
24px
32px
48px
```

devem separar grupos de conteúdo.

---

# 13. Border Radius

| Token         |    Value | Uso                  |
| ------------- | -------: | -------------------- |
| `radius-sm`   |    `6px` | Pequenos elementos   |
| `radius-md`   |   `10px` | Inputs               |
| `radius-lg`   |   `14px` | Cards                |
| `radius-xl`   |   `18px` | Containers grandes   |
| `radius-2xl`  |   `24px` | Elementos destacados |
| `radius-full` | `9999px` | Avatars / pills      |

### Padrão do SwimRank

Cards:

```text
radius-lg = 14px
```

Botões:

```text
radius-md = 10px
```

Avatares:

```text
radius-full
```

---

# 14. Borders

| Token                 | Value |
| --------------------- | ----- |
| `border-width-none`   | `0px` |
| `border-width-thin`   | `1px` |
| `border-width-medium` | `2px` |

## Border colors

| Token            | Hex       |
| ---------------- | --------- |
| `border-subtle`  | `#1E4963` |
| `border-default` | `#285873` |
| `border-focus`   | `#38BDF8` |
| `border-success` | `#22C55E` |
| `border-error`   | `#EF4444` |

### Regra

A maior parte dos componentes deve utilizar:

```text
1px solid #1E4963
```

Não utilizar bordas pesadas em todos os elementos.

---

# 15. Shadows

O SwimRank utiliza sombras discretas devido ao background escuro.

## Small

```text
shadow-sm
```

Uso:

* Buttons
* Small cards

Conceito:

```text
0 2px 6px rgba(0, 0, 0, 0.15)
```

## Medium

```text
shadow-md
```

Uso:

* Cards
* Modais
* Containers elevados

Conceito:

```text
0 4px 12px rgba(0, 0, 0, 0.20)
```

## Large

```text
shadow-lg
```

Uso:

* Modal
* Bottom sheet
* Elementos de grande destaque

Conceito:

```text
0 8px 24px rgba(0, 0, 0, 0.25)
```

---

# 16. Component Dimensions

## Buttons

### Primary Button

```text
Height: 48px
Radius: 10px
Horizontal padding: 16px
Font size: 16px
Font weight: 600
```

### Small Button

```text
Height: 40px
Radius: 10px
Horizontal padding: 12px
Font size: 14px
```

---

# 17. Inputs

```text
Height: 48px
Radius: 10px
Border: 1px
Horizontal padding: 16px
Font size: 16px
```

### Default

```text
Background: #0D2D47
Border: #285873
Text: #F8FAFC
```

### Focus

```text
Background: #103852
Border: #38BDF8
```

### Error

```text
Border: #EF4444
```

---

# 18. Cards

## Default Card

```text
Background: #103852
Border: 1px solid #1E4963
Radius: 14px
Padding: 16px
```

## Highlight Card

Utilizado para:

* Pontuação
* Ranking
* Meta semanal
* Destaques

```text
Background: #0D2D47
Border: 1px solid #285873
Radius: 18px
Padding: 20px
```

---

# 19. Screen Layout

## Horizontal Padding

Todas as telas devem utilizar:

```text
16px
```

como padding horizontal padrão.

Para conteúdo de maior destaque:

```text
24px
```

pode ser utilizado.

### Estrutura

```text
┌─────────────────────────────┐
│          16px               │
│   ┌─────────────────────┐   │
│   │                     │   │
│   │       CONTENT       │   │
│   │                     │   │
│   └─────────────────────┘   │
│          16px               │
└─────────────────────────────┘
```

---

# 20. Header

Header padrão:

```text
Height: 56px
Horizontal padding: 16px
```

Título:

```text
font-size: 20px
font-weight: 700
```

Ícone de usuário:

```text
Size: 40px
Radius: full
```

---

# 21. Icons

Tamanho padrão:

| Token     |   Size | Uso          |
| --------- | -----: | ------------ |
| `icon-xs` | `16px` | Indicadores  |
| `icon-sm` | `20px` | Inputs       |
| `icon-md` | `24px` | Navegação    |
| `icon-lg` | `32px` | Destaques    |
| `icon-xl` | `40px` | Empty states |

### Regra

Ícones devem utilizar a mesma linguagem visual.

Preferência:

```text
SVG
```

com stroke consistente.

Stroke recomendado:

```text
2px
```

---

# 22. Avatar

Avatar padrão:

```text
Width: 40px
Height: 40px
Radius: 9999px
Background: #103852
```

O V1 não utiliza upload de foto.

O avatar deve utilizar um ícone padrão de usuário.

---

# 23. Splash Screen

A Splash Screen deve utilizar:

```text
Background: #071A2B
```

Logo centralizado.

Dimensão aproximada:

```text
Logo: 120–160px
```

Elemento secundário opcional:

```text
color-brand-primary
```

A splash deve ser visualmente simples.

---

# 24. Login / Cadastro

## Layout

```text
Screen
│
├── Logo
│
├── Title
│
├── Description
│
├── Input
│
├── Input
│
├── Primary Button
│
└── Secondary Action
```

### Espaçamento

Logo → título:

```text
24px
```

Título → descrição:

```text
8px
```

Descrição → formulário:

```text
24px
```

Inputs:

```text
12px
```

entre eles.

---

# 25. Home

A Home deve priorizar:

1. Saudação
2. Pontuação
3. Atividade
4. Ranking
5. Status da atividade

### Card de pontos

```text
Background: #103852
Radius: 18px
Padding: 20px
```

Pontuação:

```text
font-size: 30px
font-weight: 800
color: #F8FAFC
```

Label:

```text
font-size: 14px
color: #CBD5E1
```

---

# 26. Activity Registration

O registro de atividade é exclusivamente:

```text
NATAÇÃO
```

Não utilizar seleção de modalidade no V1.

### Campos

* Data
* Distância
* Tempo
* Tipo de nado
* Observação, caso necessária

### CTA

```text
Registrar atividade
```

Primary:

```text
#0EA5E9
```

---

# 27. Ranking

Estrutura:

```text
┌──────────────────────────────┐
│ Ranking                      │
├──────────────────────────────┤
│ 🥇  Nome              120 pts│
│ 🥈  Nome              110 pts│
│ 🥉  Nome               95 pts│
│ 4º  Nome               90 pts│
│ 5º  Nome               82 pts│
└──────────────────────────────┘
```

### Ranking item

```text
Height: 64px
Horizontal padding: 12px
Radius: 12px
```

### Posição

```text
font-size: 16px
font-weight: 700
```

### Nome

```text
font-size: 16px
font-weight: 500
```

### Pontos

```text
font-size: 14px
font-weight: 700
color: #38BDF8
```

---

# 28. Bottom Navigation

Caso seja utilizada navegação inferior:

```text
Height: 64px
Background: #0A2238
Border top: 1px solid #1E4963
```

Ícone ativo:

```text
#38BDF8
```

Ícone inativo:

```text
#94A3B8
```

Label ativo:

```text
#38BDF8
```

Label inativo:

```text
#94A3B8
```

---

# 29. Accessibility

## Contraste

Texto principal deve possuir contraste elevado contra o background.

Evitar:

```text
#64748B
```

para informações importantes.

Utilizar:

```text
#F8FAFC
#CBD5E1
```

para conteúdo principal.

## Touch target

Elementos interativos devem possuir aproximadamente:

```text
44 × 44px
```

ou mais.

Isso inclui:

* Ícones clicáveis
* Botões
* Itens de navegação
* Avatar quando clicável

---

# 30. Responsive / Device Considerations

Os tokens são definidos em `px` conceituais.

No React Native:

```ts
padding: 16
```

em vez de:

```ts
padding: '16px'
```

O layout não deve depender de dimensões fixas de uma única tela.

Evitar:

```ts
width: 390
```

Preferir:

```ts
width: '100%'
```

ou dimensões relativas ao container.

---

# 31. Token Structure for React Native

Sugestão de estrutura:

```text
src/
└── theme/
    ├── colors.ts
    ├── typography.ts
    ├── spacing.ts
    ├── radius.ts
    ├── shadows.ts
    ├── dimensions.ts
    └── index.ts
```

Exemplo conceitual:

```ts
export const colors = {
  brand: {
    primary: '#0EA5E9',
    primaryDark: '#0284C7',
    primaryLight: '#38BDF8',
    secondary: '#06B6D4',
  },

  background: {
    primary: '#071A2B',
    secondary: '#0A2238',
    tertiary: '#0D2D47',
    surface: '#103852',
  },

  text: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    tertiary: '#94A3B8',
    disabled: '#64748B',
  },

  semantic: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#38BDF8',
  },

  ranking: {
    gold: '#FACC15',
    silver: '#CBD5E1',
    bronze: '#D97706',
  },
};
```

---

# 32. Design Token Naming Convention

Utilizar nomes semânticos.

### Preferir

```ts
colors.background.surface
colors.text.primary
colors.brand.primary
colors.semantic.success
```

### Evitar

```ts
colors.blue
colors.darkBlue
colors.lightBlue
colors.white
```

O objetivo é permitir alterar a identidade visual sem precisar procurar por toda a aplicação onde determinada cor foi utilizada.

---

# 33. Design Rules

## DO

* Usar espaçamento baseado em 4px.
* Utilizar `16px` como padding horizontal padrão.
* Utilizar cards com aproximadamente `14–18px` de radius.
* Utilizar azul/ciano como identidade.
* Utilizar branco para informações principais.
* Manter sombras discretas.
* Manter consistência entre telas.
* Usar SVG para ícones quando apropriado.
* Centralizar tokens no theme.

## DON'T

* Não utilizar cores diretamente espalhadas pelos componentes.
* Não criar novos tons de azul sem necessidade.
* Não usar preto puro como background.
* Não misturar vários estilos de borda.
* Não utilizar sombras muito fortes.
* Não criar tamanhos arbitrários de espaçamento.
* Não utilizar `borderRadius` diferentes sem uma justificativa de componente.

---

# 34. Token Priority

Quando houver dúvida durante o desenvolvimento, seguir esta ordem:

```text
1. Design Token existente
        ↓
2. Token semântico relacionado
        ↓
3. Criar novo token somente se necessário
        ↓
4. Nunca hardcodar o valor diretamente no componente
```

Exemplo:

❌

```ts
backgroundColor: '#103852'
```

Preferir:

```ts
backgroundColor: colors.background.surface
```

---

# 35. Source of Truth

Este arquivo deve ser considerado a referência visual principal do SwimRank.

Alterações futuras de:

* Cores
* Tipografia
* Espaçamento
* Radius
* Shadows
* Dimensões

devem ser realizadas primeiro neste documento e posteriormente refletidas nos arquivos de theme do React Native.

A implementação dos componentes deve consumir os tokens, e não definir valores visuais arbitrariamente.
