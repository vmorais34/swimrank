export type AchievementRequirementType =
  | 'FIRST_ACTIVITY'
  | 'TOTAL_DISTANCE'
  | 'RANKING_POSITION'
  | 'PARTICIPATION_MONTHS';

export interface AchievementRequirement {
  type: AchievementRequirementType;
  value: number;
}