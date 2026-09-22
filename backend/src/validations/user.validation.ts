import * as z from 'zod';

export const createUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .max(
        100,
        'Nome deve ter no máximo 100 caracteres'
      ),

    email: z
      .email('Email inválido')
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(
        6,
        'Senha deve ter pelo menos 6 caracteres'
      )
      .max(
        100,
        'Senha deve ter no máximo 100 caracteres'
      ),

    role: z.enum(['TEACHER', 'ADMIN']),
  })
  .strict();

export const userIdSchema = z.object({
  id: z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    'ID do usuário inválido'
  ),
});

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .max(
        100,
        'Nome deve ter no máximo 100 caracteres'
      )
      .optional(),

    email: z
      .email('Email inválido')
      .trim()
      .toLowerCase()
      .optional(),

    role: z
      .enum(['TEACHER', 'ADMIN'])
      .optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message:
        'Informe pelo menos um campo para atualizar',
    }
  );