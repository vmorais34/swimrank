import { StyleSheet, Text, type TextProps } from 'react-native';

import { useTheme } from '@/contexts/theme-context';
import type { ThemeColors } from '@/theme';
import type { FontWeight, TextVariant } from '@/theme/typography';

type TextColor = keyof ThemeColors['text'];

export interface AppTextProps extends TextProps {
  variant?: TextVariant;
  /** Cor semântica de texto do tema ou uma cor explícita vinda de outro token */
  color?: TextColor | (string & {});
  weight?: FontWeight;
  align?: 'left' | 'center' | 'right';
}

export function AppText({
  variant = 'body',
  color = 'primary',
  weight,
  align,
  style,
  ...rest
}: AppTextProps) {
  const theme = useTheme();
  const spec = theme.textVariants[variant];
  const resolvedWeight = weight ?? spec.weight;
  const size = theme.fontSize[spec.size];

  const resolvedColor =
    color in theme.colors.text ? theme.colors.text[color as TextColor] : color;

  return (
    <Text
      style={[
        {
          color: resolvedColor,
          fontSize: size,
          lineHeight: Math.round(size * theme.lineHeight[spec.line]),
          fontFamily: theme.fontFamily[resolvedWeight],
          fontWeight: theme.fontWeight[resolvedWeight],
          textAlign: align,
        },
        variant === 'overline' && styles.overline,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  overline: {
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
