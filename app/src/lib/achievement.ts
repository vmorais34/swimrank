import type { IconName } from '@/components/ui';
import { storage, StorageKeys } from '@/lib/storage';
import type { Achievement, AchievementRequirementType, ParticipantAchievement } from '@/types/api';

export const REQUIREMENT_ICON: Record<AchievementRequirementType, IconName> = {
  FIRST_ACTIVITY: 'waves',
  TOTAL_DISTANCE: 'route',
  RANKING_POSITION: 'trophy',
  PARTICIPATION_MONTHS: 'calendar',
};

export type UnlockedAchievement = ParticipantAchievement & { achievementId: Achievement };

/** Mantém só as entradas com a conquista populada (o endpoint do participante já popula `achievementId`) */
export function populatedAchievements(entries: ParticipantAchievement[]): UnlockedAchievement[] {
  return entries.filter((entry): entry is UnlockedAchievement => typeof entry.achievementId !== 'string');
}

/** IDs das conquistas que o participante já viu no popup da Home, por participante */
type SeenAchievements = Record<string, string[]>;

/** Conquistas desbloqueadas que ainda não foram mostradas no popup da Home */
export async function findUnseenAchievements(participantId: string, entries: UnlockedAchievement[]): Promise<UnlockedAchievement[]> {
  const seen = (await storage.get<SeenAchievements>(StorageKeys.seenAchievements)) ?? {};
  const seenIds = new Set(seen[participantId] ?? []);
  return entries.filter((entry) => !seenIds.has(entry._id));
}

export async function markAchievementsSeen(participantId: string, entries: UnlockedAchievement[]): Promise<void> {
  const seen = (await storage.get<SeenAchievements>(StorageKeys.seenAchievements)) ?? {};
  const ids = new Set([...(seen[participantId] ?? []), ...entries.map((entry) => entry._id)]);
  await storage.set(StorageKeys.seenAchievements, { ...seen, [participantId]: [...ids] });
}
