import { Pressable, View } from 'react-native';

import { useTheme } from '@/contexts/theme-context';

import { Icon } from './icon';

interface AvatarProps {
  size?: number;
  highlighted?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
}

/** V1 não tem upload de foto: avatar sempre com ícone padrão de usuário. */
export function Avatar({ size, highlighted, onPress, accessibilityLabel = 'Perfil' }: AvatarProps) {
  const theme = useTheme();
  const pixels = size ?? theme.dimensions.avatar;

  const circle = (
    <View
      style={{
        width: pixels,
        height: pixels,
        borderRadius: theme.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: highlighted ? theme.colors.brand.primary : theme.colors.background.surface,
        borderWidth: 1,
        borderColor: highlighted ? theme.colors.brand.primary : theme.colors.border.subtle,
      }}>
      <Icon
        name="user"
        size={Math.round(pixels * 0.5)}
        color={highlighted ? theme.colors.text.onPrimary : theme.colors.brand.primary}
      />
    </View>
  );

  if (!onPress) return circle;

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} onPress={onPress} hitSlop={4}>
      {circle}
    </Pressable>
  );
}
