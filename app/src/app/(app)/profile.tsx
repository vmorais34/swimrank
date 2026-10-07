import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import { AppText, Button, EmptyState, ErrorState, Header, IconBadge, InlineMessage, ListRow, LoadingState, Screen, StatusBadge } from '@/components/ui';
import { useSession } from '@/contexts/session-context';
import { useTheme } from '@/contexts/theme-context';
import { populatedAchievements, REQUIREMENT_ICON, type UnlockedAchievement } from '@/lib/achievement';
import { formatDateBR, formatDistance, formatDuration } from '@/lib/format';
import { activityService } from '@/services/activity.service';
import { ApiError, NetworkError } from '@/services/api';
import { participantAchievementService } from '@/services/participant-achievement.service';
import type { Activity } from '@/types/api';
import { StyleSheet, View } from 'react-native';

function requestErrorMessage(error: unknown): string {
  if (error instanceof NetworkError || error instanceof ApiError) return error.message;
  return 'Algo deu errado. Tente novamente.';
}

export default function ProfileScreen() {
  const theme = useTheme();
  const { participant, status: sessionStatus, signOut } = useSession();

  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [recentAchievements, setRecentAchievements] = useState<UnlockedAchievement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  function fetchHistory(participantId: string): Promise<void> {
    return Promise.all([
      activityService.listByParticipant(participantId),
      participantAchievementService.listByParticipant(participantId),
    ]).then(([activityList, achievements]) => {
      setActivities(activityList);
      setRecentAchievements(populatedAchievements(achievements).slice(0, 3));
    });
  }

  function handleLogout() {
    signOut();
    router.replace('/identify');
  }

  function handleRetry() {
    if (!participant) return;
    setLoading(true);
    setError(null);
    fetchHistory(participant._id)
      .catch((err) => setError(requestErrorMessage(err)))
      .finally(() => setLoading(false));
  }

  function handleRefresh() {
    if (!participant) return;
    setRefreshing(true);
    setError(null);
    fetchHistory(participant._id)
      .catch((err) => setError(requestErrorMessage(err)))
      .finally(() => setRefreshing(false));
  }

  useEffect(() => {
    if (sessionStatus === 'ready' && !participant) {
      router.replace('/identify');
    }
  }, [sessionStatus, participant]);

  useFocusEffect(
    useCallback(() => {
      if (!participant) return;

      let active = true;

      fetchHistory(participant._id)
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
    }, [participant?._id]),
  );

  const latestActivity = activities?.reduce<Activity | null>((latest, activity) => {
    if (!latest) return activity;

    return new Date(activity.date) > new Date(latest.date)
      ? activity
      : latest;
  }, null);

  if (!participant) return null;

  return (
    <Screen refreshing={refreshing} onRefresh={handleRefresh}>
      <Header title="Perfil" onBack={() => router.back()} />
      <View style={styles.row}>
        <AppText variant="overline" color="secondary">
          Bem-vindo, {participant.name.split(' ')[0]}!
        </AppText>
        <Button title="Logout" size="sm" fullWidth={false} onPress={handleLogout} />
      </View>


      {loading ? (
        <LoadingState message="Carregando seu perfil" />
      ) : !activities ? (
        <ErrorState message={error ?? 'Algo deu errado.'} onRetry={handleRetry} />
      ) : activities.length === 0 ? (
        <EmptyState icon="history" title="Nenhuma atividade registrada" description="Registre um treino para começar seu histórico." />
      ) : (
        latestActivity && (
          <>
            <AppText variant="body">Confira sua última atividade:</AppText>
            <ListRow
              key={latestActivity._id}
              title={formatDateBR(latestActivity.date)}
              subtitle={`${latestActivity.type} • ${formatDistance(latestActivity.distance)} • ${formatDuration(latestActivity.time)}`}
              right={<StatusBadge status={latestActivity.status} />}
            />
          </>
        )
      )}

      {!loading && activities && (
        <View style={{ gap: theme.spacing[3] }}>
          <View style={styles.sectionHeader}>
            <AppText variant="heading">Conquistas recentes</AppText>
            <Button title="Ver todas" variant="ghost" size="sm" fullWidth={false} onPress={() => router.push('/achievements')} />
          </View>
          {recentAchievements.length === 0 ? (
            <EmptyState icon="trophy" title="Nenhuma conquista ainda" description="Registre treinos para desbloquear conquistas." />
          ) : (
            recentAchievements.map((entry) => (
              <ListRow
                key={entry._id}
                title={entry.achievementId.name}
                subtitle={entry.achievementId.description}
                left={
                  <IconBadge
                    name={REQUIREMENT_ICON[entry.achievementId.requirement.type]}
                    background={theme.colors.semantic.successBackground}
                    color={theme.colors.semantic.success}
                  />
                }
              />
            ))
          )}
        </View>
      )}

      {error && activities && <InlineMessage tone="error" message={error} />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});