function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/** YYYY-MM-DD da data local de hoje (para os parâmetros `date` das rankings) */
export function todayIso(): string {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** YYYY-MM-DD (UTC) de uma data — ISO string ou Date — vinda da API */
export function isoDateUTC(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

/** Segunda-feira (UTC) da semana de `referenceIso` — mesma regra do backend (activity/ranking .service.ts) */
export function weekStartIso(referenceIso: string): string {
  const date = new Date(`${referenceIso}T00:00:00.000Z`);
  const day = date.getUTCDay();
  const daysSinceMonday = day === 0 ? 6 : day - 1;
  date.setUTCDate(date.getUTCDate() - daysSinceMonday);
  return isoDateUTC(date);
}
