import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Card, EmptyState, ErrorState, Header, InlineMessage, ListRow, LoadingState, Screen, SegmentedControl } from '@/components/ui';
import { useSession } from '@/contexts/session-context';
import { useTheme } from '@/contexts/theme-context';
import { todayIso } from '@/lib/date';
import { formatDistance } from '@/lib/format';
import { ApiError, NetworkError } from '@/services/api';
import { rankingService } from '@/services/ranking.service';
import type { Theme } from '@/theme';
import type { AttendanceRankingEntry, DistanceRankingEntry, PointsRankingEntry } from '@/types/api';

type Period = 'weekly' | 'monthly' | 'general';
type Metric = 'points' | 'distance' | 'attendance';
type RankingEntry = PointsRankingEntry | DistanceRankingEntry | AttendanceRankingEntry;

function fetchRankingData(period: Period, metric: Metric, date: string): Promise<RankingEntry[]> {
  if (period === 'general') return rankingService.general();
  if (period === 'monthly') return rankingService.monthly(date);
  if (metric === 'distance') return rankingService.weeklyDistance(date);
  if (metric === 'attendance') return rankingService.weeklyAttendance(date);
  return rankingService.weekly(date);
}

function entryValue(entry: RankingEntry): string {
  if ('points' in entry) return `${entry.points} pts`;
  if ('distance' in entry) return formatDistance(entry.distance);
  return `${entry.attendance} ${entry.attendance === 1 ? 'atividade' : 'atividades'}`;
}

function requestErrorMessage(error: unknown): string {
  if (error instanceof NetworkError || error instanceof ApiError) return error.message;
  return 'Algo deu errado. Tente novamente.';
}

function RankPosition({ position, theme }: { position: number; theme: Theme }) {
  const background =
    position === 1
      ? theme.colors.ranking.gold
      : position === 2
        ? theme.colors.ranking.silver
        : position === 3
          ? theme.colors.ranking.bronze
          : theme.colors.background.tertiary;

  const color = position <= 3 ? '#1F2937' : theme.colors.text.secondary;

  return (
    <View style={[styles.position, { backgroundColor: background, borderRadius: theme.radius.full }]}>
      <AppText variant="label" weight="bold" color={color}>
        {position}
      </AppText>
    </View>
  );
}

export default function RankingScreen() {
  const theme = useTheme();
  const { participant, status: sessionStatus } = useSession();

  const [period, setPeriod] = useState<Period>('weekly');
  const [metric, setMetric] = useState<Metric>('points');
  const [entries, setEntries] = useState<RankingEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  function fetchEntries(nextPeriod: Period, nextMetric: Metric): Promise<RankingEntry[]> {
    return fetchRankingData(nextPeriod, nextPeriod === 'weekly' ? nextMetric : 'points', todayIso());
  }

  function handleRetry() {
    setLoading(true);
    fetchEntries(period, metric)
      .then((result) => {
        setEntries(result);
        setError(null);
      })
      .catch((err) => setError(requestErrorMessage(err)))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (sessionStatus === 'ready' && !participant) {
      router.replace('/identify');
    }
  }, [sessionStatus, participant]);

  useEffect(() => {
    let active = true;

    fetchEntries(period, metric)
      .then((result) => {
        if (active) {
          setEntries(result);
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
  }, [period, metric]);

  if (!participant) return null;

  const myEntry = entries?.find((entry) => entry.participantId === participant._id) ?? null;

  return (
    <Screen>
      <Header title="Ranking" />

      <SegmentedControl
        value={period}
        onChange={setPeriod}
        options={[
          { value: 'weekly', label: 'Semanal' },
          { value: 'monthly', label: 'Mensal' },
          { value: 'general', label: 'Geral' },
        ]}
      />

      {period === 'weekly' && (
        <SegmentedControl
          value={metric}
          onChange={setMetric}
          options={[
            { value: 'points', label: 'Pontos' },
            { value: 'distance', label: 'Distância' },
            { value: 'attendance', label: 'Presença' },
          ]}
        />
      )}

      {loading ? (
        <LoadingState message="Carregando ranking..." />
      ) : !entries ? (
        <ErrorState message={error ?? 'Algo deu errado.'} onRetry={handleRetry} />
      ) : (
        <>
          <Card variant="hero">
            <AppText variant="label" color={theme.colors.hero.textMuted}>
              Sua posição
            </AppText>
            {myEntry ? (
              <View style={styles.heroRow}>
                <AppText variant="display" color={theme.colors.hero.text}>
                  #{myEntry.position}
                </AppText>
                <AppText variant="heading" color={theme.colors.hero.text}>
                  {entryValue(myEntry)}
                </AppText>
              </View>
            ) : (
              <AppText color={theme.colors.hero.textMuted}>Você ainda não aparece neste ranking.</AppText>
            )}
          </Card>

          {entries.length === 0 ? (
            <EmptyState
              icon="trophy"
              title="Ninguém pontuou ainda"
              description="Assim que uma atividade for aprovada neste período, o ranking aparece aqui."
            />
          ) : (
            entries.map((entry) => (
              <ListRow
                key={entry.participantId}
                title={entry.name}
                selected={entry.participantId === participant._id}
                left={<RankPosition position={entry.position} theme={theme} />}
                right={<AppText variant="bodyStrong">{entryValue(entry)}</AppText>}
              />
            ))
          )}

          {error && <InlineMessage tone="error" message={error} />}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  position: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
  },
});
