import express from 'express';

const app = express();

const PORT = 3000;

app.get('/', (_req, res) => {
  res.json({
    message: 'SwimRank API is running'
  });
});

app.listen(PORT, () => {
  console.log(`SwimRank API running on http://localhost:${PORT}`);
});