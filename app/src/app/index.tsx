import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Logo } from '@/components/ui';
import { useTheme } from '@/contexts/theme-context';
import { storage, StorageKeys } from '@/lib/storage';
import type { Participant } from '@/types/api';

/** Tempo mínimo da splash, para a marca não "piscar" na tela */
const MIN_SPLASH_MS = 1200;

const patrickLogo = require('@/assets/images/patrick-esportes.png');

/**
 * Splash: marca SwimRank + "Propriedade Patrick Esportes".
 * Decide a rota inicial: participante salvo → /home, senão → /identify.
 */
export default function SplashScreen() {
  const theme = useTheme();

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      const [participant] = await Promise.all([
        storage.get<Participant>(StorageKeys.participant),
        new Promise((resolve) => setTimeout(resolve, MIN_SPLASH_MS)),
      ]);

      if (active) router.replace(participant ? '/home' : '/identify');
    }

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.root, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.center, { gap: theme.spacing[8] }]}>
        <Logo size="lg" />
        <ActivityIndicator color={theme.colors.brand.primary} />
      </View>

      <View style={[styles.footer, { gap: theme.spacing[2], paddingBottom: theme.spacing[6] }]}>
        <AppText variant="overline" color="tertiary">
          Propriedade
        </AppText>
        <Image
          source={patrickLogo}
          tintColor={theme.colors.text.secondary}
          contentFit="contain"
          style={styles.partnerLogo}
          accessibilityLabel="Patrick Esportes — Complexo Esportivo"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  partnerLogo: {
    width: 160,
    height: 68,
  },
});
