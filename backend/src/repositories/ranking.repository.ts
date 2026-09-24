import { Activity } from '../models/Activity';

//semanal
export async function findWeeklyRanking(
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
        points: {
          $gt: 0,
        },
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

//mensal
export async function findMonthlyRanking(
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
        points: {
          $gt: 0,
        },
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

//Geral
export async function findGeneralRanking() {
  return Activity.aggregate([
    {
      $match: {
        status: 'APPROVED',
        points: {
          $gt: 0,
        },
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