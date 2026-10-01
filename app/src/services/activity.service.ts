import type { Activity } from '@/types/api';

import { api } from './api';

export const activityService = {
  listByParticipant: (participantId: string) => api.get<Activity[]>(`/activities/participant/${participantId}`),
};
