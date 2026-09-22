import { Router } from 'express';

import {
  createActivity,
  getActivityById,
  getAllActivities,
  getActivitiesByParticipant,
  updateActivity,
  deleteActivity,
  validateActivity,
} from '../controllers/activity.controller';

const activityRouter = Router();

activityRouter.post('/', createActivity);
activityRouter.get('/', getAllActivities);
activityRouter.get(
  '/participant/:participantId',
  getActivitiesByParticipant
);

activityRouter.patch(
  '/:id/validation',
  validateActivity
);

activityRouter.get('/:id', getActivityById);

activityRouter.patch(
  '/:id',
  updateActivity
);

activityRouter.delete(
  '/:id',
  deleteActivity
);

export default activityRouter;