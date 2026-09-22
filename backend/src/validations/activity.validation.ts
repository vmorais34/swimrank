import * as z from 'zod';

export const createActivitySchema = z
  .object({
    participantId: z
      .string()
      .regex(
        /^[0-9a-fA-F]{24}$/,
        'ID do participante inválido'
      ),

    date: z.iso.date(
      'Data da atividade inválida'
    ),

    type: z
      .string()
      .trim()
      .min(1, 'Tipo da atividade é obrigatório')
      .max(
        50,
        'Tipo da atividade deve ter no máximo 50 caracteres'
      ),

    distance: z
      .number()
      .positive(
        'Distância deve ser maior que zero'
      ),

    time: z
      .number()
      .positive(
        'Tempo deve ser maior que zero'
      ),
  })
  .strict();

export const activityIdSchema = z.object({
  id: z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    'ID da atividade inválido'
  ),
});

export const participantIdSchema = z.object({
  participantId: z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    'ID do participante inválido'
  ),
});


export const updateActivitySchema = z
  .object({
    date: z
      .iso.date('Data da atividade inválida')
      .optional(),

    type: z
      .string()
      .trim()
      .min(1, 'Tipo da atividade é obrigatório')
      .max(
        50,
        'Tipo da atividade deve ter no máximo 50 caracteres'
      )
      .optional(),

    distance: z
      .number()
      .positive(
        'Distância deve ser maior que zero'
      )
      .optional(),

    time: z
      .number()
      .positive(
        'Tempo deve ser maior que zero'
      )
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

  export const validateActivitySchema = z
  .object({
    status: z.enum(
      ['APPROVED', 'REJECTED'],
      {
        message:
          'Status deve ser APPROVED ou REJECTED',
      }
    ),
  })
  .strict();