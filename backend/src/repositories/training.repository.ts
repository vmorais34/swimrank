import { Training } from '../models/Training';

interface CreateTrainingData {
  date: Date;
  type: string;
  isMain: boolean;
}

interface UpdateTrainingData {
  date?: Date;
  type?: string;
  isMain?: boolean;
}

export async function createTraining(
  data: CreateTrainingData
) {
  return Training.create(data);
}

export async function findTrainingById(
  id: string
) {
  return Training.findById(id);
}

export async function findAllTrainings() {
  return Training.find().sort({
    date: -1,
  });
}

export async function updateTraining(
  id: string,
  data: UpdateTrainingData
) {
  return Training.findByIdAndUpdate(
    id,
    data,
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
}

export async function deleteTraining(
  id: string
) {
  return Training.findByIdAndDelete(id);
}

export async function findMainTrainingByDate(
  date: Date
) {
  return Training.findOne({
    date,
    isMain: true,
  });
}