import { darkColors, lightColors, type ThemeColors } from './colors';
import { dimensions, iconSize } from './dimensions';
import { borderWidth, radius } from './radius';
import { makeShadow } from './shadows';
import { spacing } from './spacing';
import { fontFamily, fontSize, fontWeight, lineHeight, textVariants } from './typography';

export type ColorScheme = 'light' | 'dark';

export function createTheme(scheme: ColorScheme) {
  const isDark = scheme === 'dark';
  const colors: ThemeColors = isDark ? darkColors : lightColors;

  return {
    scheme,
    isDark,
    colors,
    spacing,
    radius,
    borderWidth,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    textVariants,
    dimensions,
    iconSize,
    shadows: {
      sm: makeShadow('sm', colors.shadow, isDark),
      md: makeShadow('md', colors.shadow, isDark),
      lg: makeShadow('lg', colors.shadow, isDark),
    },
  };
}

export type Theme = ReturnType<typeof createTheme>;

export { darkColors, lightColors, spacing, radius, dimensions, iconSize, fontFamily, fontSize };
export type { ThemeColors };
