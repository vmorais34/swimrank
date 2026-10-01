import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { storage, StorageKeys } from '@/lib/storage';
import type { Participant } from '@/types/api';

type SessionStatus = 'loading' | 'ready';

interface SessionContextValue {
  participant: Participant | null;
  status: SessionStatus;
  signIn: (participant: Participant) => void;
  signOut: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

/** Sessão do participante (V1 sem autenticação): persiste em AsyncStorage e recupera no startup */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [status, setStatus] = useState<SessionStatus>('loading');

  useEffect(() => {
    storage.get<Participant>(StorageKeys.participant).then((saved) => {
      setParticipant(saved);
      setStatus('ready');
    });
  }, []);

  const signIn = (next: Participant) => {
    setParticipant(next);
    storage.set(StorageKeys.participant, next);
  };

  const signOut = () => {
    setParticipant(null);
    storage.remove(StorageKeys.participant);
  };

  const value = useMemo(() => ({ participant, status, signIn, signOut }), [participant, status]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession deve ser usado dentro de <SessionProvider>');
  }

  return context;
}
