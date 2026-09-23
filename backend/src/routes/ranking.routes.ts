import { Router } from 'express';

import {
  getWeeklyRanking,
  getMonthlyRanking,
  getGeneralRanking,
} from '../controllers/ranking.controller';

const rankingRouter = Router();

rankingRouter.get(
  '/weekly',
  getWeeklyRanking
);

rankingRouter.get(
  '/monthly',
  getMonthlyRanking
);

rankingRouter.get(
  '/general',
  getGeneralRanking
);

export default rankingRouter;