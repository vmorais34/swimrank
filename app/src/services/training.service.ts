import type { Training } from '@/types/api';

import { api } from './api';

export const trainingService = {
  list: () => api.get<Training[]>('/trainings'),
};
