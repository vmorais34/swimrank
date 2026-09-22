import * as z from 'zod';

export const loginSchema = z
  .object({
    email: z
      .email('Email inválido')
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(1, 'Senha é obrigatória'),
  })
  .strict();