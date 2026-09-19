import { Router } from 'express';

import {
  createTraining,
  getTrainingById,
  getAllTrainings,
  updateTraining,
  deleteTraining,
} from '../controllers/training.controller';

const trainingRouter = Router();

trainingRouter.post('/', createTraining);
trainingRouter.get('/', getAllTrainings);
trainingRouter.get('/:id', getTrainingById);
trainingRouter.patch('/:id', updateTraining);
trainingRouter.delete('/:id', deleteTraining);

export default trainingRouter;