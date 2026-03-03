// Design Tokens Andes — Mercado Pago / Mercado Livre
// Fonte: Andes X design system

export const colors = {
  // Brand
  brandBlue: '#009ee3',
  brandYellow: '#ffe600',

  // Semantic
  success: '#00a650',
  successLight: '#e8f5e9',
  warning: '#fff159',
  warningLight: '#fffde7',
  error: '#f23d4f',
  errorLight: '#fde8ea',
  info: '#3483fa',
  infoLight: '#e8f0fe',

  // Neutral scale
  neutral900: '#333333',
  neutral800: '#4a4a4a',
  neutral700: '#666666',
  neutral600: '#8c8c8c',
  neutral500: '#999999',
  neutral400: '#b2b2b2',
  neutral300: '#cccccc',
  neutral200: '#e0e0e0',
  neutral100: '#f0f0f0',
  neutral050: '#f5f5f5',
  white: '#ffffff',

  // Component backgrounds
  bgPrimary: '#009ee3',
  bgSecondary: '#f0f9ff',
  bgNeutral: '#f5f5f5',
  bgDark: '#333333',
} as const;

export const typography = {
  fontFamily: 'Proxima Nova, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
  },
  weights: {
    regular: 400,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const spacing = {
  // Escala 4px
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const;

export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '6px',
  lg: '8px',
  full: '9999px',
} as const;

export const shadows = {
  card: '0 1px 4px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
  dropdown: '0 4px 16px rgba(0,0,0,0.16)',
  modal: '0 8px 32px rgba(0,0,0,0.24)',
} as const;

// App builder UI tokens (dark theme)
export const app = {
  bg: '#0F0F0D',
  surface: '#171715',
  surfaceHover: '#1E1E1C',
  border: '#2A2A27',
  borderHover: '#3A3A37',
  text: '#E8E8E5',
  textMuted: '#888886',
  textDim: '#666663',
  accent: '#FEE340',
  accentBg: '#1F1A00',
  accentBorder: '#4A3800',
  andesBlue: '#009ee3',
  andesBlueBg: '#001A2E',
  andesBlueBorder: '#003A5E',
  errorRed: '#f23d4f',
  warningYellow: '#fcd34d',
  successGreen: '#22c55e',
} as const;
