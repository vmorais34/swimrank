import type { AttendanceRankingEntry, DistanceRankingEntry, PointsRankingEntry } from '@/types/api';

import { api } from './api';

export const rankingService = {
  weekly: (date: string) => api.get<PointsRankingEntry[]>('/rankings/weekly', { date }),
  monthly: (date: string) => api.get<PointsRankingEntry[]>('/rankings/monthly', { date }),
  general: () => api.get<PointsRankingEntry[]>('/rankings/general'),
  weeklyDistance: (date: string) => api.get<DistanceRankingEntry[]>('/rankings/weekly/distance', { date }),
  weeklyAttendance: (date: string) => api.get<AttendanceRankingEntry[]>('/rankings/weekly/attendance', { date }),
};
