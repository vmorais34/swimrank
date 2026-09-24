import type { TextStyle } from 'react-native';

/**
 * Inter é carregada via @expo-google-fonts/inter.
 * No React Native cada peso é uma família separada, então o peso é
 * resolvido pela família (fontWeight é mantido para o fallback web).
 */
export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
} as const;

export type FontWeight = keyof typeof fontFamily;

export const fontWeight: Record<FontWeight, TextStyle['fontWeight']> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export type FontSize = keyof typeof fontSize;

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.6,
} as const;

/** Variantes prontas usadas pelo componente <AppText /> */
export const textVariants = {
  hero: { size: '4xl', weight: 'extrabold', line: 'tight' },
  display: { size: '3xl', weight: 'extrabold', line: 'tight' },
  title: { size: '2xl', weight: 'bold', line: 'tight' },
  subtitle: { size: 'xl', weight: 'bold', line: 'tight' },
  heading: { size: 'lg', weight: 'semibold', line: 'tight' },
  body: { size: 'md', weight: 'regular', line: 'normal' },
  bodyStrong: { size: 'md', weight: 'semibold', line: 'normal' },
  label: { size: 'sm', weight: 'medium', line: 'normal' },
  caption: { size: 'xs', weight: 'regular', line: 'normal' },
  overline: { size: 'xs', weight: 'semibold', line: 'normal' },
} as const satisfies Record<
  string,
  { size: FontSize; weight: FontWeight; line: keyof typeof lineHeight }
>;

export type TextVariant = keyof typeof textVariants;
