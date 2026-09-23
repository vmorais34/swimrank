import { Request, Response } from 'express';

import * as rankingService from '../services/ranking.service';

import { rankingQuerySchema } from '../validations/ranking.validation';

export async function getWeeklyRanking(
  req: Request,
  res: Response
) {
  const result =
    rankingQuerySchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: result.error.issues,
    });
  }

  const ranking =
    await rankingService.getWeeklyRanking(
      new Date(`${result.data.date}T00:00:00.000Z`)
    );

  return res.status(200).json(ranking);
}


export async function getMonthlyRanking(
  req: Request,
  res: Response
) {
  const result =
    rankingQuerySchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: result.error.issues,
    });
  }

  const ranking =
    await rankingService.getMonthlyRanking(
      new Date(`${result.data.date}T00:00:00.000Z`)
    );

  return res.status(200).json(ranking);
}

export async function getGeneralRanking(
  _req: Request,
  res: Response
) {
  const ranking =
    await rankingService.getGeneralRanking();

  return res.status(200).json(ranking);
}