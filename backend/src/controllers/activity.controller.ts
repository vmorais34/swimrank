import { Request, Response } from 'express';

import * as activityService from '../services/activity.service';

import {
  createActivitySchema,
  activityIdSchema,
  participantIdSchema,
  updateActivitySchema,
} from '../validations/activity.validation';

export async function createActivity(
  req: Request,
  res: Response
) {
  const result =
    createActivitySchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: result.error.issues,
    });
  }

  const activity =
    await activityService.createActivity({
      participantId: result.data.participantId,
      date: new Date(result.data.date),
      type: result.data.type,
      distance: result.data.distance,
      time: result.data.time,
    });

  return res.status(201).json(activity);
}

export async function getActivityById(
  req: Request,
  res: Response
) {
  const result =
    activityIdSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID da atividade inválido',
      details: result.error.issues,
    });
  }

  const activity =
    await activityService.getActivityById(
      result.data.id
    );

  return res.status(200).json(activity);
}

export async function getAllActivities(
  _req: Request,
  res: Response
) {
  const activities =
    await activityService.getAllActivities();

  return res.status(200).json(activities);
}

export async function getActivitiesByParticipant(
  req: Request,
  res: Response
) {
  const result =
    participantIdSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID do participante inválido',
      details: result.error.issues,
    });
  }

  const activities =
    await activityService.getActivitiesByParticipant(
      result.data.participantId
    );

  return res.status(200).json(activities);
}

export async function updateActivity(
  req: Request,
  res: Response
) {
  const idResult =
    activityIdSchema.safeParse(req.params);

  if (!idResult.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID da atividade inválido',
      details: idResult.error.issues,
    });
  }

  const bodyResult =
    updateActivitySchema.safeParse(req.body);

  if (!bodyResult.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: bodyResult.error.issues,
    });
  }

  const activity =
    await activityService.updateActivity(
      idResult.data.id,
      {
        ...(bodyResult.data.date !== undefined && {
          date: new Date(bodyResult.data.date),
        }),

        ...(bodyResult.data.type !== undefined && {
          type: bodyResult.data.type,
        }),

        ...(bodyResult.data.distance !== undefined && {
          distance: bodyResult.data.distance,
        }),

        ...(bodyResult.data.time !== undefined && {
          time: bodyResult.data.time,
        }),
      }
    );

  return res.status(200).json(activity);
}

export async function deleteActivity(
  req: Request,
  res: Response
) {
  const result =
    activityIdSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID da atividade inválido',
      details: result.error.issues,
    });
  }

  await activityService.deleteActivity(
    result.data.id
  );

  return res.status(204).send();
}