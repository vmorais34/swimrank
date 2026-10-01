import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, Card, EmptyState, ErrorState, Header, InlineMessage, LoadingState, Screen } from '@/components/ui';
import { useTeacherSession } from '@/contexts/teacher-session-context';
import { formatDateBR, formatDistance, formatDuration } from '@/lib/format';
import { activityService } from '@/services/activity.service';
import { ApiError, NetworkError } from '@/services/api';
import { participantService } from '@/services/participant.service';
import type { Activity } from '@/types/api';

function requestErrorMessage(error: unknown): string {
  if (error instanceof NetworkError || error instanceof ApiError) return error.message;
  return 'Algo deu errado. Tente novamente.';
}

export default function TeacherHomeScreen() {
  const { session, status: sessionStatus, signOut } = useTeacherSession();

  const [pending, setPending] = useState<Activity[] | null>(null);
  const [names, setNames] = useState<Map<string, string>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});

  function fetchPending(): Promise<{ pending: Activity[]; names: Map<string, string> }> {
    return Promise.all([activityService.listAll(), participantService.list()]).then(([activities, participants]) => ({
      pending: activities.filter((activity) => activity.status === 'PENDING'),
      names: new Map(participants.map((participant) => [participant._id, participant.name])),
    }));
  }

  function handleRetry() {
    setLoading(true);
    fetchPending()
      .then((result) => {
        setPending(result.pending);
        setNames(result.names);
        setError(null);
      })
      .catch((err) => setError(requestErrorMessage(err)))
      .finally(() => setLoading(false));
  }

  function handleRefresh() {
    setRefreshing(true);
    fetchPending()
      .then((result) => {
        setPending(result.pending);
        setNames(result.names);
        setError(null);
      })
      .catch((err) => setError(requestErrorMessage(err)))
      .finally(() => setRefreshing(false));
  }

  function handleLogout() {
    signOut();
    router.replace('/identify');
  }

  function handleValidate(activity: Activity, status: 'APPROVED' | 'REJECTED') {
    if (!session) return;

    setProcessingIds((prev) => new Set(prev).add(activity._id));
    setRowErrors((prev) => {
      const next = { ...prev };
      delete next[activity._id];
      return next;
    });

    activityService
      .validate(activity._id, status, session.token)
      .then(() => {
        setPending((prev) => prev?.filter((item) => item._id !== activity._id) ?? prev);
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          handleLogout();
          return;
        }
        setRowErrors((prev) => ({ ...prev, [activity._id]: requestErrorMessage(err) }));
      })
      .finally(() => {
        setProcessingIds((prev) => {
          const next = new Set(prev);
          next.delete(activity._id);
          return next;
        });
      });
  }

  useEffect(() => {
    if (sessionStatus === 'ready' && !session) {
      router.replace('/teacher-login');
    }
  }, [sessionStatus, session]);

  useEffect(() => {
    if (!session) return;

    let active = true;

    fetchPending()
      .then((result) => {
        if (active) {
          setPending(result.pending);
          setNames(result.names);
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
  }, [session?.token]);

  if (!session) return null;

  return (
    <Screen refreshing={refreshing} onRefresh={handleRefresh}>
      <Header
        title="Atividades pendentes"
        subtitle={session.user.name}
        right={<Button title="Sair" variant="ghost" size="sm" fullWidth={false} onPress={handleLogout} />}
      />

      {loading ? (
        <LoadingState message="Carregando pendentes..." />
      ) : !pending ? (
        <ErrorState message={error ?? 'Algo deu errado.'} onRetry={handleRetry} />
      ) : pending.length === 0 ? (
        <EmptyState icon="checkCircle" title="Tudo em dia" description="Não há atividades pendentes de validação." />
      ) : (
        pending.map((activity) => {
          const processing = processingIds.has(activity._id);
          const rowError = rowErrors[activity._id];

          return (
            <Card key={activity._id} style={styles.card}>
              <View>
                <AppText variant="bodyStrong">{names.get(activity.participantId) ?? 'Participante'}</AppText>
                <AppText variant="caption" color="secondary">
                  {formatDateBR(activity.date)} • {activity.type}
                </AppText>
                <AppText variant="caption" color="secondary">
                  {formatDistance(activity.distance)} • {formatDuration(activity.time)}
                </AppText>
              </View>

              {rowError && <InlineMessage tone="error" message={rowError} />}

              <View style={styles.actions}>
                <View style={styles.actionButton}>
                  <Button
                    title="Rejeitar"
                    variant="outline"
                    size="sm"
                    loading={processing}
                    onPress={() => handleValidate(activity, 'REJECTED')}
                  />
                </View>
                <View style={styles.actionButton}>
                  <Button
                    title="Aprovar"
                    size="sm"
                    loading={processing}
                    onPress={() => handleValidate(activity, 'APPROVED')}
                  />
                </View>
              </View>
            </Card>
          );
        })
      )}

      {error && pending && <InlineMessage tone="error" message={error} />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
