import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { storage, StorageKeys } from '@/lib/storage';
import { createTheme, type Theme } from '@/theme';

export type ThemePreference = 'system' | 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>('system');

  useEffect(() => {
    storage.get<ThemePreference>(StorageKeys.themePreference).then((saved) => {
      if (saved) setPreferenceState(saved);
    });
  }, []);

  const setPreference = (next: ThemePreference) => {
    setPreferenceState(next);
    storage.set(StorageKeys.themePreference, next);
  };

  const scheme = preference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : preference;

  const value = useMemo(
    () => ({ theme: createTheme(scheme), preference, setPreference }),
    [scheme, preference]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme deve ser usado dentro de <AppThemeProvider>');
  }

  return context;
}

/** Atalho para o objeto de tema */
export function useTheme() {
  return useAppTheme().theme;
}
