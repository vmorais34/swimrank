export const dimensions = {
  button: {
    height: 48,
    heightSm: 40,
    paddingX: 16,
    paddingXSm: 12,
  },
  input: {
    height: 48,
    paddingX: 16,
  },
  header: {
    height: 56,
  },
  tabBar: {
    height: 64,
  },
  rankingItem: {
    height: 64,
  },
  avatar: 40,
  touchTarget: 44,
  screen: {
    paddingX: 16,
    paddingXWide: 24,
    /** Largura máxima do conteúdo no navegador desktop */
    maxWidth: 520,
  },
} as const;

export const iconSize = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

export type IconSize = keyof typeof iconSize;
