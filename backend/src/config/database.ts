import mongoose from 'mongoose';
import { Participant } from '../models/Participant';

export async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI não definida');
  }

  await mongoose.connect(mongoUri);
  
  await Participant.syncIndexes();

  console.log('MongoDB conectado');
}