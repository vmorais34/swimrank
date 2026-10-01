import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, Card, EmptyState, ErrorState, Icon, IconBadge, InlineMessage, ListRow, LoadingState, Screen } from '@/components/ui';
import { useSession } from '@/contexts/session-context';
import { useTheme } from '@/contexts/theme-context';
import { isoDateUTC, todayIso, weekStartIso } from '@/lib/date';
import { formatDistance } from '@/lib/format';
import { activityService } from '@/services/activity.service';
import { ApiError, NetworkError } from '@/services/api';
import { participantAchievementService } from '@/services/participant-achievement.service';
import { participantService } from '@/services/participant.service';
import { trainingService } from '@/services/training.service';
import type { Participant, ParticipantAchievement, Training } from '@/types/api';

interface HomeData {
  participant: Participant;
  weeklyDistance: number;
  monthlyDistance: number;
  recentAchievements: ParticipantAchievement[];
  mainTraining: Training | null;
}

function requestErrorMessage(error: unknown): string {
  if (error instanceof NetworkError || error instanceof ApiError) return error.message;
  return 'Algo deu errado. Tente novamente.';
}

export default function HomeScreen() {
  const theme = useTheme();
  const { participant: sessionParticipant, status: sessionStatus, signIn } = useSession();

  const [data, setData] = useState<HomeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /** Busca os dados e atualiza `data`; quem chama controla os flags de loading/refreshing */
  function fetchHome(participantId: string): Promise<void> {
    return Promise.all([
      participantService.getById(participantId),
      activityService.listByParticipant(participantId),
      participantAchievementService.listByParticipant(participantId),
      trainingService.list(),
    ]).then(([participant, activities, achievements, trainings]) => {
      signIn(participant);

      const today = todayIso();
      const weekStart = weekStartIso(today);
      const monthKey = today.slice(0, 7);
      const approved = activities.filter((activity) => activity.status === 'APPROVED');

      const weeklyDistance = approved
        .filter((activity) => weekStartIso(isoDateUTC(activity.date)) === weekStart)
        .reduce((total, activity) => total + activity.distance, 0);

      const monthlyDistance = approved
        .filter((activity) => isoDateUTC(activity.date).slice(0, 7) === monthKey)
        .reduce((total, activity) => total + activity.distance, 0);

      const mainTraining =
        trainings.find((training) => training.isMain && isoDateUTC(training.date) === weekStart) ?? null;

      setData({
        participant,
        weeklyDistance,
        monthlyDistance,
        recentAchievements: achievements.slice(0, 3),
        mainTraining,
      });
    });
  }

  function handleRetry() {
    if (!sessionParticipant) return;
    setLoading(true);
    setError(null);
    fetchHome(sessionParticipant._id)
      .catch((err) => setError(requestErrorMessage(err)))
      .finally(() => setLoading(false));
  }

  function handleRefresh() {
    if (!sessionParticipant) return;
    setRefreshing(true);
    setError(null);
    fetchHome(sessionParticipant._id)
      .catch((err) => setError(requestErrorMessage(err)))
      .finally(() => setRefreshing(false));
  }

  useEffect(() => {
    if (sessionStatus === 'ready' && !sessionParticipant) {
      router.replace('/identify');
    }
  }, [sessionStatus, sessionParticipant]);

  useEffect(() => {
    if (!sessionParticipant) return;

    let active = true;

    fetchHome(sessionParticipant._id)
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
  }, [sessionParticipant?._id]);

  if (!sessionParticipant) return null;

  if (loading) {
    return (
      <Screen>
        <LoadingState message="Carregando seu painel..." />
      </Screen>
    );
  }

  if (!data) {
    return (
      <Screen>
        <ErrorState message={error ?? 'Algo deu errado.'} onRetry={handleRetry} />
      </Screen>
    );
  }

  const firstName = data.participant.name.split(' ')[0];

  return (
    <Screen
      refreshing={refreshing}
      onRefresh={handleRefresh}
      footer={<Button title="Registrar treino" icon="plus" onPress={() => router.push('/register')} />}>
      <View>
        <AppText variant="overline" color="secondary">
          Olá,
        </AppText>
        <AppText variant="title">{firstName}!</AppText>
      </View>

      <Card variant="highlight">
        <AppText variant="label" color="secondary">
          Seus pontos
        </AppText>
        <AppText variant="display">{data.participant.points}</AppText>
      </Card>

      <View style={styles.row}>
        <Card variant="hero" style={styles.statCard}>
          <Icon name="waves" color={theme.colors.hero.text} />
          <AppText variant="label" color={theme.colors.hero.textMuted}>
            Essa semana
          </AppText>
          <AppText variant="heading" color={theme.colors.hero.text}>
            {formatDistance(data.weeklyDistance)}
          </AppText>
        </Card>

        <Card variant="hero" style={styles.statCard}>
          <Icon name="route" color={theme.colors.hero.text} />
          <AppText variant="label" color={theme.colors.hero.textMuted}>
            Esse mês
          </AppText>
          <AppText variant="heading" color={theme.colors.hero.text}>
            {formatDistance(data.monthlyDistance)}
          </AppText>
        </Card>
      </View>

      <View style={{ gap: theme.spacing[3] }}>
        <AppText variant="heading">Treino principal da semana</AppText>
        {data.mainTraining ? (
          <ListRow
            title={data.mainTraining.type}
            subtitle="Só essa atividade pontua essa semana"
            left={<IconBadge name="waves" />}
          />
        ) : (
          <Card>
            <AppText color="secondary">Nenhum treino principal definido para esta semana.</AppText>
          </Card>
        )}
      </View>

      <View style={{ gap: theme.spacing[3] }}>
        <AppText variant="heading">Conquistas recentes</AppText>
        {data.recentAchievements.length === 0 ? (
          <EmptyState icon="trophy" title="Nenhuma conquista ainda" description="Registre treinos para desbloquear conquistas." />
        ) : (
          data.recentAchievements.map((entry) => {
            const achievement = typeof entry.achievementId === 'string' ? null : entry.achievementId;
            return (
              <ListRow
                key={entry._id}
                title={achievement?.name ?? 'Conquista'}
                subtitle={achievement?.description}
                left={<IconBadge name="medal" />}
              />
            );
          })
        )}
      </View>

      {error && <InlineMessage tone="error" message={error} />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    gap: 4,
  },
});
