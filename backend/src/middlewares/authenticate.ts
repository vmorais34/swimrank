import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { AppError } from '../errors/app-error';

export interface JwtPayload {
  userId: string;
  role: 'TEACHER' | 'ADMIN';
}

export function authenticate(
  req: Request<any>,
  _res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError(
      'Token de autenticação não informado',
      401,
      'AUTHENTICATION_REQUIRED'
    );
  }

  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new AppError(
      'Formato do token inválido',
      401,
      'INVALID_TOKEN'
    );
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new AppError(
      'JWT_SECRET não configurado',
      500,
      'JWT_SECRET_NOT_CONFIGURED'
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      jwtSecret
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch {
    throw new AppError(
      'Token inválido ou expirado',
      401,
      'INVALID_TOKEN'
    );
  }
}