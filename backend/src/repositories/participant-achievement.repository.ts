import { ParticipantAchievement } from '../models/ParticipantAchievement';

interface CreateParticipantAchievementData {
  participantId: string;
  achievementId: string;
  unlockedAt: Date;
  points: number;
}

export async function createParticipantAchievement(
  data: CreateParticipantAchievementData
) {
  return ParticipantAchievement.create(data);
}

export async function findParticipantAchievementById(
  id: string
) {
  return ParticipantAchievement.findById(id)
    .populate('achievementId')
    .populate('participantId');
}

export async function findParticipantAchievements(
  participantId: string
) {
  return ParticipantAchievement.find({
    participantId,
  })
    .populate('achievementId')
    .sort({
      unlockedAt: -1,
    });
}

export async function findByParticipantAndAchievement(
  participantId: string,
  achievementId: string
) {
  return ParticipantAchievement.findOne({
    participantId,
    achievementId,
  });
}

export async function findAllParticipantAchievements() {
  return ParticipantAchievement.find()
    .populate('achievementId')
    .populate('participantId')
    .sort({
      unlockedAt: -1,
    });
}