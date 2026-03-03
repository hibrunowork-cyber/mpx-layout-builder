import { ComponentDefinition } from '@/types/catalog';

export const COMPONENTS_CATALOG: ComponentDefinition[] = [
  // ─── ATOMS ───────────────────────────────────────────────────────────────────

  {
    id: 'button',
    name: 'Button',
    category: 'atoms',
    description: 'Botão de ação principal ou secundário',
    icon: 'MousePointerClick',
    tags: ['action', 'cta', 'interactive', 'button'],
    props: [
      { name: 'label',     label: 'Texto',        type: 'string',  default: 'Continuar' },
      { name: 'disabled',  label: 'Desabilitado', type: 'boolean', default: false },
      { name: 'fullWidth', label: 'Largura total', type: 'boolean', default: true },
    ],
    variants: [
      {
        name: 'hierarchy',
        label: 'Hierarquia',
        options: [
          { value: 'loud',        label: 'Loud (primário)' },
          { value: 'quiet',       label: 'Quiet (secundário)' },
          { value: 'transparent', label: 'Transparent' },
        ],
        default: 'loud',
      },
      {
        name: 'size',
        label: 'Tamanho',
        options: [
          { value: 'large',  label: 'Large (48px)' },
          { value: 'medium', label: 'Medium (40px)' },
          { value: 'small',  label: 'Small (32px)' },
        ],
        default: 'large',
      },
    ],
    slots: [],
  },

  {
    id: 'badge',
    name: 'Badge',
    category: 'atoms',
    description: 'Etiqueta de status, categoria ou destaque',
    icon: 'Tag',
    tags: ['status', 'label', 'indicator', 'pill', 'tag'],
    props: [
      { name: 'label', label: 'Texto', type: 'string', default: 'Novo' },
    ],
    variants: [
      {
        name: 'color',
        label: 'Cor',
        options: [
          { value: 'accent',   label: 'Accent (amarelo)' },
          { value: 'loud',     label: 'Loud (azul)' },
          { value: 'quiet',    label: 'Quiet (azul claro)' },
          { value: 'neutral',  label: 'Neutral (cinza)' },
          { value: 'positive', label: 'Positive (verde)' },
          { value: 'negative', label: 'Negative (vermelho)' },
        ],
        default: 'quiet',
      },
    ],
    slots: [],
  },

  {
    id: 'typography',
    name: 'Typography',
    category: 'atoms',
    description: 'Bloco de texto com hierarquia tipográfica Andes X',
    icon: 'Type',
    tags: ['text', 'heading', 'body', 'caption', 'title', 'label'],
    props: [
      { name: 'text', label: 'Conteúdo', type: 'string', default: 'Texto de exemplo' },
    ],
    variants: [
      {
        name: 'type',
        label: 'Estilo',
        options: [
          { value: 'title-1',       label: 'Title 1 — 32px bold' },
          { value: 'title-2',       label: 'Title 2 — 24px bold' },
          { value: 'title-3',       label: 'Title 3 — 20px semibold' },
          { value: 'body',          label: 'Body — 16px regular' },
          { value: 'body-semibold', label: 'Body Semibold — 16px 600' },
          { value: 'small',         label: 'Small — 14px' },
          { value: 'caption',       label: 'Caption — 12px' },
        ],
        default: 'body',
      },
      {
        name: 'color',
        label: 'Cor',
        options: [
          { value: 'primary',   label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'link',      label: 'Link (azul)' },
          { value: 'positive',  label: 'Positive (verde)' },
          { value: 'negative',  label: 'Negative (vermelho)' },
          { value: 'disabled',  label: 'Disabled (cinza)' },
        ],
        default: 'primary',
      },
    ],
    slots: [],
  },

  {
    id: 'tag',
    name: 'Tag',
    category: 'atoms',
    description: 'Etiqueta categórica ou de filtro em pill ou box',
    icon: 'Tags',
    tags: ['tag', 'filter', 'category', 'chip', 'label'],
    props: [
      { name: 'label', label: 'Texto', type: 'string', default: 'Tag' },
    ],
    variants: [
      {
        name: 'type',
        label: 'Tipo',
        options: [
          { value: 'general', label: 'General (cinza)' },
          { value: 'success', label: 'Success (verde)' },
          { value: 'warning', label: 'Warning (amarelo)' },
          { value: 'error',   label: 'Error (vermelho)' },
        ],
        default: 'general',
      },
      {
        name: 'size',
        label: 'Tamanho',
        options: [
          { value: 'default', label: 'Default (24px)' },
          { value: 'small',   label: 'Small (20px)' },
        ],
        default: 'default',
      },
    ],
    slots: [],
  },

  {
    id: 'thumbnail',
    name: 'Thumbnail',
    category: 'atoms',
    description: 'Imagem ou placeholder de mídia com formas e tamanhos variados',
    icon: 'Image',
    tags: ['image', 'thumbnail', 'photo', 'avatar', 'media'],
    props: [
      { name: 'alt', label: 'Alt text', type: 'string',  default: 'Imagem' },
      { name: 'src', label: 'Imagem',   type: 'image',   default: '' },
    ],
    variants: [
      {
        name: 'size',
        label: 'Tamanho',
        options: [
          { value: 'xs', label: 'XS (32px)' },
          { value: 'sm', label: 'SM (48px)' },
          { value: 'md', label: 'MD (64px)' },
          { value: 'lg', label: 'LG (96px)' },
          { value: 'xl', label: 'XL (128px)' },
        ],
        default: 'md',
      },
      {
        name: 'shape',
        label: 'Forma',
        options: [
          { value: 'rounded', label: 'Rounded' },
          { value: 'square',  label: 'Square' },
          { value: 'circle',  label: 'Circle' },
        ],
        default: 'rounded',
      },
    ],
    slots: [],
  },

  {
    id: 'radio-button',
    name: 'Radio Button',
    category: 'atoms',
    description: 'Seleção única em grupo de opções',
    icon: 'Circle',
    tags: ['radio', 'input', 'form', 'selection', 'option'],
    props: [
      { name: 'label',    label: 'Label',        type: 'string',  default: 'Opção' },
      { name: 'disabled', label: 'Desabilitado', type: 'boolean', default: false },
    ],
    variants: [
      {
        name: 'state',
        label: 'Estado',
        options: [
          { value: 'unchecked', label: 'Unchecked' },
          { value: 'checked',   label: 'Checked' },
        ],
        default: 'unchecked',
      },
      {
        name: 'size',
        label: 'Tamanho',
        options: [
          { value: 'default', label: 'Default (22px)' },
          { value: 'small',   label: 'Small (18px)' },
        ],
        default: 'default',
      },
    ],
    slots: [],
  },

  {
    id: 'money-amount',
    name: 'Money Amount',
    category: 'atoms',
    description: 'Exibição de valor monetário com símbolo, inteiro e centavos',
    icon: 'DollarSign',
    tags: ['money', 'price', 'currency', 'amount', 'value'],
    props: [
      { name: 'currency',    label: 'Moeda',      type: 'string', default: '$' },
      { name: 'amount',      label: 'Valor',       type: 'string', default: '1.299' },
      { name: 'cents',       label: 'Centavos',   type: 'string', default: '99' },
      { name: 'discountPct', label: 'Desconto %', type: 'string', default: '' },
    ],
    variants: [
      {
        name: 'size',
        label: 'Tamanho',
        options: [
          { value: 'large',       label: 'Large (40px)' },
          { value: 'medium',      label: 'Medium (28px)' },
          { value: 'small',       label: 'Small (20px)' },
          { value: 'extra-small', label: 'Extra Small (16px)' },
        ],
        default: 'large',
      },
      {
        name: 'color',
        label: 'Cor',
        options: [
          { value: 'primary',  label: 'Primary' },
          { value: 'positive', label: 'Positive (verde)' },
          { value: 'negative', label: 'Negative (vermelho)' },
          { value: 'disabled', label: 'Disabled' },
        ],
        default: 'primary',
      },
    ],
    slots: [],
  },

  // ─── MOLECULES ────────────────────────────────────────────────────────────────

  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'molecules',
    description: 'Seleção binária com label — termos, opções, filtros',
    icon: 'CheckSquare',
    tags: ['input', 'form', 'selection', 'check', 'terms'],
    props: [
      { name: 'label',    label: 'Label',        type: 'string',  default: 'Aceitar termos e condições' },
      { name: 'disabled', label: 'Desabilitado', type: 'boolean', default: false },
    ],
    variants: [
      {
        name: 'state',
        label: 'Estado',
        options: [
          { value: 'unchecked',     label: 'Unchecked' },
          { value: 'checked',       label: 'Checked' },
          { value: 'indeterminate', label: 'Indeterminate' },
        ],
        default: 'unchecked',
      },
    ],
    slots: [],
  },

  {
    id: 'list-row',
    name: 'List Row',
    category: 'molecules',
    description: 'Linha de lista com thumbnail, título, descrição e chevron',
    icon: 'Rows3',
    tags: ['list', 'row', 'item', 'cell', 'navigation'],
    props: [
      { name: 'title',         label: 'Título',           type: 'string',  default: 'Título do item' },
      { name: 'description',   label: 'Descrição',        type: 'string',  default: 'Descrição secundária' },
      { name: 'badgeLabel',    label: 'Badge (opcional)', type: 'string',  default: '' },
      { name: 'showThumbnail', label: 'Thumbnail',        type: 'boolean', default: true },
      { name: 'showChevron',   label: 'Chevron',          type: 'boolean', default: true },
    ],
    variants: [],
    slots: [],
  },

  {
    id: 'progress',
    name: 'Progress',
    category: 'molecules',
    description: 'Indicador de progresso em etapas — onboarding, stepper',
    icon: 'CircleDot',
    tags: ['progress', 'steps', 'onboarding', 'stepper', 'dots'],
    props: [
      { name: 'total',   label: 'Total de etapas', type: 'number', default: 4 },
      { name: 'current', label: 'Etapa atual',     type: 'number', default: 1 },
    ],
    variants: [
      {
        name: 'type',
        label: 'Tipo',
        options: [
          { value: 'dots',      label: 'Dots' },
          { value: 'segmented', label: 'Segmented bar' },
        ],
        default: 'dots',
      },
    ],
    slots: [],
  },

  {
    id: 'pagination',
    name: 'Pagination',
    category: 'molecules',
    description: 'Navegação entre páginas — Página X de Y com botões anterior/próximo',
    icon: 'ChevronLeftRight',
    tags: ['pagination', 'pages', 'navigation', 'next', 'previous'],
    props: [
      { name: 'currentPage', label: 'Página atual',      type: 'number', default: 2 },
      { name: 'totalPages',  label: 'Total de páginas',  type: 'number', default: 20 },
    ],
    variants: [
      {
        name: 'size',
        label: 'Tamanho',
        options: [
          { value: 'large', label: 'Large' },
          { value: 'small', label: 'Small' },
        ],
        default: 'large',
      },
    ],
    slots: [],
  },

  {
    id: 'dropdown',
    name: 'Dropdown',
    category: 'molecules',
    description: 'Campo de seleção com opções — formulários e filtros',
    icon: 'ChevronDown',
    tags: ['select', 'dropdown', 'form', 'input', 'options'],
    props: [
      { name: 'label',       label: 'Label',        type: 'string',  default: 'Selecione uma opção' },
      { name: 'placeholder', label: 'Placeholder',  type: 'string',  default: 'Selecionar' },
      { name: 'value',       label: 'Valor',        type: 'string',  default: '' },
      { name: 'errorText',   label: 'Erro',         type: 'string',  default: '' },
      { name: 'disabled',    label: 'Desabilitado', type: 'boolean', default: false },
    ],
    variants: [
      {
        name: 'state',
        label: 'Estado',
        options: [
          { value: 'default',  label: 'Default' },
          { value: 'active',   label: 'Active (focus)' },
          { value: 'error',    label: 'Error' },
          { value: 'disabled', label: 'Disabled' },
        ],
        default: 'default',
      },
    ],
    slots: [],
  },

  {
    id: 'amount-field',
    name: 'Amount Field',
    category: 'molecules',
    description: 'Campo de entrada de valor monetário',
    icon: 'BadgeDollarSign',
    tags: ['money', 'amount', 'currency', 'price', 'input', 'field'],
    props: [
      { name: 'label',    label: 'Label',    type: 'string', default: 'Valor' },
      { name: 'currency', label: 'Moeda',    type: 'string', default: '$' },
      { name: 'value',    label: 'Valor',    type: 'string', default: '' },
      { name: 'helper',   label: 'Auxiliar', type: 'string', default: '' },
    ],
    variants: [
      {
        name: 'size',
        label: 'Tamanho',
        options: [
          { value: 'large',       label: 'Large (40px)' },
          { value: 'medium',      label: 'Medium (28px)' },
          { value: 'small',       label: 'Small (20px)' },
          { value: 'extra-small', label: 'Extra Small (16px)' },
        ],
        default: 'large',
      },
      {
        name: 'state',
        label: 'Estado',
        options: [
          { value: 'placeholder', label: 'Placeholder' },
          { value: 'active',      label: 'Active (focus)' },
          { value: 'filled',      label: 'Filled' },
          { value: 'error',       label: 'Error' },
        ],
        default: 'placeholder',
      },
    ],
    slots: [],
  },

  {
    id: 'switch',
    name: 'Switch',
    category: 'molecules',
    description: 'Toggle on/off com label — configurações, preferências',
    icon: 'ToggleRight',
    tags: ['toggle', 'switch', 'boolean', 'on-off', 'settings'],
    props: [
      { name: 'label',    label: 'Label',        type: 'string',  default: 'Ativar notificações' },
      { name: 'checked',  label: 'Ligado',       type: 'boolean', default: false },
      { name: 'disabled', label: 'Desabilitado', type: 'boolean', default: false },
    ],
    variants: [],
    slots: [],
  },

  {
    id: 'textfield',
    name: 'Text Field',
    category: 'molecules',
    description: 'Campo de texto com label, placeholder e mensagem auxiliar',
    icon: 'TextCursorInput',
    tags: ['input', 'text', 'field', 'form', 'textfield'],
    props: [
      { name: 'label',       label: 'Label',       type: 'string', default: 'Nome completo' },
      { name: 'placeholder', label: 'Placeholder', type: 'string', default: 'Digite seu nome' },
      { name: 'helperText',  label: 'Auxiliar',    type: 'string', default: '' },
      { name: 'errorText',   label: 'Erro',        type: 'string', default: '' },
    ],
    variants: [
      {
        name: 'state',
        label: 'Estado',
        options: [
          { value: 'default',  label: 'Default' },
          { value: 'focus',    label: 'Focus' },
          { value: 'error',    label: 'Error' },
          { value: 'disabled', label: 'Disabled' },
        ],
        default: 'default',
      },
    ],
    slots: [],
  },

  {
    id: 'searchbar',
    name: 'Search Bar',
    category: 'molecules',
    description: 'Campo de busca com ícone de lupa',
    icon: 'Search',
    tags: ['search', 'busca', 'input', 'find', 'filter'],
    props: [
      { name: 'placeholder', label: 'Placeholder', type: 'string',  default: 'Buscar...' },
      { name: 'disabled',    label: 'Desabilitado', type: 'boolean', default: false },
    ],
    variants: [
      {
        name: 'size',
        label: 'Tamanho',
        options: [
          { value: 'default', label: 'Default (48px)' },
          { value: 'compact', label: 'Compact (36px)' },
        ],
        default: 'default',
      },
    ],
    slots: [],
  },

  {
    id: 'accordion',
    name: 'Accordion',
    category: 'molecules',
    description: 'Seção expansível com título e conteúdo retrátil',
    icon: 'ChevronDown',
    tags: ['accordion', 'expand', 'collapse', 'faq', 'section'],
    props: [
      { name: 'title',    label: 'Título',   type: 'string',  default: 'Título do accordion' },
      { name: 'expanded', label: 'Expandido', type: 'boolean', default: false },
    ],
    variants: [
      {
        name: 'size',
        label: 'Tamanho',
        options: [
          { value: 'large',  label: 'Large' },
          { value: 'medium', label: 'Medium' },
          { value: 'small',  label: 'Small' },
        ],
        default: 'medium',
      },
    ],
    slots: [],
  },

  // ─── ORGANISMS ────────────────────────────────────────────────────────────────

  {
    id: 'frame',
    name: 'Frame',
    category: 'organisms',
    description: 'Container com auto-layout — agrupa componentes em linha ou coluna',
    icon: 'Frame',
    tags: ['frame', 'container', 'layout', 'flex', 'group'],
    props: [
      { name: 'direction',      label: 'Direção',       type: 'string',  default: 'vertical' },
      { name: 'gap',            label: 'Gap',           type: 'number',  default: 12 },
      { name: 'paddingH',       label: 'Padding H',     type: 'number',  default: 16 },
      { name: 'paddingV',       label: 'Padding V',     type: 'number',  default: 16 },
      { name: 'alignItems',     label: 'Align items',   type: 'string',  default: 'flex-start' },
      { name: 'justifyContent', label: 'Justify',       type: 'string',  default: 'flex-start' },
      { name: 'wrap',           label: 'Wrap',          type: 'boolean', default: false },
    ],
    variants: [],
    slots: [],
  },

  {
    id: 'header',
    name: 'Header',
    category: 'organisms',
    description: 'Cabeçalho de navegação com botão voltar e título',
    icon: 'PanelTop',
    tags: ['header', 'navigation', 'back', 'top', 'navbar'],
    props: [
      { name: 'title',    label: 'Título',       type: 'string',  default: 'Minha Conta' },
      { name: 'subtitle', label: 'Subtítulo',    type: 'string',  default: '' },
      { name: 'showBack', label: 'Botão voltar', type: 'boolean', default: true },
    ],
    variants: [
      {
        name: 'type',
        label: 'Estilo',
        options: [
          { value: 'default',     label: 'Default (branco)' },
          { value: 'transparent', label: 'Transparent' },
          { value: 'colored',     label: 'Colored (azul)' },
        ],
        default: 'default',
      },
      {
        name: 'variant',
        label: 'Variante',
        options: [
          { value: 'standard', label: 'Standard (56px)' },
          { value: 'extended', label: 'Extended (com subtítulo)' },
          { value: 'flow',     label: 'Flow (descrição de tarefa)' },
        ],
        default: 'standard',
      },
    ],
    slots: [],
  },

  {
    id: 'fixed-footer',
    name: 'Fixed Footer',
    category: 'organisms',
    description: 'Rodapé fixo com botão(ões) de ação principal',
    icon: 'PanelBottom',
    tags: ['footer', 'action', 'bottom', 'cta', 'fixed'],
    props: [
      { name: 'primaryLabel',   label: 'Botão primário',   type: 'string', default: 'Continuar' },
      { name: 'secondaryLabel', label: 'Botão secundário', type: 'string', default: '' },
    ],
    variants: [
      {
        name: 'layout',
        label: 'Layout',
        options: [
          { value: 'single', label: 'Um botão' },
          { value: 'double', label: 'Dois botões' },
        ],
        default: 'single',
      },
    ],
    slots: [],
  },

  {
    id: 'onboarding',
    name: 'Onboarding',
    category: 'organisms',
    description: 'Tela de introdução com ilustração, título e descrição',
    icon: 'Sparkles',
    tags: ['onboarding', 'intro', 'welcome', 'screen', 'layout'],
    props: [
      { name: 'title',           label: 'Título',          type: 'string', default: 'Bem-vindo ao Mercado Pago' },
      { name: 'description',     label: 'Descrição',       type: 'string', default: 'Gerencie seu dinheiro com mais facilidade e segurança.' },
      { name: 'backgroundImage', label: 'Imagem de fundo', type: 'image',  default: '' },
    ],
    variants: [
      {
        name: 'type',
        label: 'Estilo',
        options: [
          { value: 'centered',  label: 'Centered (ilustração + texto)' },
          { value: 'fullImage', label: 'Full Image (imagem + card)' },
        ],
        default: 'centered',
      },
    ],
    slots: [],
  },

  {
    id: 'card',
    name: 'Card',
    category: 'organisms',
    description: 'Contêiner com borda e sombra — agrupa conteúdo relacionado',
    icon: 'Square',
    tags: ['card', 'container', 'panel', 'box', 'group'],
    props: [
      { name: 'title',   label: 'Título',    type: 'string',  default: '' },
      { name: 'padding', label: 'Padding',   type: 'boolean', default: true },
    ],
    variants: [
      {
        name: 'shadow',
        label: 'Sombra',
        options: [
          { value: 'none',     label: 'Sem sombra' },
          { value: 'flat',     label: 'Flat' },
          { value: 'elevated', label: 'Elevated' },
        ],
        default: 'flat',
      },
    ],
    slots: [],
  },

  {
    id: 'list',
    name: 'List',
    category: 'organisms',
    description: 'Contêiner de lista — agrupa List Rows com divisores',
    icon: 'List',
    tags: ['list', 'group', 'container', 'rows', 'items'],
    props: [
      { name: 'showDivider', label: 'Divisores', type: 'boolean', default: true },
    ],
    variants: [
      {
        name: 'size',
        label: 'Espaçamento',
        options: [
          { value: 'compact', label: 'Compact' },
          { value: 'default', label: 'Default' },
          { value: 'large',   label: 'Large' },
        ],
        default: 'default',
      },
    ],
    slots: [],
  },

  {
    id: 'snackbar',
    name: 'Snackbar',
    category: 'organisms',
    description: 'Notificação temporária com mensagem e ação opcional',
    icon: 'BellDot',
    tags: ['notification', 'toast', 'snackbar', 'alert', 'message'],
    props: [
      { name: 'message',     label: 'Mensagem', type: 'string', default: 'Operação realizada com sucesso' },
      { name: 'actionLabel', label: 'Ação',     type: 'string', default: '' },
    ],
    variants: [
      {
        name: 'type',
        label: 'Tipo',
        options: [
          { value: 'default', label: 'Default (escuro)' },
          { value: 'success', label: 'Success (verde)' },
          { value: 'error',   label: 'Error (vermelho)' },
          { value: 'warning', label: 'Warning (âmbar)' },
        ],
        default: 'default',
      },
    ],
    slots: [],
  },

  {
    id: 'tabs',
    name: 'Tabs',
    category: 'organisms',
    description: 'Navegação por abas com indicador ativo',
    icon: 'LayoutDashboard',
    tags: ['tabs', 'navigation', 'segments', 'tab-bar'],
    props: [
      { name: 'tab1',      label: 'Tab 1',     type: 'string', default: 'Início' },
      { name: 'tab2',      label: 'Tab 2',     type: 'string', default: 'Pagamentos' },
      { name: 'tab3',      label: 'Tab 3',     type: 'string', default: '' },
      { name: 'tab4',      label: 'Tab 4',     type: 'string', default: '' },
      { name: 'activeTab', label: 'Aba ativa', type: 'number', default: 0 },
    ],
    variants: [
      {
        name: 'variant',
        label: 'Variante',
        options: [
          { value: 'proportional', label: 'Proportional (igual largura)' },
          { value: 'variable',     label: 'Variable (largura pelo conteúdo)' },
        ],
        default: 'proportional',
      },
    ],
    slots: [],
  },

  {
    id: 'bottom-sheet',
    name: 'Bottom Sheet',
    category: 'organisms',
    description: 'Painel deslizante inferior com título e conteúdo',
    icon: 'PanelBottomOpen',
    tags: ['bottom-sheet', 'sheet', 'drawer', 'modal', 'overlay'],
    props: [
      { name: 'title',          label: 'Título',            type: 'string',  default: 'Título' },
      { name: 'showClose',      label: 'Botão fechar',      type: 'boolean', default: true },
      { name: 'primaryLabel',   label: 'Botão primário',   type: 'string',  default: 'Confirmar' },
      { name: 'secondaryLabel', label: 'Botão secundário', type: 'string',  default: '' },
    ],
    variants: [],
    slots: [],
  },
];

// Helper para buscar por id
export const getComponent = (id: string): ComponentDefinition | undefined =>
  COMPONENTS_CATALOG.find((c) => c.id === id);

// Helper para buscar por categoria
export const getByCategory = (category: ComponentDefinition['category']): ComponentDefinition[] =>
  COMPONENTS_CATALOG.filter((c) => c.category === category);
