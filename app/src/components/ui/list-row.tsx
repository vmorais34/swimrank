import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/contexts/theme-context';

import { AppText } from './app-text';
import { Card } from './card';
import { Icon } from './icon';

interface ListRowProps {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  selected?: boolean;
}

/** Linha em card: ícone à esquerda, título/subtítulo e chevron (padrão do mockup) */
export function ListRow({ title, subtitle, left, right, onPress, showChevron = !!onPress, selected }: ListRowProps) {
  const theme = useTheme();

  return (
    <Card onPress={onPress} selected={selected} style={styles.card}>
      {left}
      <View style={styles.texts}>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {title}
        </AppText>
        {subtitle && (
          <AppText variant="caption" color="secondary" numberOfLines={2}>
            {subtitle}
          </AppText>
        )}
      </View>
      {right}
      {showChevron && <Icon name="chevronRight" size="sm" color={theme.colors.text.tertiary} />}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
});
