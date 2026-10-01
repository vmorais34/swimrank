/** Formata metros como "850 m" ou "2.4 km" */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;

  const km = meters / 1000;
  return `${km.toFixed(km % 1 === 0 ? 0 : 1)} km`;
}
