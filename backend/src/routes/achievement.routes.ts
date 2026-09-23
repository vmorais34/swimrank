import { Router } from 'express';

import {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievement.controller';

import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';

import type { IdParams } from '../types/route-params';

const achievementRouter = Router();

achievementRouter.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  createAchievement
);

achievementRouter.get(
  '/',
  getAllAchievements
);

achievementRouter.get(
  '/:id',
  getAchievementById
);

achievementRouter.patch<IdParams>(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  updateAchievement
);

achievementRouter.delete<IdParams>(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  deleteAchievement
);

export default achievementRouter;