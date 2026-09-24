import { forwardRef, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { useTheme } from '@/contexts/theme-context';

import { AppText } from './app-text';
import { Icon, type IconName } from './icon';

interface TextFieldProps extends TextInputProps {
  label?: string;
  icon?: IconName;
  error?: string | null;
  hint?: string;
  /** Mostra o botão de exibir/ocultar senha */
  secureToggle?: boolean;
  right?: ReactNode;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { label, icon, error, hint, secureToggle, right, secureTextEntry, onFocus, onBlur, style, ...rest },
  ref
) {
  const theme = useTheme();
  const { colors } = theme;
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  const borderColor = error ? colors.border.error : focused ? colors.border.focus : colors.border.default;
  const backgroundColor = focused ? colors.background.surface : colors.background.tertiary;

  return (
    <View style={styles.wrapper}>
      {label && (
        <AppText variant="label" color="secondary">
          {label}
        </AppText>
      )}

      <View
        style={[
          styles.field,
          {
            height: theme.dimensions.input.height,
            paddingHorizontal: theme.dimensions.input.paddingX,
            borderRadius: theme.radius.md,
            borderColor,
            backgroundColor,
          },
        ]}>
        {icon && <Icon name={icon} size="sm" color={focused ? colors.border.focus : colors.text.tertiary} />}

        <TextInput
          ref={ref}
          placeholderTextColor={colors.text.tertiary}
          secureTextEntry={secureToggle ? hidden : secureTextEntry}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          style={[
            styles.input,
            {
              color: colors.text.primary,
              fontFamily: theme.fontFamily.regular,
              fontSize: theme.fontSize.md,
            },
            style,
          ]}
          {...rest}
        />

        {secureToggle && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Mostrar senha' : 'Ocultar senha'}
            hitSlop={12}
            onPress={() => setHidden((value) => !value)}>
            <Icon name={hidden ? 'eye' : 'eyeOff'} size="sm" color={colors.text.tertiary} />
          </Pressable>
        )}

        {right}
      </View>

      {error ? (
        <AppText variant="caption" color={colors.semantic.error} accessibilityLiveRegion="polite">
          {error}
        </AppText>
      ) : hint ? (
        <AppText variant="caption" color="tertiary">
          {hint}
        </AppText>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: '100%',
    outlineStyle: 'none',
  } as object,
});
