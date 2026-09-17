import * as participantRepository from '../repositories/participant.repository';
import { AppError } from '../errors/app-error';

interface CreateParticipantData {
  name: string;
  birthdate: Date;
}

interface UpdateParticipantData {
  name?: string;
  birthdate?: Date;
}


export async function getParticipantById(id: string) {
  const participant =
    await participantRepository.findParticipantById(id);

  if (!participant) {
    throw new AppError(
      'Participante não encontrado',
      404,
      'PARTICIPANT_NOT_FOUND'
    );
  }

  return participant;
}

export async function getAllParticipants() {
  return participantRepository.findAllParticipants();
}

export async function updateParticipant(
  id: string,
  data: UpdateParticipantData
) {
  const participant =
    await participantRepository.updateParticipant(
      id,
      data
    );

  if (!participant) {
    throw new AppError(
      'Participante não encontrado',
      404,
      'PARTICIPANT_NOT_FOUND'
    );
  }

  return participant;
}

export async function createParticipant(
  data: CreateParticipantData
) {
  const existingParticipant =
    await participantRepository.findParticipantByNameAndBirthdate(
      data.name,
      data.birthdate
    );

  if (existingParticipant) {
    throw new AppError(
      'Participante já cadastrado',
      409,
      'PARTICIPANT_ALREADY_EXISTS'
    );
  }
  
  // Teste de duplicidade no banco de dados, para simular uma condição de corrida
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return participantRepository.createParticipant(data);
}

export async function deleteParticipant(id: string) {
  const participant =
    await participantRepository.deleteParticipant(id);

  if (!participant) {
    throw new AppError(
      'Participante não encontrado',
      404,
      'PARTICIPANT_NOT_FOUND'
    );
  }
}