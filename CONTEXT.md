# MPX Layout Builder — CONTEXT.md

> Atualizado em: 2026-03-02 (sessão 10)

---

## Estado Atual

**Fase**: Auto-layout (Figma-style) implementado. Catálogo com 26 componentes.

O projeto está rodando em `localhost:3002` com:
- Layout 3 painéis: Palette (esq.) + Canvas (centro) + Properties (dir.)
- ✅ Drag-and-drop da palette para o canvas
- ✅ Reordenação de nodes no canvas via drag
- ✅ Palette com preview visual de cada componente (coluna única, cards com área de preview)
- ✅ Artboard mobile 360×800px centralizado no workspace escuro infinito
- ✅ Score panel alinhado ao artboard
- ✅ **25 componentes Andes X** (7 atoms, 10 molecules, 8 organisms)
- Rules engine + score A-F
- Auto-save em localStorage
- Undo/Redo (Ctrl+Z / Ctrl+Shift+Z) + Delete para remover selecionado
- Export JSON + Export PNG

---

## Catálogo Atual (25 componentes)

### Atoms (7)
| Componente | ID | Arquivo |
|-----------|-----|---------|
| Button | `button` | `atoms/AndesButton.tsx` |
| Badge | `badge` | `atoms/AndesBadge.tsx` |
| Typography | `typography` | `atoms/AndesTypography.tsx` |
| Tag | `tag` | `atoms/AndesTag.tsx` |
| Thumbnail | `thumbnail` | `atoms/AndesThumbnail.tsx` |
| Radio Button | `radio-button` | `atoms/AndesRadioButton.tsx` |
| Money Amount | `money-amount` | `atoms/AndesMoneyAmount.tsx` |

### Molecules (10)
| Componente | ID | Arquivo |
|-----------|-----|---------|
| Checkbox | `checkbox` | `molecules/AndesCheckbox.tsx` |
| List Row | `list-row` | `molecules/AndesListRow.tsx` |
| Progress | `progress` | `molecules/AndesProgress.tsx` |
| Pagination | `pagination` | `molecules/AndesPagination.tsx` |
| Dropdown | `dropdown` | `molecules/AndesDropdown.tsx` |
| Amount Field | `amount-field` | `molecules/AndesAmountField.tsx` |
| Switch | `switch` | `molecules/AndesSwitch.tsx` |
| Text Field | `textfield` | `molecules/AndesTextField.tsx` |
| Search Bar | `searchbar` | `molecules/AndesSearchBar.tsx` |
| Accordion | `accordion` | `molecules/AndesAccordion.tsx` |

### Organisms (9)
| Componente | ID | Arquivo |
|-----------|-----|---------|
| Frame | `frame` | `organisms/AndesFrame.tsx` |
| Header | `header` | `organisms/AndesHeader.tsx` |
| Fixed Footer | `fixed-footer` | `organisms/AndesFixedFooter.tsx` |
| Onboarding | `onboarding` | `organisms/AndesOnboarding.tsx` |
| Card | `card` | `organisms/AndesCard.tsx` |
| List | `list` | `organisms/AndesList.tsx` |
| Snackbar | `snackbar` | `organisms/AndesSnackbar.tsx` |
| Tabs | `tabs` | `organisms/AndesTabs.tsx` |
| Bottom Sheet | `bottom-sheet` | `organisms/AndesBottomSheet.tsx` |

---

## O que foi feito (sessão 7 — auto-layout Figma-style)

### Auto-layout no Artboard
- `ArtboardLayout` interface com `direction`, `gap`, `paddingH`, `paddingV`, `alignItems`, `justifyContent`, `wrap`
- Store: `artboardLayout` no estado + `updateArtboardLayout` action com undo/redo
- `Canvas.tsx`: artboard usa valores do store em vez de hardcode; switch H/V usa `horizontalListSortingStrategy`
- `localStorage`: formato atualizado de `CanvasNode[]` para `{ nodes, artboardLayout }` — backward compat com formato antigo

