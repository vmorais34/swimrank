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

/** "AAAA-MM-DD" → "DDMMAAAA" (para pré-preencher campos de data mascarados) */
export function isoToDigits(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}${month}${year}`;
}

/** "DDMMAAAA" → "DD/MM/AAAA" (máscara exibida nos campos de data) */
export function formatDateDigits(digits: string): string {
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  return [day, month, year].filter(Boolean).join('/');
}

/** Converte "DDMMAAAA" em "AAAA-MM-DD", validando dia/mês/ano; retorna null se inválida */
export function digitsToIsoDate(digits: string, options: { minYear?: number; maxDate?: Date } = {}): string | null {
  if (digits.length !== 8) return null;

  const day = Number(digits.slice(0, 2));
  const month = Number(digits.slice(2, 4));
  const year = Number(digits.slice(4, 8));

  if (month < 1 || month > 12) return null;
  if (options.minYear !== undefined && year < options.minYear) return null;

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return null;

  const date = new Date(year, month - 1, day);

  if (options.maxDate) {
    const max = new Date(options.maxDate);
    max.setHours(23, 59, 59, 999);
    if (date > max) return null;
  }

  return `${year}-${pad(month)}-${pad(day)}`;
}
