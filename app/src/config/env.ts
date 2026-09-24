/**
 * Variáveis de ambiente públicas (prefixo EXPO_PUBLIC_ são embutidas no bundle).
 * Configure em app/.env — veja app/.env.example.
 *
 * Atenção: em dispositivo físico / emulador Android, "localhost" aponta para o
 * próprio aparelho. Use o IP da sua máquina na rede (ex.: http://192.168.0.10:3000).
 */
const DEFAULT_API_URL = 'http://localhost:3000';

export const env = {
  apiUrl: (process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_API_URL).replace(/\/+$/, ''),
  apiTimeoutMs: Number(process.env.EXPO_PUBLIC_API_TIMEOUT_MS ?? 15000),
} as const;
