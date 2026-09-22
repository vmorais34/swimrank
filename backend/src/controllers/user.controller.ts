import { Request, Response } from 'express';

import * as userService from '../services/user.service';

import {
  createUserSchema,
  userIdSchema,
  updateUserSchema,
} from '../validations/user.validation';

export async function createUser(
  req: Request,
  res: Response
) {
  const result =
    createUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: result.error.issues,
    });
  }

  const user =
    await userService.createUser({
      name: result.data.name,
      email: result.data.email,
      password: result.data.password,
      role: result.data.role,
    });

  return res.status(201).json(user);
}

export async function getUserById(
  req: Request,
  res: Response
) {
  const result =
    userIdSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID do usuário inválido',
      details: result.error.issues,
    });
  }

  const user =
    await userService.getUserById(
      result.data.id
    );

  return res.status(200).json(user);
}

export async function getAllUsers(
  _req: Request,
  res: Response
) {
  const users =
    await userService.getAllUsers();

  return res.status(200).json(users);
}

export async function updateUser(
  req: Request,
  res: Response
) {
  const idResult =
    userIdSchema.safeParse(req.params);

  if (!idResult.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID do usuário inválido',
      details: idResult.error.issues,
    });
  }

  const bodyResult =
    updateUserSchema.safeParse(req.body);

  if (!bodyResult.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: bodyResult.error.issues,
    });
  }

  const user =
    await userService.updateUser(
      idResult.data.id,
      bodyResult.data
    );

  return res.status(200).json(user);
}

export async function deleteUser(
  req: Request,
  res: Response
) {
  const result =
    userIdSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'ID do usuário inválido',
      details: result.error.issues,
    });
  }

  await userService.deleteUser(
    result.data.id
  );

  return res.status(204).send();
}