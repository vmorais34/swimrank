import type { Participant } from '@/types/api';

import { api } from './api';

export const participantService = {
  /** Busca participantes por data de nascimento (YYYY-MM-DD) — usado no login */
  findByBirthdate: (birthdate: string) => api.get<Participant[]>('/participants', { birthdate }),

  create: (data: { name: string; birthdate: string }) => api.post<Participant>('/participants', data),

  getById: (id: string) => api.get<Participant>(`/participants/${id}`),
};
