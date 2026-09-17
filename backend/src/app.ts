import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import { connectDatabase } from './config/database';

const app = express();

app.use(express.json());

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