import type { LoginResponse } from '@/types/api';

import { api } from './api';

export const authService = {
  login: (data: { email: string; password: string }) => api.post<LoginResponse>('/auth/login', data),
};
