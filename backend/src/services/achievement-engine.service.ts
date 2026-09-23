import * as achievementRepository
  from '../repositories/achievement.repository';

import * as participantAchievementRepository
  from '../repositories/participant-achievement.repository';

import * as activityRepository
  from '../repositories/activity.repository';

async function unlockAchievement(
  participantId: string,
  achievementId: string,
  points: number
) {
  const existing =
    await participantAchievementRepository
      .findByParticipantAndAchievement(
        participantId,
        achievementId
      );

  if (existing) {
    return null;
  }

  return participantAchievementRepository
    .createParticipantAchievement({
      participantId,
      achievementId,
      unlockedAt: new Date(),
      points,
    });
}

async function evaluateFirstActivity(
  participantId: string
) {
  const approvedActivities =
    await activityRepository
      .countApprovedActivitiesByParticipant(
        participantId
      );

  if (approvedActivities < 1) {
    return;
  }

  const achievements =
    await achievementRepository
      .findAchievementsByRequirementType(
        'FIRST_ACTIVITY'
      );

  for (const achievement of achievements) {
    if (
      approvedActivities >=
      achievement.requirement.value
    ) {
      await unlockAchievement(
        participantId,
        achievement._id.toString(),
        achievement.points
      );
    }
  }
}

async function evaluateTotalDistance(participantId: string) {
  const totalDistance =
    await activityRepository.getApprovedDistanceByParticipant(
      participantId
    );

  const achievements =
    await achievementRepository.findAchievementsByRequirementType(
      'TOTAL_DISTANCE'
    );

  for (const achievement of achievements) {
    if (
      totalDistance >=
      achievement.requirement.value
    ) {
      await unlockAchievement(
        participantId,
        achievement._id.toString(),
        achievement.points
      );
    }
  }
}

export async function evaluateAchievementsForParticipant(
  participantId: string
) {
  await evaluateFirstActivity(
    participantId
  );

  await evaluateTotalDistance(
    participantId
  );
}