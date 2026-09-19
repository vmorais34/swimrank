import * as z from 'zod';

export const createTrainingSchema = z
  .object({
    date: z.iso.date(
      'Data do treinamento inválida'
    ),

    type: z
      .string()
      .trim()
      .min(1, 'Tipo do treinamento é obrigatório')
      .max(
        50,
        'Tipo do treinamento deve ter no máximo 50 caracteres'
      ),

    isMain: z.boolean(),
  })
  .strict();

export const trainingIdSchema = z.object({
  id: z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    'ID do treinamento inválido'
  ),
});

export const updateTrainingSchema = z
  .object({
    date: z
      .iso.date('Data do treinamento inválida')
      .optional(),

    type: z
      .string()
      .trim()
      .min(1, 'Tipo do treinamento é obrigatório')
      .max(
        50,
        'Tipo do treinamento deve ter no máximo 50 caracteres'
      )
      .optional(),

    isMain: z.boolean().optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message:
        'Informe pelo menos um campo para atualizar',
    }
  );