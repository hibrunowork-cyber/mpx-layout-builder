import { CompositionRule } from '@/types/rules';

export const COMPOSITION_RULES: CompositionRule[] = [
  // ─── Aninhamento inválido ──────────────────────────────────────────────────

  // Não aninhar button dentro de button
  {
    id: 'no-button-in-button',
    type: 'no-self-nesting',
    componentId: 'button',
    severity: 'error',
    message: 'Button não pode ser aninhado dentro de outro Button',
  },

  // ─── Componentes raiz obrigatórios ────────────────────────────────────────

  // Header deve estar no nível raiz
  {
    id: 'header-root-only',
    type: 'forbidden-parent',
    componentId: 'header',
    forbiddenParents: ['onboarding', 'fixed-footer', 'card', 'frame'],
    severity: 'error',
    message: 'Header deve ser usado no nível raiz do layout — não dentro de containers',
  },

  // Fixed Footer deve estar no nível raiz
  {
    id: 'fixed-footer-root-only',
    type: 'forbidden-parent',
    componentId: 'fixed-footer',
    forbiddenParents: ['onboarding', 'header', 'card', 'frame'],
    severity: 'error',
    message: 'Fixed Footer deve estar no nível raiz — é um componente de posição fixa',
  },

  // Onboarding deve estar no nível raiz
  {
    id: 'onboarding-root-only',
    type: 'forbidden-parent',
    componentId: 'onboarding',
    forbiddenParents: ['fixed-footer', 'header', 'card', 'frame'],
    severity: 'error',
    message: 'Onboarding é uma tela completa — deve estar no nível raiz',
  },

  // ─── Instâncias únicas (padrão Andes X / Mercado Pago) ────────────────────

  // Máximo 1 Header por tela
  {
    id: 'max-one-header',
    type: 'max-instances',
    componentId: 'header',
    max: 1,
    severity: 'error',
    message: 'Telas têm apenas um Header — múltiplos cabeçalhos quebram a hierarquia de navegação',
  },

  // Máximo 1 Fixed Footer por tela
  {
    id: 'max-one-fixed-footer',
    type: 'max-instances',
    componentId: 'fixed-footer',
    max: 1,
    severity: 'error',
    message: 'Telas têm apenas um Fixed Footer — múltiplos rodapés se sobrepõem e conflitam',
  },

  // Máximo 1 Onboarding por tela
  {
    id: 'max-one-onboarding',
    type: 'max-instances',
    componentId: 'onboarding',
    max: 1,
    severity: 'error',
    message: 'Onboarding é uma tela completa — múltiplos Onboardings conflitam visualmente',
  },

  // Máximo 1 Snackbar ativo
  {
    id: 'max-one-snackbar',
    type: 'max-instances',
    componentId: 'snackbar',
    max: 1,
    severity: 'warning',
    message: 'Múltiplos Snackbars se sobrepõem — mostre apenas um feedback de cada vez',
  },

  // ─── Ordem no nível raiz (padrão Andes X) ─────────────────────────────────

  // Header deve ser o primeiro componente raiz
  {
    id: 'header-must-be-first',
    type: 'root-position',
    componentId: 'header',
    position: 'first',
    severity: 'warning',
    message: 'Header deve ser o primeiro componente — o cabeçalho é a âncora visual do topo da tela',
  },

  // Fixed Footer deve ser o último componente raiz
  {
    id: 'fixed-footer-must-be-last',
    type: 'root-position',
    componentId: 'fixed-footer',
    position: 'last',
    severity: 'warning',
    message: 'Fixed Footer deve ser o último componente — ele flutua sobre o conteúdo abaixo',
  },

  // ─── Profundidade máxima ───────────────────────────────────────────────────

  {
    id: 'max-depth-4',
    type: 'max-depth',
    maxDepth: 4,
    severity: 'warning',
    message: 'Hierarquia muito profunda — layouts com mais de 4 níveis são difíceis de manter',
  },
];
