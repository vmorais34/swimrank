import { Router } from 'express';

import {
  createActivity,
  getActivityById,
  getAllActivities,
  getActivitiesByParticipant,
  updateActivity,
  deleteActivity,
} from '../controllers/activity.controller';

const activityRouter = Router();

activityRouter.post('/', createActivity);
activityRouter.get('/', getAllActivities);
activityRouter.get(
  '/participant/:participantId',
  getActivitiesByParticipant
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