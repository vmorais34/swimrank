import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { AppError } from '../errors/app-error';

type Role = 'TEACHER' | 'ADMIN';

export function authorize(
  ...allowedRoles: Role[]
) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new AppError(
        'Usuário não autenticado',
        401,
        'AUTHENTICATION_REQUIRED'
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError(
        'Usuário não possui permissão para esta ação',
        403,
        'FORBIDDEN'
      );
    }

    next();
  };
}