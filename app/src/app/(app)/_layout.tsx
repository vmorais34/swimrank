import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from '@/components/ui';
import { useTheme } from '@/contexts/theme-context';

function tabIcon(name: IconName) {
  return function TabIcon({ color }: { color: ColorValue }) {
    return <Icon name={name} size="md" color={color as string} />;
  };
}

export default function AppTabsLayout() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tabBar.active,
        tabBarInactiveTintColor: theme.colors.tabBar.inactive,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar.background,
          borderTopColor: theme.colors.tabBar.border,
          borderTopWidth: 1,
          minHeight: theme.dimensions.tabBar.height + insets.bottom,
          height: 'auto',
          paddingTop: 8,
          paddingBottom: insets.bottom + 8,
        },
        tabBarLabelStyle: {
          fontFamily: theme.fontFamily.medium,
          fontSize: theme.fontSize.xs,
          lineHeight: 16,
        },
        sceneStyle: { backgroundColor: theme.colors.background.primary },
      }}>
      <Tabs.Screen name="home" options={{ title: 'Início', tabBarIcon: tabIcon('home') }} />
      <Tabs.Screen name="register" options={{ title: 'Registrar', tabBarIcon: tabIcon('plusCircle') }} />
      <Tabs.Screen name="ranking" options={{ title: 'Ranking', tabBarIcon: tabIcon('chart') }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil', tabBarIcon: tabIcon('user') }} />

      {/* Rotas dentro das abas, mas fora da tab bar */}
      <Tabs.Screen name="history" options={{ href: null }} />
      <Tabs.Screen name="achievements" options={{ href: null }} />
    </Tabs>
  );
}
