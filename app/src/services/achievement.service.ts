import type { Achievement } from '@/types/api';

import { api } from './api';

export const achievementService = {
  list: () => api.get<Achievement[]>('/achievements'),
};
