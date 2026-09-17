import * as z from 'zod';

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