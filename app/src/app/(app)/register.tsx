import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, Header, InlineMessage, Screen, TextField } from '@/components/ui';
import { useSession } from '@/contexts/session-context';
import { useTheme } from '@/contexts/theme-context';
import { digitsToIsoDate, formatDateDigits, isoToDigits, todayIso, weekStartIso } from '@/lib/date';
import { findMainTraining } from '@/lib/training';
import { activityService } from '@/services/activity.service';
import { ApiError, NetworkError } from '@/services/api';
import { trainingService } from '@/services/training.service';
import type { Training } from '@/types/api';

function requestErrorMessage(error: unknown): string {
  if (error instanceof NetworkError || error instanceof ApiError) return error.message;
  return 'Algo deu errado. Tente novamente.';
}

export default function RegisterScreen() {
  const theme = useTheme();
  const { participant, status: sessionStatus } = useSession();

  const [dateDigits, setDateDigits] = useState(() => isoToDigits(todayIso()));
  const [dateError, setDateError] = useState<string | null>(null);

  const [type, setType] = useState('');
  const [typeError, setTypeError] = useState<string | null>(null);
  const [mainTraining, setMainTraining] = useState<Training | null>(null);

  const [distanceText, setDistanceText] = useState('');
  const [distanceError, setDistanceError] = useState<string | null>(null);

  const [minutesText, setMinutesText] = useState('');
  const [secondsText, setSecondsText] = useState('');
  const [timeError, setTimeError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStatus === 'ready' && !participant) {
      router.replace('/identify');
    }
  }, [sessionStatus, participant]);

  useEffect(() => {
    trainingService
      .list()
      .then((trainings) => {
        const main = findMainTraining(trainings, weekStartIso(todayIso()));
        setMainTraining(main);
        setType((current) => (current === '' ? (main?.type ?? '') : current));
      })
      .catch(() => {
        // treino principal é só uma sugestão — falha aqui não impede o registro manual
      });
  }, []);

  if (!participant) return null;

  async function handleSubmit() {
    if (!participant) return;

    const iso = digitsToIsoDate(dateDigits, { maxDate: new Date() });
    const trimmedType = type.trim();
    const distance = Number(distanceText.replace(',', '.'));
    const minutes = minutesText.trim() === '' ? 0 : Number(minutesText);
    const seconds = secondsText.trim() === '' ? 0 : Number(secondsText);
    const totalSeconds = minutes * 60 + seconds;

    const nextDateError = iso ? null : 'Informe uma data válida.';
    const nextTypeError = trimmedType.length > 0 ? null : 'Informe o tipo da atividade.';
    const nextDistanceError = Number.isFinite(distance) && distance > 0 ? null : 'Informe uma distância válida.';
    const nextTimeError =
      Number.isFinite(minutes) && Number.isFinite(seconds) && minutes >= 0 && seconds >= 0 && seconds <= 59 && totalSeconds > 0
        ? null
        : 'Informe um tempo válido.';

    setDateError(nextDateError);
    setTypeError(nextTypeError);
    setDistanceError(nextDistanceError);
    setTimeError(nextTimeError);

    if (!iso || nextTypeError || nextDistanceError || nextTimeError) return;

    setRequestError(null);
    setSubmitting(true);

    try {
      await activityService.create({
        participantId: participant._id,
        date: iso,
        type: trimmedType,
        distance,
        time: totalSeconds,
      });
      router.replace('/history');
    } catch (error) {
      setRequestError(requestErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen footer={<Button title="Registrar" loading={submitting} onPress={handleSubmit} />}>
      <Header title="Registrar atividade" subtitle="Só natação" />

      <TextField
        label="Data"
        icon="calendar"
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
        maxLength={10}
        value={formatDateDigits(dateDigits)}
        onChangeText={(text) => {
          setDateDigits(text.replace(/\D/g, '').slice(0, 8));
          setDateError(null);
        }}
        error={dateError}
      />

      <TextField
        label="Tipo"
        icon="waves"
        placeholder="Ex.: Livre"
        value={type}
        onChangeText={(text) => {
          setType(text);
          setTypeError(null);
        }}
        error={typeError}
        hint={mainTraining ? `Treino principal da semana: ${mainTraining.type}` : undefined}
      />

      <TextField
        label="Distância (metros)"
        icon="route"
        placeholder="Ex.: 800"
        keyboardType="decimal-pad"
        value={distanceText}
        onChangeText={(text) => {
          setDistanceText(text);
          setDistanceError(null);
        }}
        error={distanceError}
      />

      <View style={styles.timeGroup}>
        <AppText variant="label" color="secondary">
          Tempo
        </AppText>
        <View style={styles.timeRow}>
          <View style={styles.timeField}>
            <TextField
              placeholder="Minutos"
              keyboardType="number-pad"
              value={minutesText}
              onChangeText={(text) => {
                setMinutesText(text.replace(/\D/g, ''));
                setTimeError(null);
              }}
            />
          </View>
          <View style={styles.timeField}>
            <TextField
              placeholder="Segundos"
              keyboardType="number-pad"
              value={secondsText}
              onChangeText={(text) => {
                setSecondsText(text.replace(/\D/g, ''));
                setTimeError(null);
              }}
            />
          </View>
        </View>
        {timeError && (
          <AppText variant="caption" color={theme.colors.semantic.error}>
            {timeError}
          </AppText>
        )}
      </View>

      {requestError && <InlineMessage tone="error" message={requestError} />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  timeGroup: {
    gap: 6,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeField: {
    flex: 1,
  },
});
