import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, EmptyState, ErrorState, Header, IconBadge, InlineMessage, ListRow, LoadingState, Screen, type IconName } from '@/components/ui';
import { useSession } from '@/contexts/session-context';
import { useTheme } from '@/contexts/theme-context';
import { formatDateBR } from '@/lib/format';
import { ApiError, NetworkError } from '@/services/api';
import { achievementService } from '@/services/achievement.service';
import { participantAchievementService } from '@/services/participant-achievement.service';
import type { Achievement, AchievementRequirementType, ParticipantAchievement } from '@/types/api';

interface AchievementRows {
  unlocked: { achievement: Achievement; unlockedAt: string }[];
  locked: Achievement[];
}

const REQUIREMENT_ICON: Record<AchievementRequirementType, IconName> = {
  FIRST_ACTIVITY: 'waves',
  TOTAL_DISTANCE: 'route',
  RANKING_POSITION: 'trophy',
  PARTICIPATION_MONTHS: 'calendar',
};

function buildRows(all: Achievement[], unlockedEntries: ParticipantAchievement[]): AchievementRows {
  const unlocked = unlockedEntries
    .filter((entry): entry is ParticipantAchievement & { achievementId: Achievement } => typeof entry.achievementId !== 'string')
    .map((entry) => ({ achievement: entry.achievementId, unlockedAt: entry.unlockedAt }));

  const unlockedIds = new Set(unlocked.map((row) => row.achievement._id));
  const locked = all.filter((achievement) => !unlockedIds.has(achievement._id));

  return { unlocked, locked };
}

function requestErrorMessage(error: unknown): string {
  if (error instanceof NetworkError || error instanceof ApiError) return error.message;
  return 'Algo deu errado. Tente novamente.';
}

export default function AchievementsScreen() {
  const theme = useTheme();
  const { participant, status: sessionStatus } = useSession();

  const [rows, setRows] = useState<AchievementRows | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  function fetchAchievements(participantId: string): Promise<AchievementRows> {
    return Promise.all([achievementService.list(), participantAchievementService.listByParticipant(participantId)]).then(
      ([all, unlockedEntries]) => buildRows(all, unlockedEntries)
    );
  }

  function handleRetry() {
    if (!participant) return;
    setLoading(true);
    fetchAchievements(participant._id)
      .then((result) => {
        setRows(result);
        setError(null);
      })
      .catch((err) => setError(requestErrorMessage(err)))
      .finally(() => setLoading(false));
  }

  function handleRefresh() {
    if (!participant) return;
    setRefreshing(true);
    fetchAchievements(participant._id)
      .then((result) => {
        setRows(result);
        setError(null);
      })
      .catch((err) => setError(requestErrorMessage(err)))
      .finally(() => setRefreshing(false));
  }

  useEffect(() => {
    if (sessionStatus === 'ready' && !participant) {
      router.replace('/identify');
    }
  }, [sessionStatus, participant]);

  useEffect(() => {
    if (!participant) return;

    let active = true;

    fetchAchievements(participant._id)
      .then((result) => {
        if (active) {
          setRows(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) setError(requestErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participant?._id]);

  if (!participant) return null;

  return (
    <Screen refreshing={refreshing} onRefresh={handleRefresh}>
      <Header title="Conquistas" onBack={() => router.back()} />

      {loading ? (
        <LoadingState message="Carregando conquistas..." />
      ) : !rows ? (
        <ErrorState message={error ?? 'Algo deu errado.'} onRetry={handleRetry} />
      ) : (
        <>
          <View style={{ gap: theme.spacing[3] }}>
            <AppText variant="heading">Desbloqueadas ({rows.unlocked.length})</AppText>
            {rows.unlocked.length === 0 ? (
              <EmptyState icon="trophy" title="Nenhuma conquista ainda" description="Registre treinos e tenha atividades aprovadas para desbloquear conquistas." />
            ) : (
              rows.unlocked.map(({ achievement, unlockedAt }) => (
                <ListRow
                  key={achievement._id}
                  title={achievement.name}
                  subtitle={achievement.description}
                  left={
                    <IconBadge
                      name={REQUIREMENT_ICON[achievement.requirement.type]}
                      background={theme.colors.semantic.successBackground}
                      color={theme.colors.semantic.success}
                    />
                  }
                  right={
                    <View style={styles.rightColumn}>
                      <AppText variant="caption" color="secondary">
                        +{achievement.points} pts
                      </AppText>
                      <AppText variant="caption" color="tertiary">
                        {formatDateBR(unlockedAt)}
                      </AppText>
                    </View>
                  }
                />
              ))
            )}
          </View>

          <View style={{ gap: theme.spacing[3] }}>
            <AppText variant="heading">Bloqueadas ({rows.locked.length})</AppText>
            {rows.locked.length === 0 ? (
              <AppText color="secondary">Você desbloqueou todas as conquistas disponíveis!</AppText>
            ) : (
              rows.locked.map((achievement) => (
                <ListRow
                  key={achievement._id}
                  title={achievement.name}
                  subtitle={achievement.description}
                  left={
                    <IconBadge
                      name="lock"
                      background={theme.colors.background.tertiary}
                      color={theme.colors.text.disabled}
                    />
                  }
                  right={
                    <AppText variant="caption" color="tertiary">
                      +{achievement.points} pts
                    </AppText>
                  }
                />
              ))
            )}
          </View>

          {error && <InlineMessage tone="error" message={error} />}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  rightColumn: {
    alignItems: 'flex-end',
    gap: 2,
  },
});
