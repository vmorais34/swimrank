import * as z from 'zod';

export const createParticipantAchievementSchema = z
  .object({
    participantId: z
      .string()
      .min(1, 'participantId é obrigatório'),

    achievementId: z
      .string()
      .min(1, 'achievementId é obrigatório'),
  })
  .strict();