import { CorsOptions } from 'cors';

/**
 * Origens liberadas por padrão quando CORS_ORIGINS não está definido
 * (Expo web em desenvolvimento).
 */
const DEFAULT_ORIGINS = ['http://localhost:8081', 'http://127.0.0.1:8081'];

/**
 * CORS_ORIGINS: lista separada por vírgula.
 * Ex.: CORS_ORIGINS=http://localhost:8081,https://swimrank.vercel.app
 */
function getAllowedOrigins(): string[] {
  const raw = process.env.CORS_ORIGINS;

  if (!raw) {
    return DEFAULT_ORIGINS;
  }

  return raw
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);
}

const allowedOrigins = getAllowedOrigins();

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Requisições sem Origin (app nativo, curl, health-check do Render) são liberadas.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Origem não permitida: responde sem os headers de CORS e o navegador bloqueia.
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
