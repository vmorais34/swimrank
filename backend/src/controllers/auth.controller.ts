import { Request, Response } from 'express';

import * as authService from '../services/auth.service';

import {
  loginSchema,
} from '../validations/auth.validation';

export async function login(
  req: Request,
  res: Response
) {
  const result =
    loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: result.error.issues,
    });
  }

  const resultLogin =
    await authService.login({
      email: result.data.email,
      password: result.data.password,
    });

  return res.status(200).json(resultLogin);
}