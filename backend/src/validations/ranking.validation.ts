import * as z from 'zod';

export const rankingQuerySchema = z.object({
  date: z.iso.date('Data inválida'),
});