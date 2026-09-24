import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/contexts/theme-context';

import { AppText } from './app-text';
import { Icon } from './icon';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: ReactNode;
}

export function Header({ title, subtitle, onBack, right }: HeaderProps) {
  const theme = useTheme();

  return (
    <View style={[styles.row, { minHeight: theme.dimensions.header.height }]}>
      {onBack && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          onPress={onBack}
          style={[styles.back, { width: theme.dimensions.touchTarget, height: theme.dimensions.touchTarget }]}>
          <Icon name="arrowLeft" color={theme.colors.text.primary} />
        </Pressable>
      )}

      <View style={styles.titles}>
        <AppText variant="subtitle" accessibilityRole="header">
          {title}
        </AppText>
        {subtitle && (
          <AppText variant="label" color="secondary">
            {subtitle}
          </AppText>
        )}
      </View>

      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  back: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
  },
  titles: {
    flex: 1,
  },
});
