import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'swimrank-api',
  });
});

app.listen(PORT, () => {
  console.log(`SwimRank API running on http://localhost:${PORT}`);
});