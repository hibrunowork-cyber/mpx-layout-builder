# MPX Layout Builder — CLAUDE.md

## O que é esse projeto

Plataforma de treinamento interno para o time do Mercado Pago.
O usuário arrasta componentes do design system Andes e monta layouts — como Lego.
Objetivo educacional: ensinar composição, hierarquia visual e boas práticas de design.

Não é um page builder de produção. É uma ferramenta de exercício.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 + inline styles (tokens via src/data/tokens.ts) |
| Drag-and-drop | @dnd-kit/core + @dnd-kit/sortable |
| State | Zustand + immer |
| Ícones | lucide-react |
| IDs únicos | nanoid |
| Export | html-to-image |

## Porta

```bash
PORT=3002 npm run dev    # localhost:3002
```

## Arquitetura

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Fontes: Geist + Fraunces
│   ├── page.tsx          # Importa BuilderApp
│   └── globals.css       # Dark theme + tokens CSS
├── components/
│   ├── builder/          # Canvas, CanvasNode, DropZone, Toolbar, BuilderApp
│   ├── palette/          # ComponentPalette, PaletteItem
│   ├── properties/       # PropertyPanel, PropField
│   ├── feedback/         # ScorePanel, RuleViolationCard
│   └── andes/            # Representações visuais dos componentes Andes
│       ├── atoms/        # Button, Badge, Tag, Typography, Thumbnail
│       ├── molecules/    # TextField, Checkbox, Switch, SearchBar
│       ├── organisms/    # Card, Header, Snackbar, List
│       └── registry.tsx  # Mapa componentId → ReactComponent
├── data/
│   ├── components-catalog.ts   # 13 componentes mapeados
│   ├── composition-rules.ts    # 9 regras declarativas
│   └── tokens.ts               # Design tokens Andes + tokens do app
├── engine/
│   ├── rules-engine.ts         # Tree-walker de validação
│   └── score-calculator.ts     # Nota 0-100, grade A-F
├── hooks/
│   ├── useCompositionRules.ts  # Validação reativa (debounce 300ms)
│   └── useScore.ts             # Score derivado das violações
├── store/
│   └── canvas-store.ts         # Zustand: nodes, seleção, histórico, localStorage
└── types/
    ├── canvas.ts               # CanvasNode, CanvasState
    ├── catalog.ts              # ComponentDefinition, PropDefinition
    └── rules.ts                # CompositionRule, RuleViolation
```

## Visual

- Paleta dark: `#0F0F0D` bg, `#171715` surface, `#2A2A27` border, `#E8E8E5` texto, `#FEE340` accent
- Fontes: Geist Sans (corpo) + Fraunces italic (títulos)
- Baseado visualmente no Claude Install Guide (mesma paleta Hub/Claude Meli)
- Tokens em `src/data/tokens.ts` — tanto tokens Andes quanto do app builder

## Componentes Andes mapeados

| Categoria | Componente | ID |
|-----------|-----------|-----|
| Atoms | Button | `button` |
| Atoms | Typography | `typography` |
| Atoms | Badge | `badge` |
| Atoms | Tag | `tag` |
| Atoms | Thumbnail | `thumbnail` |
| Molecules | TextField | `textfield` |
| Molecules | Checkbox | `checkbox` |
| Molecules | Switch | `switch` |
| Molecules | SearchBar | `searchbar` |
| Organisms | Card* | `card` |
| Organisms | List* | `list` |
| Organisms | Header | `header` |
| Organisms | Snackbar | `snackbar` |

*Aceita filhos (slots)

## Regras de composição implementadas

- `no-button-in-button` — Button não pode ser filho de Button
- `card-requires-content` — Card vazio gera warning
- `card-max-actions` — Card: máx. 2 ações
- `list-requires-items` — List precisa de itens
- `list-max-items` — List: máx. 10 itens
- `header-not-in-card` — Header só no nível raiz
- `snackbar-root-only` — Snackbar só no nível raiz
- `max-depth-4` — Hierarquia máx. 4 níveis
- `header-max-actions` — Header: máx. 2 ações

## Atalhos de teclado

- `Ctrl/⌘+Z` — Undo
- `Ctrl/⌘+Shift+Z` / `Ctrl/⌘+Y` — Redo
- `Escape` — Deselecionar
- `Delete/Backspace` — Remover componente selecionado

## Persistência

- Auto-save em `localStorage` a cada mudança no canvas
- Chave: `lego-layout-builder-canvas`

## Figma

- Design system de referência: Andes X (Mercado Pago / Mercado Livre)
- File: `ksPpKcDXCSni1iK9azu7GX`
