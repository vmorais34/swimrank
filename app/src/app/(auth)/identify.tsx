import { router } from 'expo-router';
import { useState } from 'react';

import { AppText, Avatar, Button, Header, InlineMessage, ListRow, Screen, TextField } from '@/components/ui';
import { useSession } from '@/contexts/session-context';
import { digitsToIsoDate, formatDateDigits } from '@/lib/date';
import { ApiError, NetworkError } from '@/services/api';
import { participantService } from '@/services/participant.service';
import type { Participant } from '@/types/api';

type Step = 'birthdate' | 'select' | 'register';

function requestErrorMessage(error: unknown): string {
  if (error instanceof NetworkError || error instanceof ApiError) return error.message;
  return 'Algo deu errado. Tente novamente.';
}

/**
 * Identificação do participante (V1 sem autenticação): data de nascimento → nome
 * só se não houver cadastro. Ver decisão em `.agents/status.md` §2 e §4.
 */
export default function IdentifyScreen() {
  const { signIn } = useSession();

  const [step, setStep] = useState<Step>('birthdate');
  const [digits, setDigits] = useState('');
  const [birthdateIso, setBirthdateIso] = useState<string | null>(null);
  const [birthdateError, setBirthdateError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Participant[]>([]);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChangeBirthdate(text: string) {
    setDigits(text.replace(/\D/g, '').slice(0, 8));
    setBirthdateError(null);
    setRequestError(null);
  }

  function goToParticipant(participant: Participant) {
    signIn(participant);
    router.replace('/home');
  }

  function resetToBirthdate() {
    setStep('birthdate');
    setCandidates([]);
    setName('');
    setNameError(null);
    setRequestError(null);
  }

  async function handleSubmitBirthdate() {
    const iso = digitsToIsoDate(digits, { minYear: 1900, maxDate: new Date() });

    if (!iso) {
      setBirthdateError('Informe uma data de nascimento válida.');
      return;
    }

    setBirthdateIso(iso);
    setRequestError(null);
    setLoading(true);

    try {
      const matches = await participantService.findByBirthdate(iso);

      if (matches.length === 0) {
        setStep('register');
      } else if (matches.length === 1) {
        goToParticipant(matches[0]);
      } else {
        setCandidates(matches);
        setStep('select');
      }
    } catch (error) {
      setRequestError(requestErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateParticipant() {
    const trimmed = name.trim();

    if (trimmed.length < 2) {
      setNameError('Informe seu nome completo.');
      return;
    }

    if (!birthdateIso) {
      resetToBirthdate();
      return;
    }

    setNameError(null);
    setRequestError(null);
    setLoading(true);

    try {
      const created = await participantService.create({ name: trimmed, birthdate: birthdateIso });
      goToParticipant(created);
    } catch (error) {
      setRequestError(requestErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  if (step === 'select') {
    return (
      <Screen>
        <Header title="Quem é você?" onBack={resetToBirthdate} />
        <AppText color="secondary">
          Encontramos mais de um cadastro com essa data de nascimento. Toque no seu nome para continuar.
        </AppText>

        {candidates.map((candidate) => (
          <ListRow
            key={candidate._id}
            title={candidate.name}
            left={<Avatar size={40} />}
            onPress={() => goToParticipant(candidate)}
          />
        ))}

        {requestError && <InlineMessage tone="error" message={requestError} />}

        <Button title="Não encontrei meu nome" variant="outline" onPress={() => setStep('register')} />
      </Screen>
    );
  }

  if (step === 'register') {
    return (
      <Screen footer={<Button title="Concluir cadastro" loading={loading} disabled={name.trim().length < 2} onPress={handleCreateParticipant} />}>
        <Header title="Complete seu cadastro" onBack={() => (candidates.length > 0 ? setStep('select') : resetToBirthdate())} />
        <AppText color="secondary">Primeiro acesso? Informe seu nome para concluir o cadastro.</AppText>

        <TextField
          label="Nome completo"
          icon="user"
          placeholder="Seu nome"
          autoFocus
          autoCapitalize="words"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setNameError(null);
          }}
          error={nameError}
        />

        {requestError && <InlineMessage tone="error" message={requestError} />}
      </Screen>
    );
  }

  return (
    <Screen footer={<Button title="Acessar como professor" variant="ghost" onPress={() => router.push('/teacher-login')} />}>
      <Header title="Bem-vindo(a)!" />
      <AppText color="secondary">Informe sua data de nascimento para entrar.</AppText>

      <TextField
        label="Data de nascimento"
        icon="calendar"
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
        maxLength={10}
        value={formatDateDigits(digits)}
        onChangeText={handleChangeBirthdate}
        error={birthdateError}
      />

      {requestError && <InlineMessage tone="error" message={requestError} />}

      <Button title="Continuar" loading={loading} disabled={digits.length < 8} onPress={handleSubmitBirthdate} />
    </Screen>
  );
}
