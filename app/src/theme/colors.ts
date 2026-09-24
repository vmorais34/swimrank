/**
 * Color tokens — fonte da verdade: .agents/rules/DESIGN_TOKENS.md
 *
 * dark  → paleta original do DESIGN_TOKENS.md
 * light → paleta derivada do mockup (.agents/references/mockup-mobile.png),
 *         mantendo a mesma estrutura semântica.
 *
 * No tema claro, `brand.primary` usa um azul mais fechado (#0369A1) para
 * garantir contraste AA do texto branco nos botões sobre fundo claro.
 */

const brand = {
  primary: '#0EA5E9',
  primaryDark: '#0284C7',
  primaryLight: '#38BDF8',
  secondary: '#06B6D4',
  secondaryLight: '#22D3EE',
};

const ranking = {
  gold: '#FACC15',
  silver: '#CBD5E1',
  bronze: '#D97706',
};

export const darkColors = {
  brand,

  background: {
    primary: '#071A2B',
    secondary: '#0A2238',
    tertiary: '#0D2D47',
    surface: '#103852',
    surfaceHover: '#15445F',
  },

  text: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    tertiary: '#94A3B8',
    disabled: '#64748B',
    onPrimary: '#FFFFFF',
    link: '#38BDF8',
  },

  semantic: {
    success: '#22C55E',
    successDark: '#16A34A',
    successBackground: '#123B2A',
    successText: '#86EFAC',

    warning: '#F59E0B',
    warningDark: '#D97706',
    warningBackground: '#3B2A0F',
    warningText: '#FCD34D',

    error: '#EF4444',
    errorDark: '#DC2626',
    errorBackground: '#3B1515',
    errorText: '#FCA5A5',

    info: '#38BDF8',
    infoBackground: '#0C3047',
    infoText: '#7DD3FC',
  },

  ranking,

  border: {
    subtle: '#1E4963',
    default: '#285873',
    focus: '#38BDF8',
    success: '#22C55E',
    error: '#EF4444',
  },

  /** Hero cards (sequência, header do registro) */
  hero: {
    background: '#0284C7',
    text: '#FFFFFF',
    textMuted: '#E0F2FE',
  },

  tabBar: {
    background: '#0A2238',
    border: '#1E4963',
    active: '#38BDF8',
    inactive: '#94A3B8',
  },

  shadow: '#000000',
  overlay: 'rgba(7, 26, 43, 0.72)',
};

export type ThemeColors = typeof darkColors;

export const lightColors: ThemeColors = {
  brand: {
    ...brand,
    primary: '#0369A1',
    primaryDark: '#075985',
    primaryLight: '#0EA5E9',
  },

  background: {
    primary: '#DDF3FB',
    secondary: '#E9F8FD',
    tertiary: '#F2FBFE',
    surface: '#F8FDFF',
    surfaceHover: '#E3F4FB',
  },

  text: {
    primary: '#0B3A5B',
    secondary: '#3B6A87',
    tertiary: '#5F8299',
    disabled: '#9DB5C4',
    onPrimary: '#FFFFFF',
    link: '#0369A1',
  },

  semantic: {
    success: '#16A34A',
    successDark: '#15803D',
    successBackground: '#DCFCE7',
    successText: '#166534',

    warning: '#D97706',
    warningDark: '#B45309',
    warningBackground: '#FEF3C7',
    warningText: '#92400E',

    error: '#DC2626',
    errorDark: '#B91C1C',
    errorBackground: '#FEE2E2',
    errorText: '#991B1B',

    info: '#0284C7',
    infoBackground: '#E0F2FE',
    infoText: '#075985',
  },

  ranking,

  border: {
    subtle: '#CBE7F3',
    default: '#A9D5E8',
    focus: '#0284C7',
    success: '#16A34A',
    error: '#DC2626',
  },

  hero: {
    background: '#0369A1',
    text: '#FFFFFF',
    textMuted: '#E0F2FE',
  },

  tabBar: {
    background: '#F2FBFE',
    border: '#CBE7F3',
    active: '#0369A1',
    inactive: '#5F8299',
  },

  shadow: '#0B3A5B',
  overlay: 'rgba(11, 58, 91, 0.45)',
};