### Componente Frame
- `AndesFrame.tsx`: container dashed com auto-layout próprio (lê props do node)
- Registrado em `registry.tsx`, adicionado em `components-catalog.ts` e `PaletteItem.tsx`

### PropertyPanel
- Quando nada selecionado: exibe painel "Artboard" com controles de layout do artboard
- Quando Frame selecionado: exibe painel de layout com valores do Frame
- `LayoutPanel`: direção H/V, gap, padding H/V, align items (4 opções), justify content (4 opções), wrap

---

## O que foi feito (sessão 6 — expansão do catálogo)

### Componentes adicionados ao registry e catalog
- Adicionados 13 componentes que estavam em disco mas não registados: Tag, Thumbnail, Switch, TextField, SearchBar, Card, List, Snackbar
- Criados 5 novos componentes: RadioButton, MoneyAmount, Accordion, Tabs, BottomSheet
- `registry.tsx` atualizado de 12 → 25 componentes
- `components-catalog.ts` atualizado de 12 → 25 componentes
- `PaletteItem.tsx` PREVIEW_SCALE e isInline atualizados para todos os novos componentes

### Cores / estilo dos componentes novos
- Brand indigo: `#434ce4` (consistente com componentes existentes)
- Componentes inline na palette: atoms + checkbox, progress, pagination
- Componentes full-width na palette: todos os outros (com CSS scale)

---

## O que foi feito (sessão 5 — adição de 6 componentes Andes X)

- Typography, Pagination, AndesHeader (atualizado), Dropdown, Amount Field adicionados
- 12 componentes no total (antes da sessão 6)

---

## O que foi feito (sessão 4 — substituição do catálogo pelo Figma)

### Cores atualizadas (Figma-accurate)
- Brand indigo: `#434ce4` (substituiu `#009ee3` nos componentes Andes)
- Back button bg: `#e9f1ff`
- Checkbox border (unchecked): `#8788ab`

---

## O que foi feito (sessão 8 — multi-seleção + Agrupar em Frame + drop no Frame)

### Multi-seleção
- `selectedIds: string[]` adicionado ao `CanvasState` e ao store
- `toggleSelectNode(id)`: Shift+clique acumula seleção; 1 item restante volta para `selectedId`
- `undo`/`redo`/`clear`/`selectNode` todos limpam `selectedIds` para evitar seleção fantasma

### Agrupar em Frame (Ctrl+G)
- `wrapInFrame()` no store: pega os nodes raiz selecionados, cria um Frame no lugar do primeiro, move os outros como filhos com `parentId`
- Atalho `Ctrl/⌘+G` no `BuilderApp.tsx`
- Suporte a undo/redo (snapshot no history)

### Frame como drop zone
- `AndesFrame.tsx` agora usa `useDroppable` (`into-frame-{id}`)
- Highlight azul (`#434ce4`) quando `isOver`
- `BuilderApp.handleDragEnd`: detecta `over.id` começando com `into-frame-` e faz `addNode(…, parentId)` ou `moveNode(…, parentId)`

### Painel multi-seleção no PropertyPanel
- Quando `selectedIds.length >= 2`: exibe cabeçalho "N selecionados", botão "Agrupar em Frame" + dica "atalho: Ctrl+G", e lista dos componentes selecionados
- Ícone `Frame` (lucide) em roxo `#a78bfa`

### Delete com multi-seleção
- `Delete/Backspace` com `selectedIds` remove todos os nodes selecionados

---

## O que foi feito (sessão 10 — imagens, full-width, renomeação)

### Suporte a imagens reais
- Imagens copiadas para `public/imgs/` (background, image, imagem-onboarding, top)
- `src/data/images.ts` — registry das imagens disponíveis
- `PropType` ganhou `'image'`
- `PropField.tsx` — seletor visual em grid 2×2 com preview + opção "Nenhuma"
- **Thumbnail**: nova prop `src` (image) — renderiza imagem real ou SVG placeholder
- **Onboarding**: nova prop `backgroundImage` (image) — aplica como fundo (fullImage) ou ilustração (centered)

