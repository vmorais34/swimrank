import { router } from 'expo-router';
import { useState } from 'react';

import { Button, Header, InlineMessage, Screen, TextField } from '@/components/ui';
import { useTeacherSession } from '@/contexts/teacher-session-context';
import { ApiError, NetworkError } from '@/services/api';
import { authService } from '@/services/auth.service';

function requestErrorMessage(error: unknown): string {
  if (error instanceof NetworkError || error instanceof ApiError) return error.message;
  return 'Algo deu errado. Tente novamente.';
}

export default function TeacherLoginScreen() {
  const { signIn } = useTeacherSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!email.trim() || !password) {
      setError('Informe e-mail e senha.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await authService.login({ email: email.trim(), password });
      signIn(result);
      router.replace('/teacher');
    } catch (err) {
      setError(requestErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen footer={<Button title="Entrar" loading={loading} onPress={handleSubmit} />}>
      <Header title="Acesso do professor" onBack={() => router.replace('/identify')} />

      <TextField
        label="E-mail"
        icon="mail"
        placeholder="seu@email.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError(null);
        }}
      />

      <TextField
        label="Senha"
        icon="lock"
        placeholder="Sua senha"
        secureToggle
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError(null);
        }}
      />

      {error && <InlineMessage tone="error" message={error} />}
    </Screen>
  );
}
