import type { ParticipantAchievement } from '@/types/api';

import { api } from './api';

export const participantAchievementService = {
  listByParticipant: (participantId: string) =>
    api.get<ParticipantAchievement[]>(`/participant-achievements/participant/${participantId}`),
};
