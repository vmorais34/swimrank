import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useTheme } from '@/contexts/theme-context';

import { AppText } from './app-text';
import { Button } from './button';
import { Icon, type IconName } from './icon';

export function LoadingState({ message = 'Carregando...' }: { message?: string }) {
  const theme = useTheme();

  return (
    <View style={styles.center} accessibilityLiveRegion="polite">
      <ActivityIndicator size="large" color={theme.colors.brand.primary} />
      <AppText variant="label" color="secondary">
        {message}
      </AppText>
    </View>
  );
}

interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon = 'waves', title, description, actionLabel, onAction }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.center}>
      <Icon name={icon} size="xl" color={theme.colors.text.tertiary} />
      <AppText variant="heading" align="center">
        {title}
      </AppText>
      {description && (
        <AppText variant="label" color="secondary" align="center">
          {description}
        </AppText>
      )}
      {actionLabel && onAction && (
        <Button title={actionLabel} variant="outline" size="sm" fullWidth={false} onPress={onAction} />
      )}
    </View>
  );
}

interface ErrorStateProps {
  title?: string;
  message: string;
  offline?: boolean;
  onRetry?: () => void;
}

export function ErrorState({ title, message, offline, onRetry }: ErrorStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.center} accessibilityLiveRegion="polite">
      <Icon name={offline ? 'wifiOff' : 'alert'} size="xl" color={theme.colors.semantic.error} />
      <AppText variant="heading" align="center">
        {title ?? (offline ? 'Sem conexão' : 'Algo deu errado')}
      </AppText>
      <AppText variant="label" color="secondary" align="center">
        {message}
      </AppText>
      {onRetry && (
        <Button title="Tentar novamente" icon="refresh" variant="outline" size="sm" fullWidth={false} onPress={onRetry} />
      )}
    </View>
  );
}

/** Aviso inline (erros de formulário, informações) */
export function InlineMessage({ tone = 'info', message }: { tone?: 'info' | 'error' | 'success' | 'warning'; message: string }) {
  const theme = useTheme();
  const { semantic } = theme.colors;

  const palette = {
    info: { bg: semantic.infoBackground, fg: semantic.infoText, icon: 'info' as const },
    error: { bg: semantic.errorBackground, fg: semantic.errorText, icon: 'alert' as const },
    success: { bg: semantic.successBackground, fg: semantic.successText, icon: 'checkCircle' as const },
    warning: { bg: semantic.warningBackground, fg: semantic.warningText, icon: 'alert' as const },
  }[tone];

  return (
    <View
      accessibilityLiveRegion="polite"
      style={[styles.inline, { backgroundColor: palette.bg, borderRadius: theme.radius.md }]}>
      <Icon name={palette.icon} size="sm" color={palette.fg} />
      <AppText variant="caption" color={palette.fg} style={styles.inlineText}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
  },
  inlineText: {
    flex: 1,
  },
});
