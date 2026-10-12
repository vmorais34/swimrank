import { isoDateUTC } from './date';

/** Formata metros como "850 m" ou "2.4 km" */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;

  const km = meters / 1000;
  return `${km.toFixed(km % 1 === 0 ? 0 : 1)} km`;
}

/** Formata segundos como "12:05" (mm:ss) */
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.round(totalSeconds);
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
}

/** "2026-09-29T00:00:00.000Z" → "29/09/2026" */
export function formatDateBR(value: string): string {
  const [year, month, day] = isoDateUTC(value).split('-');
  return `${day}/${month}/${year}`;
}

/**
Formata o ritmo de natação como "2:59/100m".
  @param time Tempo total em segundos.
  @param distance Distância total em metros.
*/
export function formatPace(time: number, distance: number): string {
if (distance <= 0 || time < 0) return '0:00/100m';

const secondsPer100m = Math.round((time / distance) * 100);
const minutes = Math.floor(secondsPer100m / 60);
const seconds = secondsPer100m % 60;

return `${minutes}:${String(seconds).padStart(2, '0')}/100m`;
}
