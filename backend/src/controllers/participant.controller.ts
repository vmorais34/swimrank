import { Request, Response } from 'express';

import * as participantService from '../services/participant.service';
import { createParticipantSchema } from '../validations/participant.validation';

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