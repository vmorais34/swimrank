/**
 * Tipos das respostas do backend (backend/src/models + services).
 * Datas chegam como string ISO no JSON.
 */

export type ActivityStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type UserRole = 'TEACHER' | 'ADMIN';

export interface Participant {
  _id: string;
  name: string;
  birthdate: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  _id: string;
  participantId: string;
  date: string;
  type: string;
  /** metros */
  distance: number;
  /** segundos */
  time: number;
  points: number;
  status: ActivityStatus;
  validatedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Training {
  _id: string;
  date: string;
  type: string;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AchievementRequirementType =
  | 'FIRST_ACTIVITY'
  | 'TOTAL_DISTANCE'
  | 'RANKING_POSITION'
  | 'PARTICIPATION_MONTHS';

export interface Achievement {
  _id: string;
  name: string;
  description: string;
  category: string;
  requirement: {
    type: AchievementRequirementType;
    value: number;
  };
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface ParticipantAchievement {
  _id: string;
  participantId: string;
  /** Pode vir populado com a conquista, dependendo do endpoint */
  achievementId: string | Achievement;
  unlockedAt: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

interface RankingEntryBase {
  position: number;
  participantId: string;
  name: string;
}

export type PointsRankingEntry = RankingEntryBase & { points: number };
export type DistanceRankingEntry = RankingEntryBase & { distance: number };
export type AttendanceRankingEntry = RankingEntryBase & { attendance: number };

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiErrorBody {
  error: string;
  message: string;
  details?: { path?: (string | number)[]; message: string }[];
}
