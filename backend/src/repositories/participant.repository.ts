import { Participant } from '../models/Participant';

interface CreateParticipantData {
  name: string;
  birthdate: Date;
}

interface ListParticipantsFilter {
  birthdate?: Date;
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

export async function findAllParticipants(
  filter: ListParticipantsFilter = {}
) {
  const query: Record<string, unknown> = {};

  // Compara o dia inteiro (UTC) para não depender do horário salvo na data
  if (filter.birthdate) {
    const start = filter.birthdate;
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

    query.birthdate = { $gte: start, $lt: end };
  }

  return Participant.find(query).sort({
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