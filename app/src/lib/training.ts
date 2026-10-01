import type { Training } from '@/types/api';

import { isoDateUTC } from './date';

/** Treino principal (`isMain`) cuja semana é `weekStart` (YYYY-MM-DD, segunda-feira) */
export function findMainTraining(trainings: Training[], weekStart: string): Training | null {
  return trainings.find((training) => training.isMain && isoDateUTC(training.date) === weekStart) ?? null;
}
