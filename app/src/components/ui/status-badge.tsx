import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/contexts/theme-context';
import type { ActivityStatus } from '@/types/api';

import { AppText } from './app-text';
import { Icon, type IconName } from './icon';

const labels: Record<ActivityStatus, { text: string; icon: IconName }> = {
  PENDING: { text: 'Pendente', icon: 'hourglass' },
  APPROVED: { text: 'Aprovada', icon: 'checkCircle' },
  REJECTED: { text: 'Rejeitada', icon: 'xCircle' },
};

export function StatusBadge({ status }: { status: ActivityStatus }) {
  const theme = useTheme();
  const { semantic } = theme.colors;

  const palette = {
    PENDING: { bg: semantic.warningBackground, fg: semantic.warningText, icon: semantic.warning },
    APPROVED: { bg: semantic.successBackground, fg: semantic.successText, icon: semantic.success },
    REJECTED: { bg: semantic.errorBackground, fg: semantic.errorText, icon: semantic.error },
  }[status];

  return (
    <View
      accessibilityLabel={`Status: ${labels[status].text}`}
      style={[styles.badge, { backgroundColor: palette.bg, borderRadius: theme.radius.full }]}>
      <Icon name={labels[status].icon} size={14} color={palette.icon} />
      <AppText variant="caption" weight="semibold" color={palette.fg}>
        {labels[status].text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
});
