import * as z from 'zod';

const requirementSchema = z
  .object({
    type: z
      .string()
      .trim()
      .min(1, 'Tipo da regra é obrigatório'),

    value: z
      .number()
      .min(0, 'Valor da regra não pode ser negativo'),
  })
  .strict();

export const createAchievementSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Nome deve possuir pelo menos 2 caracteres')
      .max(100),

    description: z
      .string()
      .trim()
      .min(1, 'Descrição é obrigatória')
      .max(500),

    category: z
      .string()
      .trim()
      .min(1, 'Categoria é obrigatória')
      .max(50),

    requirement: requirementSchema,

    points: z
      .number()
      .min(0, 'Pontos não podem ser negativos'),
  })
  .strict();

export const updateAchievementSchema =
  createAchievementSchema.partial();