import bcrypt from 'bcrypt';

import * as userRepository from '../repositories/user.repository';
import { AppError } from '../errors/app-error';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'TEACHER' | 'ADMIN';
}

interface UpdateUserData {
  name?: string;
  email?: string;
  role?: 'TEACHER' | 'ADMIN';
}

function sanitizeUser(user: any) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function createUser(
  data: CreateUserData
) {
  const existingUser =
    await userRepository.findUserByEmail(
      data.email
    );

  if (existingUser) {
    throw new AppError(
      'Já existe um usuário com este email',
      409,
      'USER_ALREADY_EXISTS'
    );
  }

  const passwordHash =
    await bcrypt.hash(data.password, 12);

  const user =
    await userRepository.createUser({
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role,
    });

  return sanitizeUser(user);
}

export async function getUserById(id: string) {
  const user =
    await userRepository.findUserById(id);

  if (!user) {
    throw new AppError(
      'Usuário não encontrado',
      404,
      'USER_NOT_FOUND'
    );
  }

  return sanitizeUser(user);
}

export async function getAllUsers() {
  const users =
    await userRepository.findAllUsers();

  return users.map(sanitizeUser);
}

export async function updateUser(
  id: string,
  data: UpdateUserData
) {
  const existingUser =
    await userRepository.findUserById(id);

  if (!existingUser) {
    throw new AppError(
      'Usuário não encontrado',
      404,
      'USER_NOT_FOUND'
    );
  }

  if (
    data.email &&
    data.email !== existingUser.email
  ) {
    const userWithEmail =
      await userRepository.findUserByEmail(
        data.email
      );

    if (userWithEmail) {
      throw new AppError(
        'Já existe um usuário com este email',
        409,
        'USER_ALREADY_EXISTS'
      );
    }
  }

  const user = await userRepository.updateUser(
    id,
    data
  );

  return sanitizeUser(user);
}

export async function deleteUser(id: string) {
  const user =
    await userRepository.deleteUser(id);

  if (!user) {
    throw new AppError(
      'Usuário não encontrado',
      404,
      'USER_NOT_FOUND'
    );
  }
}