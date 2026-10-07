import type { Training } from '@/types/api';

import { api } from './api';

export const trainingService = {
  list: () => api.get<Training[]>('/trainings'),

  /** `date` precisa ser a segunda-feira da semana (YYYY-MM-DD) — o backend casa o treino principal pela data exata */
  create: (data: { date: string; type: string; isMain: boolean }) => api.post<Training>('/trainings', data),
};
