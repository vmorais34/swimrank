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
