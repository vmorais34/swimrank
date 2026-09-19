import * as trainingRepository from '../repositories/training.repository';
import { AppError } from '../errors/app-error';

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
  if (data.isMain) {
    const existingMain =
      await trainingRepository.findMainTrainingByDate(
        data.date
      );

    if (existingMain) {
      throw new AppError(
        'Já existe um treinamento principal para esta semana',
        409,
        'MAIN_TRAINING_ALREADY_EXISTS'
      );
    }
  }

  return trainingRepository.createTraining(data);
}

export async function getAllTrainings() {
  return trainingRepository.findAllTrainings();
}

export async function updateTraining(
  id: string,
  data: UpdateTrainingData
) {
  const existingTraining =
    await trainingRepository.findTrainingById(id);

  if (!existingTraining) {
    throw new AppError(
      'Treinamento não encontrado',
      404,
      'TRAINING_NOT_FOUND'
    );
  }

  const finalDate =
    data.date ?? existingTraining.date;

  const finalIsMain =
    data.isMain ?? existingTraining.isMain;

  if (finalIsMain) {
    const existingMain =
      await trainingRepository.findMainTrainingByDate(
        finalDate
      );

    if (
      existingMain &&
      existingMain._id.toString() !== id
    ) {
      throw new AppError(
        'Já existe um treinamento principal para esta semana',
        409,
        'MAIN_TRAINING_ALREADY_EXISTS'
      );
    }
  }

  const updatedTraining =
    await trainingRepository.updateTraining(
      id,
      data
    );

  return updatedTraining;
}

export async function deleteTraining(
  id: string
) {
  const training =
    await trainingRepository.deleteTraining(id);

  if (!training) {
    throw new AppError(
      'Treinamento não encontrado',
      404,
      'TRAINING_NOT_FOUND'
    );
  }
}


export async function getTrainingById(id: string) {
  const training =
    await trainingRepository.findTrainingById(id);

  if (!training) {
    throw new AppError(
      'Treinamento não encontrado',
      404,
      'TRAINING_NOT_FOUND'
    );
  }

  return training;
}
