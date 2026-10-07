import { Image } from 'expo-image';
import Head from 'expo-router/head';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Logo } from '@/components/ui';
import { useSession } from '@/contexts/session-context';
import { useTheme } from '@/contexts/theme-context';

/** Tempo mínimo da splash, para a marca não "piscar" na tela */
const MIN_SPLASH_MS = 1200;

const patrickLogo = require('@/assets/images/patrick-esportes.png');

/**
 * Splash: marca SwimRank + "Propriedade Patrick Esportes".
 * Decide a rota inicial: participante salvo → /home, senão → /identify.
 */
export default function SplashScreen() {
  const theme = useTheme();
  const { participant, status } = useSession();
  const [minSplashDone, setMinSplashDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinSplashDone(true), MIN_SPLASH_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (minSplashDone && status === 'ready') {
      router.replace(participant ? '/home' : '/identify');
    }
  }, [minSplashDone, status, participant]);

  return (
    <>
     <Head>
        <title>SwimRank | Patrick Esportes</title>
        <meta name="description" content="Ranking de atletas de natação do Patrick Esportes. Venha você também participar!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SwimRank | Patrick Esportes" />
        <meta property="og:description" content="Ranking de atletas de natação do Patrick Esportes. Venha você também participar!" />
        <meta property="og:image" content="https://swimrank.com.br/patrick-esportes.png" />
        <meta property="og:url" content="https://swimrank.com.br" />
        <meta property="og:type" content="website"/>
      </Head>
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
    </>
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
