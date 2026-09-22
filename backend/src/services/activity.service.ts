import * as activityRepository from '../repositories/activity.repository';
import * as participantRepository from '../repositories/participant.repository';
import { AppError } from '../errors/app-error';

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

  return activityRepository.validateActivity(
    id,
    {
      status: data.status,
      validatedAt: new Date(),
    }
  );
}