import { Request, Response } from 'express';

import * as participantAchievementService
  from '../services/participant-achievement.service';

import {
  createParticipantAchievementSchema,
} from '../validations/participant-achievement.validation';

import type {
  IdParams,
  ParticipantIdParams,
} from '../types/route-params';

export async function createParticipantAchievement(
  req: Request,
  res: Response
) {
  const result =
    createParticipantAchievementSchema.safeParse(
      req.body
    );

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: result.error.issues,
    });
  }

  const participantAchievement =
    await participantAchievementService
      .createParticipantAchievement(result.data);

  return res.status(201).json(
    participantAchievement
  );
}

export async function getParticipantAchievements(
  req: Request<ParticipantIdParams>,
  res: Response
) {
  const achievements =
    await participantAchievementService
      .getParticipantAchievements(
        req.params.participantId
      );

  return res.status(200).json(achievements);
}

export async function getAllParticipantAchievements(
  _req: Request,
  res: Response
) {
  const achievements =
    await participantAchievementService
      .getAllParticipantAchievements();

  return res.status(200).json(achievements);
}

export async function getParticipantAchievementById(
  req: Request<IdParams>,
  res: Response
) {
  const achievement =
    await participantAchievementService
      .getParticipantAchievementById(
        req.params.id
      );

  return res.status(200).json(achievement);
}