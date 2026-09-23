import { Request, Response } from 'express';

import * as achievementService
  from '../services/achievement.service';

import {
  createAchievementSchema,
  updateAchievementSchema,
} from '../validations/achievement.validation';

import type {
  IdParams,
  ParticipantIdParams,
} from '../types/route-params';

export async function createAchievement(
  req: Request,
  res: Response
) {
  const result =
    createAchievementSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: result.error.issues,
    });
  }

  const achievement =
    await achievementService.createAchievement(
      result.data
    );

  return res.status(201).json(achievement);
}

export async function getAllAchievements(
  _req: Request,
  res: Response
) {
  const achievements =
    await achievementService.getAllAchievements();

  return res.status(200).json(achievements);
}

export async function getAchievementById(
  req: Request<IdParams>,
  res: Response
) {
  const achievement =
    await achievementService.getAchievementById(
      req.params.id
    );

  return res.status(200).json(achievement);
}

export async function updateAchievement(
  req: Request<IdParams>,
  res: Response
) {
  const result =
    updateAchievementSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: result.error.issues,
    });
  }

  const achievement =
    await achievementService.updateAchievement(
      req.params.id,
      result.data
    );

  return res.status(200).json(achievement);
}

export async function deleteAchievement(
  req: Request<IdParams>,
  res: Response
) {
  await achievementService.deleteAchievement(
    req.params.id
  );

  return res.status(204).send();
}