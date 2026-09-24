import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { useTheme } from '@/contexts/theme-context';

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  /** Conteúdo fixo abaixo do scroll (ex.: CTA) */
  footer?: ReactNode;
  edges?: Edge[];
  refreshing?: boolean;
  onRefresh?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * Container padrão das telas: safe area, fundo do tema, padding horizontal
 * de 16px e largura máxima para não esticar no navegador desktop.
 */
export function Screen({
  children,
  scroll = true,
  footer,
  edges = ['top'],
  refreshing,
  onRefresh,
  contentStyle,
}: ScreenProps) {
  const theme = useTheme();

  const content = [
    styles.content,
    {
      paddingHorizontal: theme.dimensions.screen.paddingX,
      paddingVertical: theme.spacing[4],
      gap: theme.spacing[4],
      maxWidth: theme.dimensions.screen.maxWidth,
    },
    contentStyle,
  ];

  return (
    <SafeAreaView edges={edges} style={[styles.root, { backgroundColor: theme.colors.background.primary }]}>
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {scroll ? (
          <ScrollView
            style={styles.root}
            contentContainerStyle={content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            refreshControl={
              onRefresh ? (
                <RefreshControl
                  refreshing={!!refreshing}
                  onRefresh={onRefresh}
                  tintColor={theme.colors.brand.primary}
                  colors={[theme.colors.brand.primary]}
                />
              ) : undefined
            }>
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.root, content]}>{children}</View>
        )}

        {footer && (
          <View
            style={[
              styles.footer,
              {
                paddingHorizontal: theme.dimensions.screen.paddingX,
                paddingBottom: theme.spacing[3],
                maxWidth: theme.dimensions.screen.maxWidth,
              },
            ]}>
            {footer}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    width: '100%',
    alignSelf: 'center',
    flexGrow: 1,
  },
  footer: {
    width: '100%',
    alignSelf: 'center',
  },
});
