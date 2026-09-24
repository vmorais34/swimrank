import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '@/contexts/theme-context';

import { AppText } from './app-text';

interface LogoProps {
  size?: 'md' | 'lg';
  color?: string;
  showTagline?: boolean;
}

/** Marca SwimRank: três ondas + wordmark + tagline (mockup) */
export function Logo({ size = 'md', color, showTagline = true }: LogoProps) {
  const theme = useTheme();
  const tint = color ?? theme.colors.brand.primary;
  const markWidth = size === 'lg' ? 96 : 64;

  return (
    <View style={styles.wrapper} accessibilityRole="image" accessibilityLabel="SwimRank">
      <Svg width={markWidth} height={markWidth * 0.55} viewBox="0 0 64 36" fill="none">
        <Path d="M4 8c6-6 14-6 20 0s14 6 20 0 12-5 16-2" stroke={tint} strokeWidth={5} strokeLinecap="round" />
        <Path d="M4 19c6-6 14-6 20 0s14 6 20 0 12-5 16-2" stroke={tint} strokeWidth={5} strokeLinecap="round" />
        <Path d="M4 30c6-6 14-6 20 0s14 6 20 0 12-5 16-2" stroke={tint} strokeWidth={5} strokeLinecap="round" />
      </Svg>

      <AppText variant={size === 'lg' ? 'hero' : 'display'} color={tint} weight="bold">
        SwimRank
      </AppText>

      {showTagline && (
        <AppText variant="overline" color={tint} style={styles.tagline}>
          Treino · Evolução · Conquistas
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 6,
  },
  tagline: {
    opacity: 0.85,
  },
});
