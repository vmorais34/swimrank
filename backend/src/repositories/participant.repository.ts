import { Participant } from '../models/Participant';

interface CreateParticipantData {
  name: string;
  birthdate: Date;
}

interface UpdateParticipantData {
  name?: string;
  birthdate?: Date;
}

export async function updateParticipant(
  id: string,
  data: UpdateParticipantData
) {
  return Participant.findByIdAndUpdate(
    id,
    data,
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
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

export async function findParticipantById(id: string) {
  return Participant.findById(id);
}

export async function findAllParticipants() {
  return Participant.find().sort({
    createdAt: -1,
  });
}

export async function createParticipant(
  data: CreateParticipantData
) {
  return Participant.create(data);
}

export async function deleteParticipant(id: string) {
  return Participant.findByIdAndDelete(id);
}