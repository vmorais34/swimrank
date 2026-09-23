import { Router } from 'express';

import {
  createParticipantAchievement,
  getParticipantAchievements,
  getAllParticipantAchievements,
  getParticipantAchievementById,
} from '../controllers/participant-achievement.controller';

import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';

import type { IdParams, ParticipantIdParams } from '../types/route-params';

const participantAchievementRouter =
  Router();

participantAchievementRouter.post(
  '/',
  authenticate,
  authorize('TEACHER', 'ADMIN'),
  createParticipantAchievement
);

participantAchievementRouter.get(
  '/',
  authenticate,
  authorize('TEACHER', 'ADMIN'),
  getAllParticipantAchievements
);

participantAchievementRouter.get<ParticipantIdParams>(
  '/participant/:participantId',
  getParticipantAchievements
);

participantAchievementRouter.get<IdParams>(
  '/:id',
  getParticipantAchievementById
);
export default participantAchievementRouter;