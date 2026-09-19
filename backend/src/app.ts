import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import { connectDatabase } from './config/database';

import participantRouter from './routes/participant.routes';
import trainingRouter from './routes/training.routes';

import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json());
app.use('/participants', participantRouter);
app.use('/trainings', trainingRouter);
app.use(errorHandler);

app.get('/health', (_req, res) => {
  const databaseStatus =
    mongoose.connection.readyState === 1
      ? 'connected'
      : 'disconnected';

  const status = databaseStatus === 'connected'
    ? 'ok'
    : 'error';

  res.status(status === 'ok' ? 200 : 503).json({
    status,
    service: 'swimrank-api',
    database: databaseStatus,
  });
});

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`API rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
    process.exit(1);
  }
}

startServer();