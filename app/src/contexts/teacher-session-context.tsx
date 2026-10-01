import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { storage, StorageKeys } from '@/lib/storage';
import type { LoginResponse } from '@/types/api';

type TeacherSessionStatus = 'loading' | 'ready';

interface TeacherSessionContextValue {
  session: LoginResponse | null;
  status: TeacherSessionStatus;
  signIn: (session: LoginResponse) => void;
  signOut: () => void;
}

const TeacherSessionContext = createContext<TeacherSessionContextValue | null>(null);

/** Sessão do professor/admin (JWT): persiste em AsyncStorage e recupera no startup */
export function TeacherSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<LoginResponse | null>(null);
  const [status, setStatus] = useState<TeacherSessionStatus>('loading');

  useEffect(() => {
    storage.get<LoginResponse>(StorageKeys.teacherSession).then((saved) => {
      setSession(saved);
      setStatus('ready');
    });
  }, []);

  const signIn = (next: LoginResponse) => {
    setSession(next);
    storage.set(StorageKeys.teacherSession, next);
  };

  const signOut = () => {
    setSession(null);
    storage.remove(StorageKeys.teacherSession);
  };

  const value = useMemo(() => ({ session, status, signIn, signOut }), [session, status]);

  return <TeacherSessionContext.Provider value={value}>{children}</TeacherSessionContext.Provider>;
}

export function useTeacherSession() {
  const context = useContext(TeacherSessionContext);

  if (!context) {
    throw new Error('useTeacherSession deve ser usado dentro de <TeacherSessionProvider>');
  }

  return context;
}
