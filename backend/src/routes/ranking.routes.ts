import { Router } from 'express';

import {
  getWeeklyRanking,
  getMonthlyRanking,
  getGeneralRanking,
  getWeeklyDistanceRanking,
  getWeeklyAttendanceRanking,
} from '../controllers/ranking.controller';

const rankingRouter = Router();

rankingRouter.get(
  '/weekly',
  getWeeklyRanking
);

rankingRouter.get(
  '/weekly/distance',
  getWeeklyDistanceRanking
);

rankingRouter.get(
  '/weekly/attendance',
  getWeeklyAttendanceRanking
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