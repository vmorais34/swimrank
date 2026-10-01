import { env } from '@/config/env';
import type { ApiErrorBody } from '@/types/api';

/** Erro retornado pela API (4xx/5xx com corpo `{ error, message, details? }`) */
export class ApiError extends Error {
  code: string;
  status: number;
  details?: ApiErrorBody['details'];

  constructor(status: number, body: ApiErrorBody) {
    super(body.message);
    this.name = 'ApiError';
    this.status = status;
    this.code = body.error;
    this.details = body.details;
  }
}

/** Falha de rede: servidor inalcançável, offline ou timeout */
export class NetworkError extends Error {
  constructor(message = 'Não foi possível conectar ao servidor. Verifique sua conexão.') {
    super(message);
    this.name = 'NetworkError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  query?: Record<string, string | undefined>;
  token?: string;
}

function buildUrl(path: string, query?: Record<string, string | undefined>): string {
  const url = new URL(env.apiUrl + path);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, value);
    }
  }

  return url.toString();
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), env.apiTimeoutMs);

  let response: Response;
  try {
    response = await fetch(buildUrl(path, options.query), {
      method: options.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.token && { Authorization: `Bearer ${options.token}` }),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new NetworkError('O servidor demorou para responder. Tente novamente.');
    }
    throw new NetworkError();
  } finally {
    clearTimeout(timeoutId);
  }

  if (response.status === 204) return undefined as T;

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(response.status, json ?? { error: 'UNKNOWN_ERROR', message: 'Erro inesperado. Tente novamente.' });
  }

  return json as T;
}

export const api = {
  get: <T>(path: string, query?: Record<string, string | undefined>) => request<T>(path, { query }),
  post: <T>(path: string, body?: unknown, token?: string) => request<T>(path, { method: 'POST', body, token }),
  patch: <T>(path: string, body?: unknown, token?: string) => request<T>(path, { method: 'PATCH', body, token }),
};
