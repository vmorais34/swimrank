import { Request, Response } from 'express';

import * as trainingService from '../services/training.service';
import {
  createTrainingSchema,
  trainingIdSchema,
  updateTrainingSchema,
} from '../validations/training.validation';

export async function createTraining(
  req: Request,
  res: Response
) {
  const result = createTrainingSchema.safeParse(
    req.body
  );

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: result.error.issues,
    });
  }

  const training =
    await trainingService.createTraining({
      date: new Date(result.data.date),
      type: result.data.type,
      isMain: result.data.isMain,
    });

  return res.status(201).json(training);
}

export async function getTrainingById(
  req: Request,
  res: Response
) {
  const result = trainingIdSchema.safeParse(
    req.params
  );

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID do treinamento inválido',
      details: result.error.issues,
    });
  }

  const training =
    await trainingService.getTrainingById(
      result.data.id
    );

  return res.status(200).json(training);
}

export async function getAllTrainings(
  _req: Request,
  res: Response
) {
  const trainings =
    await trainingService.getAllTrainings();

  return res.status(200).json(trainings);
}

export async function updateTraining(
  req: Request,
  res: Response
) {
  const idResult = trainingIdSchema.safeParse(
    req.params
  );

  if (!idResult.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID do treinamento inválido',
      details: idResult.error.issues,
    });
  }

  const bodyResult =
    updateTrainingSchema.safeParse(req.body);

  if (!bodyResult.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: bodyResult.error.issues,
    });
  }

  const training =
    await trainingService.updateTraining(
      idResult.data.id,
      {
        ...(bodyResult.data.date !== undefined && {
          date: new Date(bodyResult.data.date),
        }),

        ...(bodyResult.data.type !== undefined && {
          type: bodyResult.data.type,
        }),

        ...(bodyResult.data.isMain !== undefined && {
          isMain: bodyResult.data.isMain,
        }),
      }
    );

  return res.status(200).json(training);
}

export async function deleteTraining(
  req: Request,
  res: Response
) {
  const result = trainingIdSchema.safeParse(
    req.params
  );

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID do treinamento inválido',
      details: result.error.issues,
    });
  }

  await trainingService.deleteTraining(
    result.data.id
  );

  return res.status(204).send();
}