import * as z from 'zod';

export const participantIdSchema = z.object({
  id: z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    'ID do participante inválido'
  ),
});

export const createParticipantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),

  birthdate: z
    .iso.date('Data de nascimento inválida'),
})
.strict();

export const updateParticipantSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .max(100, 'Nome deve ter no máximo 100 caracteres')
      .optional(),

    birthdate: z
      .iso.date('Data de nascimento inválida')
      .optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: 'Informe pelo menos um campo para atualizar',
    }
  );