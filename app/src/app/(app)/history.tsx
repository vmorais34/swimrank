import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import { EmptyState, ErrorState, Header, InlineMessage, ListRow, LoadingState, Screen, StatusBadge } from '@/components/ui';
import { useSession } from '@/contexts/session-context';
import { formatDateBR, formatDistance, formatDuration } from '@/lib/format';
import { activityService } from '@/services/activity.service';
import { ApiError, NetworkError } from '@/services/api';
import type { Activity } from '@/types/api';

function requestErrorMessage(error: unknown): string {
  if (error instanceof NetworkError || error instanceof ApiError) return error.message;
  return 'Algo deu errado. Tente novamente.';
}

export default function HistoryScreen() {
  const { participant, status: sessionStatus } = useSession();

  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  function fetchHistory(participantId: string): Promise<void> {
    return activityService.listByParticipant(participantId).then((result) => {
      setActivities(result);
    });
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

  useEffect(() => {
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
  }, [participant?._id]);

  if (!participant) return null;

  return (
    <Screen refreshing={refreshing} onRefresh={handleRefresh}>
      <Header title="Histórico" onBack={() => router.back()} />

      {loading ? (
        <LoadingState message="Carregando seu histórico..." />
      ) : !activities ? (
        <ErrorState message={error ?? 'Algo deu errado.'} onRetry={handleRetry} />
      ) : activities.length === 0 ? (
        <EmptyState icon="history" title="Nenhuma atividade registrada" description="Registre um treino para começar seu histórico." />
      ) : (
        activities.map((activity) => (
          <ListRow
            key={activity._id}
            title={formatDateBR(activity.date)}
            subtitle={`${activity.type} • ${formatDistance(activity.distance)} • ${formatDuration(activity.time)}`}
            right={<StatusBadge status={activity.status} />}
          />
        ))
      )}

      {error && activities && <InlineMessage tone="error" message={error} />}
    </Screen>
  );
}
