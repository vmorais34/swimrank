import * as participantRepository from '../repositories/participant.repository';
import { AppError } from '../errors/app-error';

interface CreateParticipantData {
  name: string;
  birthdate: Date;
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