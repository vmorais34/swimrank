import { ActivityIndicator, Pressable, StyleSheet, View, type PressableProps } from 'react-native';

import { useTheme } from '@/contexts/theme-context';

import { AppText } from './app-text';
import { Icon, type IconName } from './icon';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'md' | 'sm';

interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  fullWidth = true,
  disabled,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const { colors } = theme;
  const isDisabled = disabled || loading;

  const palette = {
    primary: { bg: colors.brand.primary, pressed: colors.brand.primaryDark, fg: colors.text.onPrimary, border: 'transparent' },
    secondary: { bg: colors.background.surface, pressed: colors.background.surfaceHover, fg: colors.text.link, border: colors.border.subtle },
    outline: { bg: 'transparent', pressed: colors.background.surfaceHover, fg: colors.brand.primary, border: colors.brand.primary },
    ghost: { bg: 'transparent', pressed: colors.background.surfaceHover, fg: colors.text.link, border: 'transparent' },
    danger: { bg: colors.semantic.error, pressed: colors.semantic.errorDark, fg: colors.text.onPrimary, border: 'transparent' },
  }[variant];

  const height = size === 'md' ? theme.dimensions.button.height : theme.dimensions.button.heightSm;
  const paddingX = size === 'md' ? theme.dimensions.button.paddingX : theme.dimensions.button.paddingXSm;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          height,
          paddingHorizontal: paddingX,
          borderRadius: theme.radius.md,
          backgroundColor: pressed ? palette.pressed : palette.bg,
          borderColor: palette.border,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          opacity: isDisabled ? 0.55 : 1,
        },
        variant === 'primary' && !isDisabled && theme.shadows.sm,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <View style={styles.content}>
          {icon && <Icon name={icon} size="sm" color={palette.fg} />}
          <AppText
            variant={size === 'md' ? 'bodyStrong' : 'label'}
            weight="semibold"
            color={palette.fg}>
            {title}
          </AppText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
