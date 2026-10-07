import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NewAchievementsModal } from '@/components/new-achievements-modal';
import { AppText, Button, Card, ErrorState, Icon, IconBadge, InlineMessage, ListRow, LoadingState, Screen } from '@/components/ui';
import { useSession } from '@/contexts/session-context';
import { useTheme } from '@/contexts/theme-context';
import { findUnseenAchievements, markAchievementsSeen, populatedAchievements, type UnlockedAchievement } from '@/lib/achievement';
import { isoDateUTC, todayIso, weekStartIso } from '@/lib/date';
import { formatDistance } from '@/lib/format';
import { findMainTraining } from '@/lib/training';
import { activityService } from '@/services/activity.service';
import { ApiError, NetworkError } from '@/services/api';
import { participantAchievementService } from '@/services/participant-achievement.service';
import { participantService } from '@/services/participant.service';
import { rankingService } from '@/services/ranking.service';
import { trainingService } from '@/services/training.service';
import type { Participant, PointsRankingEntry, Training } from '@/types/api';

interface HomeData {
  participant: Participant;
  weeklyDistance: number;
  monthlyDistance: number;
  /** null quando o participante ainda não pontuou na semana */
  weeklyRanking: PointsRankingEntry | null;
  weeklyRankingTotal: number;
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
  const [newAchievements, setNewAchievements] = useState<UnlockedAchievement[]>([]);

  /** Busca os dados e atualiza `data`; quem chama controla os flags de loading/refreshing */
  function fetchHome(participantId: string): Promise<void> {
    return Promise.all([
      participantService.getById(participantId),
      activityService.listByParticipant(participantId),
      participantAchievementService.listByParticipant(participantId),
      trainingService.list(),
      rankingService.weekly(todayIso()),
    ]).then(async ([participant, activities, achievements, trainings, weeklyRanking]) => {
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

      const mainTraining = findMainTraining(trainings, weekStart);

      setData({
        participant,
        weeklyDistance,
        monthlyDistance,
        weeklyRanking: weeklyRanking.find((entry) => entry.participantId === participant._id) ?? null,
        weeklyRankingTotal: weeklyRanking.length,
        mainTraining,
      });

      const unseen = await findUnseenAchievements(participant._id, populatedAchievements(achievements));
      if (unseen.length > 0) setNewAchievements(unseen);
    });
  }

  function dismissNewAchievements(): Promise<void> {
    const seen = newAchievements;
    setNewAchievements([]);
    return sessionParticipant ? markAchievementsSeen(sessionParticipant._id, seen) : Promise.resolve();
  }

  function handleSeeAllAchievements() {
    dismissNewAchievements().then(() => router.push('/achievements'));
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

  useFocusEffect(
    useCallback(() => {
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
    }, [sessionParticipant?._id]),
  );

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
        <AppText variant="heading">Ranking semanal</AppText>
        <Card onPress={() => router.push('/ranking')} style={styles.rankingCard}>
          <IconBadge
            name="trophy"
            size={48}
            iconSize="md"
            background={theme.colors.semantic.warningBackground}
            color={theme.colors.ranking.gold}
          />
          {data.weeklyRanking ? (
            <View style={styles.rankingText}>
              <AppText variant="label" color="secondary">
                Sua posição
              </AppText>
              <AppText variant="heading">
                {data.weeklyRanking.position}º de {data.weeklyRankingTotal}
              </AppText>
              <AppText variant="caption" color="tertiary">
                {data.weeklyRanking.points} pts essa semana
              </AppText>
            </View>
          ) : (
            <View style={styles.rankingText}>
              <AppText variant="bodyStrong">Você ainda não está no ranking</AppText>
              <AppText variant="caption" color="secondary">
                Tenha uma atividade aprovada essa semana para pontuar.
              </AppText>
            </View>
          )}
        </Card>
      </View>

      {error && <InlineMessage tone="error" message={error} />}

      <NewAchievementsModal
        achievements={newAchievements}
        onClose={dismissNewAchievements}
        onSeeAll={handleSeeAllAchievements}
      />
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
  rankingCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  rankingText: {
    flex: 1,
    gap: 2,
  },
});
