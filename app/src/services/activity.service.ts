import type { Activity } from '@/types/api';

import { api } from './api';

export const activityService = {
  listByParticipant: (participantId: string) => api.get<Activity[]>(`/activities/participant/${participantId}`),

  listAll: () => api.get<Activity[]>('/activities'),

  create: (data: { participantId: string; date: string; type: string; distance: number; time: number }) =>
    api.post<Activity>('/activities', data),

  validate: (id: string, status: 'APPROVED' | 'REJECTED', token: string) =>
    api.patch<Activity>(`/activities/${id}/validation`, { status }, token),
};
