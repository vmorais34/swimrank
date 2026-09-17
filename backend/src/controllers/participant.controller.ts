import { Request, Response } from 'express';

import * as participantService from '../services/participant.service';
import { createParticipantSchema, participantIdSchema, updateParticipantSchema } from '../validations/participant.validation';

export async function getParticipantById(
  req: Request,
  res: Response
) {
  const result = participantIdSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID do participante inválido',
      details: result.error.issues,
    });
  }

  const participant =
    await participantService.getParticipantById(
      result.data.id
    );

  return res.status(200).json(participant);
}

export async function getAllParticipants(
  _req: Request,
  res: Response
) {
  const participants =
    await participantService.getAllParticipants();

  return res.status(200).json(participants);
}

export async function updateParticipant(
  req: Request,
  res: Response
) {
  const idResult = participantIdSchema.safeParse(
    req.params
  );

  if (!idResult.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID do participante inválido',
      details: idResult.error.issues,
    });
  }

  const bodyResult = updateParticipantSchema.safeParse(
    req.body
  );

  if (!bodyResult.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: bodyResult.error.issues,
    });
  }

  const participant =
    await participantService.updateParticipant(
      idResult.data.id,
      {
        ...(bodyResult.data.name !== undefined && {
          name: bodyResult.data.name,
        }),

        ...(bodyResult.data.birthdate !== undefined && {
          birthdate: new Date(
            bodyResult.data.birthdate
          ),
        }),
      }
    );

  return res.status(200).json(participant);
}

export async function createParticipant(
  req: Request,
  res: Response
) {
  const result = createParticipantSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: result.error.issues,
    });
  }

  const participant =
    await participantService.createParticipant({
      name: result.data.name,
      birthdate: new Date(result.data.birthdate),
    });

  return res.status(201).json(participant);
}

export async function deleteParticipant(
  req: Request,
  res: Response
) {
  const result = participantIdSchema.safeParse(
    req.params
  );

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID do participante inválido',
      details: result.error.issues,
    });
  }

  await participantService.deleteParticipant(
    result.data.id
  );

  return res.status(204).send();
}