import { View } from 'react-native';

import { useTheme } from '@/contexts/theme-context';
import type { IconSize } from '@/theme/dimensions';

import { Icon, type IconName } from './icon';

interface IconBadgeProps {
  name: IconName;
  color?: string;
  background?: string;
  size?: number;
  iconSize?: IconSize;
}

/** Ícone dentro de um círculo colorido (listas de conquistas, stats) */
export function IconBadge({ name, color, background, size = 40, iconSize = 'sm' }: IconBadgeProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: theme.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: background ?? theme.colors.semantic.infoBackground,
      }}>
      <Icon name={name} size={iconSize} color={color ?? theme.colors.brand.primary} />
    </View>
  );
}
