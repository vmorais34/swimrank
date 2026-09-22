import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as userRepository from '../repositories/user.repository';
import { AppError } from '../errors/app-error';

interface LoginData {
  email: string;
  password: string;
}

interface JwtPayload {
  userId: string;
  role: 'TEACHER' | 'ADMIN';
}

export async function login(data: LoginData) {
  const user =
    await userRepository.findUserByEmail(
      data.email
    );

  if (!user) {
    throw new AppError(
      'Email ou senha inválidos',
      401,
      'INVALID_CREDENTIALS'
    );
  }

  const passwordMatches =
    await bcrypt.compare(
      data.password,
      user.passwordHash
    );

  if (!passwordMatches) {
    throw new AppError(
      'Email ou senha inválidos',
      401,
      'INVALID_CREDENTIALS'
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

  const payload: JwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const token = jwt.sign(
    payload,
    jwtSecret,
    {
      expiresIn: '8h',
    }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}