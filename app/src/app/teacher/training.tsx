import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, Header, InlineMessage, Screen, SegmentedControl, TextField } from '@/components/ui';
import { useTeacherSession } from '@/contexts/teacher-session-context';
import { digitsToIsoDate, formatDateDigits, isoToDigits, todayIso, weekStartIso } from '@/lib/date';
import { formatDateBR } from '@/lib/format';
import { findMainTraining } from '@/lib/training';
import { ApiError, NetworkError } from '@/services/api';
import { trainingService } from '@/services/training.service';
import type { Training } from '@/types/api';

type TrainingKind = 'main' | 'extra';

function requestErrorMessage(error: unknown): string {
  if (error instanceof NetworkError || error instanceof ApiError) return error.message;
  return 'Algo deu errado. Tente novamente.';
}

function goBackToTeacher() {
  if (router.canGoBack()) router.back();
  else router.replace('/teacher');
}

export default function TeacherTrainingScreen() {
  const { session, status: sessionStatus } = useTeacherSession();

  const [dateDigits, setDateDigits] = useState(() => isoToDigits(todayIso()));
  const [dateError, setDateError] = useState<string | null>(null);

  const [type, setType] = useState('');
  const [typeError, setTypeError] = useState<string | null>(null);

  const [kind, setKind] = useState<TrainingKind>('main');
  const [trainings, setTrainings] = useState<Training[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStatus === 'ready' && !session) {
      router.replace('/teacher-login');
    }
  }, [sessionStatus, session]);

  useEffect(() => {
    trainingService
      .list()
      .then(setTrainings)
      .catch(() => {
        // lista só serve pra avisar de treino principal já cadastrado — o backend valida de novo (409)
      });
  }, []);

  if (!session) return null;

  // O treino é sempre gravado na segunda-feira da semana escolhida (o backend casa o principal pela data exata)
  const pickedIso = digitsToIsoDate(dateDigits);
  const weekStart = pickedIso ? weekStartIso(pickedIso) : null;
  const existingMain = weekStart ? findMainTraining(trainings, weekStart) : null;

  async function handleSubmit() {
    const trimmedType = type.trim();

    const nextDateError = weekStart ? null : 'Informe uma data válida.';
    const nextTypeError =
      trimmedType.length === 0
        ? 'Informe o tipo do treino.'
        : trimmedType.length > 50
          ? 'O tipo deve ter no máximo 50 caracteres.'
          : null;

    setDateError(nextDateError);
    setTypeError(nextTypeError);

    if (!weekStart || nextTypeError) return;

    setRequestError(null);
    setSubmitting(true);

    try {
      await trainingService.create({ date: weekStart, type: trimmedType, isMain: kind === 'main' });
      goBackToTeacher();
    } catch (error) {
      setRequestError(requestErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen footer={<Button title="Cadastrar" loading={submitting} onPress={handleSubmit} />}>
      <Header title="Cadastrar treino" subtitle="Treino da semana" onBack={goBackToTeacher} />

      <TextField
        label="Semana"
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
        hint={weekStart ? `Semana de ${formatDateBR(weekStart)} (segunda-feira)` : 'Qualquer dia da semana do treino'}
      />

      <TextField
        label="Tipo"
        icon="waves"
        placeholder="Ex.: Livre"
        maxLength={50}
        value={type}
        onChangeText={(text) => {
          setType(text);
          setTypeError(null);
        }}
        error={typeError}
      />

      <View style={styles.kindGroup}>
        <AppText variant="label" color="secondary">
          Categoria
        </AppText>
        <SegmentedControl<TrainingKind>
          options={[
            { value: 'main', label: 'Principal' },
            { value: 'extra', label: 'Complementar' },
          ]}
          value={kind}
          onChange={setKind}
        />
        <AppText variant="caption" color="secondary">
          Só atividades do tipo do treino principal pontuam no ranking.
        </AppText>
      </View>

      {kind === 'main' && existingMain && (
        <InlineMessage tone="warning" message={`Esta semana já tem treino principal: ${existingMain.type}.`} />
      )}

      {requestError && <InlineMessage tone="error" message={requestError} />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  kindGroup: {
    gap: 6,
  },
});
