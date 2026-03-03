import { nanoid } from 'nanoid';
import { CanvasNode } from '@/types/canvas';

export interface LayoutTemplate {
  id: string;
  name: string;
  emoji: string;
  description: string;
  buildNodes: () => CanvasNode[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function node(
  componentId: string,
  props: Record<string, unknown>,
  variant: Record<string, string>,
  order: number,
  parentId: string | null = null,
  children: CanvasNode[] = []
): CanvasNode {
  return { id: nanoid(8), componentId, props, variant, children, parentId, order };
}

function frame(
  props: { direction?: string; gap?: number; paddingH?: number; paddingV?: number; alignItems?: string; justifyContent?: string; wrap?: boolean },
  order: number,
  parentId: string | null,
  buildChildren: (parentId: string) => CanvasNode[]
): CanvasNode {
  const id = nanoid(8);
  return {
    id,
    componentId: 'frame',
    props: {
      direction: props.direction ?? 'vertical',
      gap: props.gap ?? 12,
      paddingH: props.paddingH ?? 16,
      paddingV: props.paddingV ?? 16,
      alignItems: props.alignItems ?? 'flex-start',
      justifyContent: props.justifyContent ?? 'flex-start',
      wrap: props.wrap ?? false,
    },
    variant: {},
    children: buildChildren(id),
    parentId,
    order,
  };
}

// ─── Templates ────────────────────────────────────────────────────────────────

/**
 * 1. Detalhe de produto
 * Header + thumb + preço + badge + descrição + rodapé CTA
 */
function buildProductDetail(): CanvasNode[] {
  return [
    node('header', { title: 'Produto', subtitle: '', showBack: true }, { type: 'default', variant: 'standard' }, 0),
    node('thumbnail', { alt: 'Foto do produto' }, { size: 'xl', shape: 'square' }, 1),
    frame(
      { direction: 'vertical', gap: 4, paddingH: 0, paddingV: 0 },
      2, null,
      (pid) => [
        node('money-amount', { currency: 'R$', amount: '1.299', cents: '99', discountPct: '10' }, { size: 'large', color: 'primary' }, 0, pid),
        node('typography', { text: 'em 12x de R$ 108,25 sem juros' }, { type: 'small', color: 'secondary' }, 1, pid),
        node('badge', { label: 'Frete grátis' }, { color: 'positive' }, 2, pid),
      ]
    ),
    node('typography', { text: 'Tênis com tecnologia de amortecimento avançada, ideal para corridas de longa distância e treinos intensos.' }, { type: 'body', color: 'secondary' }, 3),
    node('accordion', { title: 'Especificações técnicas', expanded: false }, { size: 'medium' }, 4),
    node('fixed-footer', { primaryLabel: 'Comprar agora', secondaryLabel: 'Adicionar ao carrinho' }, { layout: 'double' }, 5),
  ];
}

/**
 * 2. Checkout / Confirmar pagamento
 * Header + resumo de valor + campo CVV + checkbox + rodapé duplo
 */
function buildCheckout(): CanvasNode[] {
  return [
    node('header', { title: 'Confirmar pagamento', subtitle: '', showBack: true }, { type: 'default', variant: 'standard' }, 0),
    frame(
      { direction: 'vertical', gap: 8, paddingH: 16, paddingV: 16 },
      1, null,
      (pid) => [
        node('typography', { text: 'Total a pagar' }, { type: 'small', color: 'secondary' }, 0, pid),
        node('money-amount', { currency: 'R$', amount: '1.299', cents: '99', discountPct: '' }, { size: 'large', color: 'primary' }, 1, pid),
        node('badge', { label: 'Pix com 10% de desconto' }, { color: 'positive' }, 2, pid),
      ]
    ),
    node('textfield', { label: 'Código de segurança (CVV)', placeholder: '•••', helperText: '3 dígitos no verso do cartão', errorText: '' }, { state: 'default' }, 2),
    node('checkbox', { label: 'Lembrar este cartão para compras futuras', disabled: false }, { state: 'unchecked' }, 3),
    node('fixed-footer', { primaryLabel: 'Confirmar pagamento', secondaryLabel: 'Cancelar' }, { layout: 'double' }, 4),
  ];
}

/**
 * 3. Login / Autenticação
 * Header + campos + botão + link esqueceu senha
 */
function buildLogin(): CanvasNode[] {
  return [
    node('header', { title: 'Entrar', subtitle: '', showBack: true }, { type: 'default', variant: 'standard' }, 0),
    node('typography', { text: 'Bem-vindo de volta' }, { type: 'title-3', color: 'primary' }, 1),
    node('typography', { text: 'Acesse sua conta para continuar' }, { type: 'body', color: 'secondary' }, 2),
    node('textfield', { label: 'E-mail ou CPF', placeholder: 'Digite seu e-mail', helperText: '', errorText: '' }, { state: 'default' }, 3),
    node('textfield', { label: 'Senha', placeholder: '••••••••', helperText: '', errorText: '' }, { state: 'default' }, 4),
    node('typography', { text: 'Esqueceu sua senha?' }, { type: 'small', color: 'link' }, 5),
    node('fixed-footer', { primaryLabel: 'Entrar', secondaryLabel: 'Criar conta grátis' }, { layout: 'double' }, 6),
  ];
}

/**
 * 4. Busca de produtos
 * Header + search + tabs + lista
 */
function buildSearch(): CanvasNode[] {
  return [
    node('header', { title: 'Buscar', subtitle: '', showBack: false }, { type: 'default', variant: 'standard' }, 0),
    node('searchbar', { placeholder: 'Buscar produtos, marcas e lojas...', disabled: false }, { size: 'default' }, 1),
    node('tabs', { tab1: 'Todos', tab2: 'Mais vendidos', tab3: 'Promoções', tab4: '', activeTab: 0 }, { variant: 'proportional' }, 2),
    node('list', { showDivider: true }, { size: 'default' }, 3),
    node('list-row', { title: 'Tênis Running Pro', description: 'R$ 1.299,99 · Frete grátis', badgeLabel: '', showThumbnail: true, showChevron: true }, {}, 4),
    node('list-row', { title: 'Mochila Urban 30L', description: 'R$ 249,90 · Em 10x', badgeLabel: '', showThumbnail: true, showChevron: true }, {}, 5),
    node('list-row', { title: 'Fone Bluetooth', description: 'R$ 189,90 · Entrega hoje', badgeLabel: '', showThumbnail: true, showChevron: true }, {}, 6),
  ];
}

/**
 * 5. Onboarding — tela de boas-vindas com CTA duplo
 * Padrão Andes X: Onboarding centralizado + FixedFooter double
 */
function buildOnboarding(): CanvasNode[] {
  return [
    node('onboarding',
      { title: 'Seu dinheiro rendendo mais', description: 'Deixe seu saldo render automaticamente todo dia. Mais do que a poupança, com liquidez imediata.' },
      { type: 'centered' },
      0
    ),
    node('fixed-footer', { primaryLabel: 'Começar agora', secondaryLabel: 'Já tenho uma conta' }, { layout: 'double' }, 1),
  ];
}

/**
 * 6. Perfil / Minha conta
 * Header + card de usuário + lista de opções + switch
 */
function buildProfile(): CanvasNode[] {
  return [
    node('header', { title: 'Minha conta', subtitle: '', showBack: false }, { type: 'default', variant: 'standard' }, 0),
    frame(
      { direction: 'horizontal', gap: 16, paddingH: 16, paddingV: 16, alignItems: 'center' },
      1, null,
      (pid) => [
        node('thumbnail', { alt: 'Foto de perfil' }, { size: 'lg', shape: 'circle' }, 0, pid),
        frame(
          { direction: 'vertical', gap: 4, paddingH: 0, paddingV: 0 },
          1, pid,
          (pid2) => [
            node('typography', { text: 'João Silva' }, { type: 'title-3', color: 'primary' }, 0, pid2),
            node('typography', { text: 'joao.silva@email.com' }, { type: 'small', color: 'secondary' }, 1, pid2),
            node('badge', { label: 'Conta verificada' }, { color: 'positive' }, 2, pid2),
          ]
        ),
      ]
    ),
    node('list', { showDivider: true }, { size: 'default' }, 2),
    node('list-row', { title: 'Dados pessoais', description: '', badgeLabel: '', showThumbnail: false, showChevron: true }, {}, 3),
    node('list-row', { title: 'Segurança', description: '', badgeLabel: '', showThumbnail: false, showChevron: true }, {}, 4),
    node('list-row', { title: 'Métodos de pagamento', description: '', badgeLabel: '', showThumbnail: false, showChevron: true }, {}, 5),
    node('switch', { label: 'Notificações push', checked: true, disabled: false }, {}, 6),
  ];
}

/**
 * 7. Confirmação de transação
 * Header + snackbar + resumo + botão de compartilhar
 */
function buildPaymentConfirmation(): CanvasNode[] {
  return [
    node('header', { title: 'Comprovante', subtitle: '', showBack: false }, { type: 'default', variant: 'standard' }, 0),
    node('snackbar', { message: 'Pagamento realizado com sucesso!', actionLabel: '' }, { type: 'success' }, 1),
    frame(
      { direction: 'vertical', gap: 8, paddingH: 16, paddingV: 20, alignItems: 'center', justifyContent: 'center' },
      2, null,
      (pid) => [
        node('typography', { text: 'Valor pago' }, { type: 'caption', color: 'secondary' }, 0, pid),
        node('money-amount', { currency: 'R$', amount: '1.299', cents: '99', discountPct: '' }, { size: 'large', color: 'positive' }, 1, pid),
        node('typography', { text: 'Débito • Cartão terminado em 4521' }, { type: 'small', color: 'secondary' }, 2, pid),
      ]
    ),
    node('list', { showDivider: true }, { size: 'compact' }, 3),
    node('list-row', { title: 'Data', description: '', badgeLabel: '', showThumbnail: false, showChevron: false }, {}, 4),
    node('list-row', { title: 'Estabelecimento', description: '', badgeLabel: '', showThumbnail: false, showChevron: false }, {}, 5),
    node('list-row', { title: 'Número da transação', description: '', badgeLabel: '', showThumbnail: false, showChevron: false }, {}, 6),
    node('fixed-footer', { primaryLabel: 'Ir para o início', secondaryLabel: 'Compartilhar comprovante' }, { layout: 'double' }, 7),
  ];
}

/**
 * 8. Cadastrar chaves Pix
 * Baseado na tela real Setup Pix do Mercado Pago (Figma 1:32800)
 * Header + title block + list com checkboxes de chaves + footer double
 */
function buildSetupPix(): CanvasNode[] {
  return [
    node('header', { title: 'Cadastrar Pix', subtitle: '', showBack: true }, { type: 'default', variant: 'standard' }, 0),
    frame(
      { direction: 'vertical', gap: 4, paddingH: 16, paddingV: 12 },
      1, null,
      (pid) => [
        node('typography', { text: 'Suas chaves Pix' }, { type: 'title-3', color: 'primary' }, 0, pid),
        node('typography', { text: 'Escolha qual informação usar para receber transferências via Pix' }, { type: 'body', color: 'secondary' }, 1, pid),
      ]
    ),
    node('list', { showDivider: true }, { size: 'default' }, 2),
    node('list-row', { title: 'Celular', description: '+55 11 99999-0000', badgeLabel: 'Mais prática', showThumbnail: false, showChevron: false }, {}, 3),
    node('list-row', { title: 'CPF', description: '•••.•••.000-00', badgeLabel: '', showThumbnail: false, showChevron: false }, {}, 4),
    node('list-row', { title: 'E-mail', description: 'joao@email.com', badgeLabel: '', showThumbnail: false, showChevron: false }, {}, 5),
    node('list-row', { title: 'Chave aleatória', description: 'Não cadastrada', badgeLabel: '', showThumbnail: false, showChevron: false }, {}, 6),
    node('fixed-footer', { primaryLabel: 'Cadastrar chave', secondaryLabel: 'Agora não' }, { layout: 'double' }, 7),
  ];
}

/**
 * 9. Cartão de crédito — onboarding de produto
 * Baseado na tela Onboarding & Separadores do Mercado Pago (Figma 1:24064)
 * Header + hero + benefícios + checkbox termos + footer double
 */
function buildCreditCardOnboarding(): CanvasNode[] {
  return [
    node('header', { title: 'Cartão de crédito', subtitle: '', showBack: true }, { type: 'default', variant: 'standard' }, 0),
    node('thumbnail', { alt: 'Imagem do cartão' }, { size: 'xl', shape: 'square' }, 1),
    frame(
      { direction: 'vertical', gap: 4, paddingH: 16, paddingV: 8 },
      2, null,
      (pid) => [
        node('typography', { text: 'Sem anuidade, para sempre' }, { type: 'title-3', color: 'primary' }, 0, pid),
        node('typography', { text: 'Controle total dos seus gastos com mais facilidade e segurança' }, { type: 'body', color: 'secondary' }, 1, pid),
      ]
    ),
    node('list', { showDivider: true }, { size: 'default' }, 3),
    node('list-row', { title: 'Sem anuidade', description: 'Sem cobranças mensais', badgeLabel: '', showThumbnail: true, showChevron: false }, {}, 4),
    node('list-row', { title: 'Limite pré-aprovado', description: 'Liberado imediatamente após cadastro', badgeLabel: '', showThumbnail: true, showChevron: false }, {}, 5),
    node('list-row', { title: 'Pagamento por aproximação', description: 'Apple Pay, Google Pay e Samsung Pay', badgeLabel: '', showThumbnail: true, showChevron: false }, {}, 6),
    node('checkbox', { label: 'Li e aceito os termos e condições do cartão de crédito', disabled: false }, { state: 'unchecked' }, 7),
    node('fixed-footer', { primaryLabel: 'Pedir cartão grátis', secondaryLabel: 'Agora não' }, { layout: 'double' }, 8),
  ];
}

/**
 * 10. Intro Screen — onboarding multi-step
 * Baseado na tela Intro Screens do Mercado Pago (Figma 1:33276)
 * Onboarding fullImage + progress segmentado + footer double
 */
function buildIntroScreen(): CanvasNode[] {
  return [
    node('onboarding',
      { title: 'Seu dinheiro rende todos os dias', description: 'Saldo na conta Mercado Pago rende 100% do CDI automaticamente, sem precisar fazer nada.' },
      { type: 'fullImage' },
      0
    ),
    node('progress', { total: 3, current: 1 }, { type: 'segmented' }, 1),
    node('fixed-footer', { primaryLabel: 'Entrar', secondaryLabel: 'Abrir conta grátis' }, { layout: 'double' }, 2),
  ];
}

/**
 * 11. Hub de tarefas — cadastro progressivo
 * Baseado na tela Hub Newbie [MLB] do Mercado Pago (Figma 2:18101)
 * Header + hero com progress + lista de tarefas + footer CTA
 */
function buildHubNewbie(): CanvasNode[] {
  return [
    node('header', { title: 'Mercado Pago', subtitle: '', showBack: false }, { type: 'colored', variant: 'standard' }, 0),
    frame(
      { direction: 'vertical', gap: 8, paddingH: 20, paddingV: 20 },
      1, null,
      (pid) => [
        node('typography', { text: 'Complete seu cadastro' }, { type: 'title-3', color: 'primary' }, 0, pid),
        node('typography', { text: '1 de 4 tarefas concluídas' }, { type: 'small', color: 'secondary' }, 1, pid),
        node('progress', { total: 4, current: 1 }, { type: 'segmented' }, 2, pid),
      ]
    ),
    node('list', { showDivider: true }, { size: 'large' }, 2),
    node('list-row', { title: 'Verificar identidade', description: 'Envie uma selfie e um documento', badgeLabel: 'Pendente', showThumbnail: true, showChevron: true }, {}, 3),
    node('list-row', { title: 'Adicionar saldo', description: 'Deposite, transfira ou receba via Pix', badgeLabel: '', showThumbnail: true, showChevron: true }, {}, 4),
    node('list-row', { title: 'Ativar cartão virtual', description: 'Use em compras online e apps', badgeLabel: '', showThumbnail: true, showChevron: true }, {}, 5),
    node('list-row', { title: 'Configurar Pix', description: 'Cadastre suas chaves Pix', badgeLabel: '', showThumbnail: true, showChevron: true }, {}, 6),
    node('fixed-footer', { primaryLabel: 'Continuar cadastro', secondaryLabel: '' }, { layout: 'single' }, 7),
  ];
}

// ─── Registro dos templates ────────────────────────────────────────────────────

export const LAYOUT_TEMPLATES: LayoutTemplate[] = [
  {
    id: 'product-detail',
    name: 'Detalhe de produto',
    emoji: '🛍️',
    description: 'Header, galeria, preço, descrição e CTA duplo de compra',
    buildNodes: buildProductDetail,
  },
  {
    id: 'checkout',
    name: 'Checkout',
    emoji: '💳',
    description: 'Confirmação de pagamento com resumo, CVV e rodapé duplo',
    buildNodes: buildCheckout,
  },
  {
    id: 'login',
    name: 'Login',
    emoji: '🔐',
    description: 'Autenticação com campos, link de recuperação e footer duplo',
    buildNodes: buildLogin,
  },
  {
    id: 'search',
    name: 'Busca',
    emoji: '🔍',
    description: 'Search bar, tabs e lista de resultados',
    buildNodes: buildSearch,
  },
  {
    id: 'onboarding',
    name: 'Onboarding',
    emoji: '✨',
    description: 'Tela de boas-vindas centrada com footer duplo de CTA',
    buildNodes: buildOnboarding,
  },
  {
    id: 'profile',
    name: 'Perfil',
    emoji: '👤',
    description: 'Conta do usuário com avatar, dados e configurações',
    buildNodes: buildProfile,
  },
  {
    id: 'payment-confirmation',
    name: 'Comprovante',
    emoji: '✅',
    description: 'Confirmação de pagamento com snackbar e detalhes da transação',
    buildNodes: buildPaymentConfirmation,
  },
  {
    id: 'setup-pix',
    name: 'Setup Pix',
    emoji: '⚡',
    description: 'Cadastro de chaves Pix com lista selecionável e footer duplo',
    buildNodes: buildSetupPix,
  },
  {
    id: 'credit-card-onboarding',
    name: 'Cartão de crédito',
    emoji: '💚',
    description: 'Onboarding de produto com benefícios, termos e footer duplo',
    buildNodes: buildCreditCardOnboarding,
  },
  {
    id: 'intro-screen',
    name: 'Intro Screen',
    emoji: '🎯',
    description: 'Onboarding fullImage multi-step com progress e footer duplo',
    buildNodes: buildIntroScreen,
  },
  {
    id: 'hub-newbie',
    name: 'Hub de tarefas',
    emoji: '📋',
    description: 'Cadastro progressivo com progress bar e lista de tarefas pendentes',
    buildNodes: buildHubNewbie,
  },
];

export function getRandomTemplate(): LayoutTemplate {
  return LAYOUT_TEMPLATES[Math.floor(Math.random() * LAYOUT_TEMPLATES.length)];
}
