import { Router } from 'express';

import {
  createActivity,
  getAllActivities,
  getActivitiesByParticipant,
  getActivityById,
  updateActivity,
  deleteActivity,
  validateActivity,
} from '../controllers/activity.controller';

import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';

const activityRouter = Router();

activityRouter.post('/', createActivity);

activityRouter.get('/', getAllActivities);

activityRouter.get(
  '/participant/:participantId',
  getActivitiesByParticipant
);

activityRouter.patch(
  '/:id/validation',
  authenticate,
  authorize('TEACHER', 'ADMIN'),
  validateActivity
);

activityRouter.get('/:id', getActivityById);

activityRouter.patch('/:id', updateActivity);

activityRouter.delete('/:id', deleteActivity);

export default activityRouter;