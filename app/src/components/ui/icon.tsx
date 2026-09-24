import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';

import { useTheme } from '@/contexts/theme-context';
import type { IconSize } from '@/theme/dimensions';

/**
 * Ícones SVG com stroke consistente de 2px (DESIGN_TOKENS §21).
 * Desenhos baseados no Lucide (ISC License).
 */
const icons = {
  home: (
    <>
      <Path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <Path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </>
  ),
  plusCircle: (
    <>
      <Circle cx="12" cy="12" r="10" />
      <Path d="M8 12h8" />
      <Path d="M12 8v8" />
    </>
  ),
  plus: (
    <>
      <Path d="M5 12h14" />
      <Path d="M12 5v14" />
    </>
  ),
  chart: (
    <>
      <Line x1="18" x2="18" y1="20" y2="10" />
      <Line x1="12" x2="12" y1="20" y2="4" />
      <Line x1="6" x2="6" y1="20" y2="14" />
    </>
  ),
  user: (
    <>
      <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <Circle cx="12" cy="7" r="4" />
    </>
  ),
  calendar: (
    <>
      <Path d="M8 2v4" />
      <Path d="M16 2v4" />
      <Rect width="18" height="18" x="3" y="4" rx="2" />
      <Path d="M3 10h18" />
    </>
  ),
  clock: (
    <>
      <Circle cx="12" cy="12" r="10" />
      <Polyline points="12 6 12 12 16 14" />
    </>
  ),
  route: (
    <>
      <Circle cx="6" cy="19" r="3" />
      <Path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <Circle cx="18" cy="5" r="3" />
    </>
  ),
  waves: (
    <>
      <Path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <Path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <Path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </>
  ),
  chevronRight: <Path d="m9 18 6-6-6-6" />,
  chevronLeft: <Path d="m15 18-6-6 6-6" />,
  chevronDown: <Path d="m6 9 6 6 6-6" />,
  arrowLeft: (
    <>
      <Path d="m12 19-7-7 7-7" />
      <Path d="M19 12H5" />
    </>
  ),
  info: (
    <>
      <Circle cx="12" cy="12" r="10" />
      <Path d="M12 16v-4" />
      <Path d="M12 8h.01" />
    </>
  ),
  alert: (
    <>
      <Circle cx="12" cy="12" r="10" />
      <Line x1="12" x2="12" y1="8" y2="12" />
      <Line x1="12" x2="12.01" y1="16" y2="16" />
    </>
  ),
  trophy: (
    <>
      <Path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <Path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <Path d="M4 22h16" />
      <Path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <Path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <Path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </>
  ),
  medal: (
    <>
      <Path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <Path d="M11 12 5.12 2.2" />
      <Path d="m13 12 5.88-9.8" />
      <Path d="M8 7h8" />
      <Circle cx="12" cy="17" r="5" />
    </>
  ),
  flame: (
    <Path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  ),
  zap: (
    <Path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  ),
  lock: (
    <>
      <Rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  mail: (
    <>
      <Rect width="20" height="16" x="2" y="4" rx="2" />
      <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  eye: (
    <>
      <Path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <Circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <Path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <Path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <Path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <Path d="m2 2 20 20" />
    </>
  ),
  check: <Path d="M20 6 9 17l-5-5" />,
  checkCircle: (
    <>
      <Circle cx="12" cy="12" r="10" />
      <Path d="m9 12 2 2 4-4" />
    </>
  ),
  x: (
    <>
      <Path d="M18 6 6 18" />
      <Path d="m6 6 12 12" />
    </>
  ),
  xCircle: (
    <>
      <Circle cx="12" cy="12" r="10" />
      <Path d="m15 9-6 6" />
      <Path d="m9 9 6 6" />
    </>
  ),
  hourglass: (
    <>
      <Path d="M5 22h14" />
      <Path d="M5 2h14" />
      <Path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
      <Path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    </>
  ),
  logout: (
    <>
      <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <Polyline points="16 17 21 12 16 7" />
      <Line x1="21" x2="9" y1="12" y2="12" />
    </>
  ),
  refresh: (
    <>
      <Path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <Path d="M21 3v5h-5" />
      <Path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <Path d="M8 16H3v5" />
    </>
  ),
  wifiOff: (
    <>
      <Path d="M12 20h.01" />
      <Path d="M8.5 16.429a5 5 0 0 1 7 0" />
      <Path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
      <Path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
      <Path d="M2 8.82a15 15 0 0 1 4.177-2.643" />
      <Path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
      <Path d="m2 2 20 20" />
    </>
  ),
  history: (
    <>
      <Path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <Path d="M3 3v5h5" />
      <Path d="M12 7v5l4 2" />
    </>
  ),
  clipboard: (
    <>
      <Rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <Path d="m9 14 2 2 4-4" />
    </>
  ),
  graduation: (
    <>
      <Path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <Path d="M22 10v6" />
      <Path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </>
  ),
  sun: (
    <>
      <Circle cx="12" cy="12" r="4" />
      <Path d="M12 2v2" />
      <Path d="M12 20v2" />
      <Path d="m4.93 4.93 1.41 1.41" />
      <Path d="m17.66 17.66 1.41 1.41" />
      <Path d="M2 12h2" />
      <Path d="M20 12h2" />
      <Path d="m6.34 17.66-1.41 1.41" />
      <Path d="m19.07 4.93-1.41 1.41" />
    </>
  ),
  moon: <Path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  star: (
    <Path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  ),
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: IconSize | number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 'md', color, strokeWidth = 2 }: IconProps) {
  const theme = useTheme();
  const pixels = typeof size === 'number' ? size : theme.iconSize[size];

  return (
    <Svg
      width={pixels}
      height={pixels}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? theme.colors.text.primary}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round">
      {icons[name]}
    </Svg>
  );
}