### Componentes full-width no artboard
- `Canvas.tsx` — artboard vertical usa `alignItems: 'stretch'` (antes respeitava o valor do painel, que defaultava em `flex-start`)
- `CanvasNode.tsx` — nó raiz (`depth === 0`) recebe `width: '100%'` explícito
- **Button**: `display: 'flex'` quando `fullWidth: true` (antes era sempre `inline-flex`); default do `fullWidth` virou `true`

### Renomeação para MPX Layout Builder
- `src/app/layout.tsx` — `<title>`
- `src/components/builder/Toolbar.tsx` — nome no header
- `src/store/canvas-store.ts` — storage key (`mpx-layout-builder-canvas`)
- `CLAUDE.md` e `CONTEXT.md` — títulos

---

## O que foi feito (sessão 9 — scoring rules + templates baseados no Figma)

### Novos tipos de regra (`types/rules.ts`)
- `MaxInstancesRule` — máximo N instâncias de um componente no canvas inteiro
- `RootPositionRule` — componente deve ser `first` ou `last` no nível raiz

### Rules engine (`engine/rules-engine.ts`)
- Case `max-instances`: conta instâncias globais e flag excedentes
- Case `root-position`: verifica posição relativa na lista raiz ordenada por `order`

### Novas regras de composição (`data/composition-rules.ts`)
Baseadas em padrões reais Andes X observados no Figma:
- `max-one-header` (error) — máximo 1 Header por tela
- `max-one-fixed-footer` (error) — máximo 1 Fixed Footer por tela
- `max-one-onboarding` (error) — máximo 1 Onboarding por tela
- `max-one-snackbar` (warning) — máximo 1 Snackbar por tela
- `header-must-be-first` (warning) — Header deve ser o primeiro componente raiz
- `fixed-footer-must-be-last` (warning) — Fixed Footer deve ser o último componente raiz
- `header-root-only` agora inclui `card` e `frame` como pais proibidos (era só `onboarding`, `fixed-footer`)
- `fixed-footer-root-only` idem

### Templates de layout (`data/layout-templates.ts`)
- **Corrigido** `buildOnboarding`: substituiu botões soltos por `FixedFooter` double (padrão Andes)
- **Corrigido** `buildLogin`: substituiu button + link por `FixedFooter` double
- **Corrigido** `buildProductDetail`: `FixedFooter` agora é double (Comprar + Adicionar ao carrinho)
- **Corrigido** `buildPaymentConfirmation`: `FixedFooter` agora é double
- **Novo** `buildSetupPix` (Setup Pix — Figma 1:32800): Header + lista de chaves + checkbox badge "Mais prática" + footer double
- **Novo** `buildCreditCardOnboarding` (Figma 1:24064): Header + hero + benefícios com list-rows + checkbox termos + footer double
- **Novo** `buildIntroScreen` (Intro Screens — Figma 1:33276): Onboarding fullImage + progress segmentado + footer double
- **Novo** `buildHubNewbie` (Hub Newbie — Figma 2:18101): Header colorido + progress hero + lista de tarefas pendentes + footer single
- Total: **11 templates** (era 7)

---

## Pendentes / Próximos passos

### Fase 10 — Melhorias do Frame
- [ ] Reordenação de filhos dentro do Frame (SortableContext interno)
- [ ] Drag para slots de Card/List/BottomSheet

### Outros
- [ ] Seletor de tamanho de artboard (360/390/414px)
- [ ] Sistema de "desafios" — layouts pré-definidos para reproduzir
- [ ] Deploy

---

## Riscos / Limitações conhecidas

| Item | Detalhe |
|------|---------|
| Componentes aninhados | Slots não implementados — componentes vão apenas para o nível raiz |
| Export PNG | Captura apenas a área do `canvasRef` — pode cortar se layout for maior que a viewport |
| AndesTag | Usa `colors.brandBlue` antigo em vez de `#434ce4` — funcional mas poderia ser homogeneizado |

---

## Como rodar

```bash
cd "/Users/bsgoncalves/Desktop/Mercado Livre/Claude Meli/lego-layout-builder"
npm run dev
# Abrir http://localhost:3002
# (porta já fixada no package.json: "dev": "next dev -p 3002")
```
