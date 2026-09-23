import * as participantAchievementRepository from '../repositories/participant-achievement.repository';
import * as participantRepository from '../repositories/participant.repository';
import * as achievementRepository from '../repositories/achievement.repository';

import { AppError } from '../errors/app-error';

interface CreateParticipantAchievementData {
  participantId: string;
  achievementId: string;
}

export async function createParticipantAchievement(
  data: CreateParticipantAchievementData
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

  const achievement =
    await achievementRepository.findAchievementById(
      data.achievementId
    );

  if (!achievement) {
    throw new AppError(
      'Conquista não encontrada',
      404,
      'ACHIEVEMENT_NOT_FOUND'
    );
  }

  const existing =
    await participantAchievementRepository
      .findByParticipantAndAchievement(
        data.participantId,
        data.achievementId
      );

  if (existing) {
    throw new AppError(
      'O participante já possui esta conquista',
      409,
      'ACHIEVEMENT_ALREADY_UNLOCKED'
    );
  }

  return participantAchievementRepository
    .createParticipantAchievement({
      participantId: data.participantId,
      achievementId: data.achievementId,
      unlockedAt: new Date(),
      points: achievement.points,
    });
}

export async function getParticipantAchievements(
  participantId: string
) {
  const participant =
    await participantRepository.findParticipantById(
      participantId
    );

  if (!participant) {
    throw new AppError(
      'Participante não encontrado',
      404,
      'PARTICIPANT_NOT_FOUND'
    );
  }

  return participantAchievementRepository
    .findParticipantAchievements(participantId);
}

export async function getAllParticipantAchievements() {
  return participantAchievementRepository
    .findAllParticipantAchievements();
}

export async function getParticipantAchievementById(
  id: string
) {
  const achievement =
    await participantAchievementRepository
      .findParticipantAchievementById(id);

  if (!achievement) {
    throw new AppError(
      'Conquista do participante não encontrada',
      404,
      'PARTICIPANT_ACHIEVEMENT_NOT_FOUND'
    );
  }

  return achievement;
}