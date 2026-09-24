import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Wrapper JSON sobre o AsyncStorage (no web usa localStorage).
 * Falhas de leitura/escrita nunca derrubam o app: retornam null / são ignoradas.
 */

export const StorageKeys = {
  participant: '@swimrank/participant',
  teacherSession: '@swimrank/teacher-session',
  themePreference: '@swimrank/theme-preference',
} as const;

type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];

async function get<T>(key: StorageKey): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

async function set<T>(key: StorageKey, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // armazenamento indisponível (ex.: navegação privada) — segue sem persistir
  }
}

async function remove(key: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // ignora
  }
}

export const storage = { get, set, remove };
