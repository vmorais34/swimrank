import * as achievementRepository from '../repositories/achievement.repository';
import { AppError } from '../errors/app-error';

interface CreateAchievementData {
  name: string;
  description: string;
  category: string;
  requirement: {
    type: string;
    value: number;
  };
  points: number;
}

interface UpdateAchievementData {
  name?: string;
  description?: string;
  category?: string;
  requirement?: {
    type: string;
    value: number;
  };
  points?: number;
}

export async function createAchievement(
  data: CreateAchievementData
) {
  return achievementRepository.createAchievement(data);
}

export async function getAllAchievements() {
  return achievementRepository.findAllAchievements();
}

export async function getAchievementById(
  id: string
) {
  const achievement =
    await achievementRepository.findAchievementById(id);

  if (!achievement) {
    throw new AppError(
      'Conquista não encontrada',
      404,
      'ACHIEVEMENT_NOT_FOUND'
    );
  }

  return achievement;
}

export async function updateAchievement(
  id: string,
  data: UpdateAchievementData
) {
  const achievement =
    await achievementRepository.findAchievementById(id);

  if (!achievement) {
    throw new AppError(
      'Conquista não encontrada',
      404,
      'ACHIEVEMENT_NOT_FOUND'
    );
  }

  return achievementRepository.updateAchievement(
    id,
    data
  );
}

export async function deleteAchievement(
  id: string
) {
  const achievement =
    await achievementRepository.findAchievementById(id);

  if (!achievement) {
    throw new AppError(
      'Conquista não encontrada',
      404,
      'ACHIEVEMENT_NOT_FOUND'
    );
  }

  return achievementRepository.deleteAchievement(id);
}