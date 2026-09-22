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