import { Pressable, StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { useTheme } from '@/contexts/theme-context';

type CardVariant = 'default' | 'highlight' | 'hero';

interface CardProps extends ViewProps {
  variant?: CardVariant;
  onPress?: () => void;
  selected?: boolean;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Card({ variant = 'default', onPress, selected, padded = true, style, children, ...rest }: CardProps) {
  const theme = useTheme();
  const { colors } = theme;

  const variantStyle: ViewStyle = {
    default: {
      backgroundColor: colors.background.surface,
      borderColor: colors.border.subtle,
      borderRadius: theme.radius.lg,
      padding: padded ? theme.spacing[4] : 0,
    },
    highlight: {
      backgroundColor: colors.background.tertiary,
      borderColor: colors.border.default,
      borderRadius: theme.radius.xl,
      padding: padded ? theme.spacing[5] : 0,
    },
    hero: {
      backgroundColor: colors.hero.background,
      borderColor: colors.hero.background,
      borderRadius: theme.radius.lg,
      padding: padded ? theme.spacing[5] : 0,
    },
  }[variant];

  const selectedStyle: ViewStyle | undefined = selected
    ? { borderColor: colors.border.focus, backgroundColor: colors.background.surfaceHover }
    : undefined;

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.base,
          variantStyle,
          theme.shadows.sm,
          selectedStyle,
          pressed && variant !== 'hero' && { backgroundColor: colors.background.surfaceHover },
          pressed && variant === 'hero' && { opacity: 0.9 },
          style,
        ]}
        {...rest}>
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[styles.base, variantStyle, theme.shadows.sm, selectedStyle, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
  },
});
