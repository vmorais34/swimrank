import type { ViewStyle } from 'react-native';

type ShadowLevel = 'sm' | 'md' | 'lg';

const specs: Record<ShadowLevel, { y: number; blur: number; opacity: number; elevation: number }> = {
  sm: { y: 2, blur: 6, opacity: 0.15, elevation: 2 },
  md: { y: 4, blur: 12, opacity: 0.2, elevation: 4 },
  lg: { y: 8, blur: 24, opacity: 0.25, elevation: 8 },
};

/**
 * Gera a sombra a partir da cor de sombra do tema.
 * No tema claro a opacidade é reduzida para manter a sombra discreta.
 */
export function makeShadow(level: ShadowLevel, color: string, isDark: boolean): ViewStyle {
  const spec = specs[level];
  const opacity = isDark ? spec.opacity : spec.opacity * 0.5;

  return {
    boxShadow: `0px ${spec.y}px ${spec.blur}px ${hexToRgba(color, opacity)}`,
    elevation: spec.elevation,
  };
}

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
