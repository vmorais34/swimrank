import 'dotenv/config';
import mongoose from 'mongoose';

import { Participant } from '../models/Participant';
import { recalculateParticipantPoints } from '../services/activity.service';

async function recalculatePoints() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI não configurado');
  }

  await mongoose.connect(mongoUri);

  console.log('Conectado ao MongoDB');

  const participants = await Participant.find();

  for (const participant of participants) {
    const updated = await recalculateParticipantPoints(
      participant._id.toString()
    );

    console.log(
      `${participant.name}: ${participant.points} -> ${updated?.points}`
    );
  }

  console.log(
    `Pontos recalculados para ${participants.length} participante(s).`
  );

  await mongoose.disconnect();
}

recalculatePoints().catch(async (error) => {
  console.error('Erro ao recalcular pontos:', error);

  await mongoose.disconnect();

  process.exit(1);
});
