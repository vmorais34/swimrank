import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/contexts/theme-context';

import { AppText } from './app-text';

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.track,
        {
          borderRadius: theme.radius.full,
          borderColor: colors.border.default,
          backgroundColor: colors.background.surface,
        },
      ]}>
      {options.map((option) => {
        const active = option.value === value;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option.value)}
            style={[
              styles.segment,
              {
                borderRadius: theme.radius.full,
                backgroundColor: active ? colors.brand.primary : 'transparent',
              },
            ]}>
            <AppText variant="label" weight="semibold" color={active ? colors.text.onPrimary : colors.text.secondary}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 3,
  },
  segment: {
    flex: 1,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});
