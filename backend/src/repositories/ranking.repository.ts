import { Activity } from '../models/Activity';
import { ParticipantAchievement } from '../models/ParticipantAchievement';

interface DateRange {
  startDate: Date;
  endDate: Date;
}

/**
 * Ranking por pontos = pontos das atividades aprovadas (pela data da atividade)
 * + pontos das conquistas desbloqueadas (pela data de desbloqueio), no período.
 * Sem período, considera tudo (ranking geral).
 */
function findPointsRanking(range?: DateRange) {
  const period = range
    ? { $gte: range.startDate, $lt: range.endDate }
    : undefined;

  return Activity.aggregate([
    {
      $match: {
        status: 'APPROVED',
        points: {
          $gt: 0,
        },
        ...(period && { date: period }),
      },
    },
    {
      $project: {
        participantId: 1,
        points: 1,
      },
    },
    {
      $unionWith: {
        coll: ParticipantAchievement.collection.name,
        pipeline: [
          {
            $match: {
              points: {
                $gt: 0,
              },
              ...(period && { unlockedAt: period }),
            },
          },
          {
            $project: {
              participantId: 1,
              points: 1,
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: '$participantId',
        points: {
          $sum: '$points',
        },
      },
    },
    {
      $lookup: {
        from: 'participants',
        localField: '_id',
        foreignField: '_id',
        as: 'participant',
      },
    },
    {
      $unwind: '$participant',
    },
    {
      $project: {
        _id: 0,
        participantId: '$_id',
        name: '$participant.name',
        points: 1,
      },
    },
    {
      $sort: {
        points: -1,
        name: 1,
      },
    },
  ]);
}

//semanal
export async function findWeeklyRanking(
  startDate: Date,
  endDate: Date
) {
  return findPointsRanking({ startDate, endDate });
}

//mensal
export async function findMonthlyRanking(
  startDate: Date,
  endDate: Date
) {
  return findPointsRanking({ startDate, endDate });
}

//Geral
export async function findGeneralRanking() {
  return findPointsRanking();
}

// Distance
export async function findWeeklyDistanceRanking(
  startDate: Date,
  endDate: Date
) {
  return Activity.aggregate([
    {
      $match: {
        date: {
          $gte: startDate,
          $lt: endDate,
        },
        status: 'APPROVED',
      },
    },
    {
      $group: {
        _id: '$participantId',
        distance: {
          $sum: '$distance',
        },
      },
    },
    {
      $lookup: {
        from: 'participants',
        localField: '_id',
        foreignField: '_id',
        as: 'participant',
      },
    },
    {
      $unwind: '$participant',
    },
    {
      $project: {
        _id: 0,
        participantId: '$_id',
        name: '$participant.name',
        distance: 1,
      },
    },
    {
      $sort: {
        distance: -1,
        name: 1,
      },
    },
  ]);
}

// Presence
export async function findWeeklyAttendanceRanking(
  startDate: Date,
  endDate: Date
) {
  return Activity.aggregate([
    {
      $match: {
        date: {
          $gte: startDate,
          $lt: endDate,
        },
        status: 'APPROVED',
      },
    },
    {
      $group: {
        _id: '$participantId',
        attendance: {
          $sum: 1,
        },
      },
    },
    {
      $lookup: {
        from: 'participants',
        localField: '_id',
        foreignField: '_id',
        as: 'participant',
      },
    },
    {
      $unwind: '$participant',
    },
    {
      $project: {
        _id: 0,
        participantId: '$_id',
        name: '$participant.name',
        attendance: 1,
      },
    },
    {
      $sort: {
        attendance: -1,
        name: 1,
      },
    },
  ]);
}