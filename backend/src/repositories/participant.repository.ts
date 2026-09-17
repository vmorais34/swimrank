import { Participant } from '../models/Participant';

interface CreateParticipantData {
  name: string;
  birthdate: Date;
}

export async function findParticipantByNameAndBirthdate(
  name: string,
  birthdate: Date
) {
  return Participant.findOne({
    name,
    birthdate,
  });
}

export async function createParticipant(
  data: CreateParticipantData
) {
  return Participant.create(data);
}