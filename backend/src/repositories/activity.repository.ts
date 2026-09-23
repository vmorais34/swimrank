import { Activity } from '../models/Activity';

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
  points: number;
  validatedAt: Date;
}

export async function createActivity(
  data: CreateActivityData
) {
  return Activity.create(data);
}

export async function findActivityById(
  id: string
) {
  return Activity.findById(id);
}

export async function findAllActivities() {
  return Activity.find().sort({
    date: -1,
  });
}

export async function findActivitiesByParticipant(
  participantId: string
) {
  return Activity.find({
    participantId,
  }).sort({
    date: -1,
  });
}

export async function updateActivity(
  id: string,
  data: UpdateActivityData
) {
  return Activity.findByIdAndUpdate(
    id,
    data,
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
}

export async function deleteActivity(id: string) {
  return Activity.findByIdAndDelete(id);
}

export async function validateActivity(
  id: string,
  data: ValidateActivityData
) {
  return Activity.findByIdAndUpdate(
    id,
    data,
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
}

export async function findApprovedMainActivityByDateRange(
  participantId: string,
  startDate: Date,
  endDate: Date
) {
  return Activity.findOne({
    participantId,
    date: {
      $gte: startDate,
      $lt: endDate,
    },
    status: 'APPROVED',
    points: { $gt: 0 },
  });
}