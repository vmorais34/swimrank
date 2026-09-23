import * as activityRepository from '../repositories/activity.repository';
import * as participantRepository from '../repositories/participant.repository';
import * as trainingRepository from '../repositories/training.repository';
import { AppError } from '../errors/app-error';

import { calculateActivityPoints } from './scoring.service';
import { evaluateAchievementsForParticipant } from './achievement-engine.service';

interface CreateActivityData {
  participantId: string;
  date: Date;
  type: string;
  distance: number;
  time: number;
}

interface UpdateActivityData {
  date?: Date;
  type?: string;
  distance?: number;
  time?: number;
}

interface ValidateActivityData {
  status: 'APPROVED' | 'REJECTED';
}

// Função para calcular o início da semana (segunda-feira) a partir de uma data
function getWeekStart(date: Date) {
  const weekStart = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    )
  );

  const day = weekStart.getUTCDay();

  const daysSinceMonday = day === 0 ? 6 : day - 1;

  weekStart.setUTCDate(
    weekStart.getUTCDate() - daysSinceMonday
  );

  return weekStart;
}

// Valida participante antes de criar
export async function createActivity(
  data: CreateActivityData
) {
  const participant =
    await participantRepository.findParticipantById(
      data.participantId
    );

  if (!participant) {
    throw new AppError(
      'Participante não encontrado',
      404,
      'PARTICIPANT_NOT_FOUND'
    );
  }

  return activityRepository.createActivity(data);
}

export async function getActivityById(
  id: string
) {
  const activity =
    await activityRepository.findActivityById(id);

  if (!activity) {
    throw new AppError(
      'Atividade não encontrada',
      404,
      'ACTIVITY_NOT_FOUND'
    );
  }

  return activity;
}

export async function getAllActivities() {
  return activityRepository.findAllActivities();
}

export async function getActivitiesByParticipant(
  participantId: string
) {
  return activityRepository.findActivitiesByParticipant(
    participantId
  );
}

export async function updateActivity(
  id: string,
  data: UpdateActivityData
) {
  const existingActivity =
    await activityRepository.findActivityById(id);

  if (!existingActivity) {
    throw new AppError(
      'Atividade não encontrada',
      404,
      'ACTIVITY_NOT_FOUND'
    );
  }

  return activityRepository.updateActivity(
    id,
    data
  );
}

export async function deleteActivity(id: string) {
  const activity =
    await activityRepository.deleteActivity(id);

  if (!activity) {
    throw new AppError(
      'Atividade não encontrada',
      404,
      'ACTIVITY_NOT_FOUND'
    );
  }
}

export async function validateActivity(
  id: string,
  data: ValidateActivityData
) {
  const existingActivity =
    await activityRepository.findActivityById(id);

  if (!existingActivity) {
    throw new AppError(
      'Atividade não encontrada',
      404,
      'ACTIVITY_NOT_FOUND'
    );
  }

  if (existingActivity.status !== 'PENDING') {
    throw new AppError(
      'A atividade já foi validada',
      409,
      'ACTIVITY_ALREADY_VALIDATED'
    );
  }

  let points = 0;

  if (data.status === 'APPROVED') {
    const weekStart = getWeekStart(
      existingActivity.date
    );

    const mainTraining =
      await trainingRepository.findMainTrainingByDate(
        weekStart
      );

    if (
      mainTraining &&
      existingActivity.type === mainTraining.type
    ) {
      const weekEnd = new Date(weekStart);

      weekEnd.setUTCDate(
        weekEnd.getUTCDate() + 7
      );

      const existingScoredActivity =
        await activityRepository
          .findApprovedMainActivityByDateRange(
            existingActivity.participantId.toString(),
            weekStart,
            weekEnd
          );

      if (existingScoredActivity) {
        throw new AppError(
          'O participante já possui uma atividade principal aprovada nesta semana',
          409,
          'MAIN_ACTIVITY_ALREADY_APPROVED'
        );
      }

      points = calculateActivityPoints(
        existingActivity.time
      );
    }
  }

  const activity =
    await activityRepository.validateActivity(
      id,
      {
        status: data.status,
        points,
        validatedAt: new Date(),
      }
    );

  if (
    data.status === 'APPROVED' &&
    activity
  ) {
    await evaluateAchievementsForParticipant(
      existingActivity.participantId.toString()
    );
  }

  return activity;
}