import { Achievement } from '../models/Achievement';

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
  return Achievement.create(data);
}

export async function findAllAchievements() {
  return Achievement.find().sort({
    category: 1,
    points: 1,
  });
}

export async function findAchievementById(
  id: string
) {
  return Achievement.findById(id);
}

export async function updateAchievement(
  id: string,
  data: UpdateAchievementData
) {
  return Achievement.findByIdAndUpdate(
    id,
    data,
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
}

export async function deleteAchievement(
  id: string
) {
  return Achievement.findByIdAndDelete(id);
}