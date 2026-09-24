import { router, type Href } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppText,
  Avatar,
  Button,
  Card,
  EmptyState,
  Icon,
  IconBadge,
  InlineMessage,
  ListRow,
  Logo,
  Screen,
  SegmentedControl,
  StatusBadge,
  TextField,
} from '@/components/ui';
import { env } from '@/config/env';
import { useAppTheme } from '@/contexts/theme-context';

/**
 * PROVISÓRIO (Bloco 1): hub de navegação + catálogo do design system
 * para validação. Será substituído pela Splash no Bloco 2.
 */
const routes: { label: string; href: Href }[] = [
  { label: 'Identificação', href: '/identify' },
  { label: 'Login professor', href: '/teacher-login' },
  { label: 'Início (tabs)', href: '/home' },
  { label: 'Registrar', href: '/register' },
  { label: 'Ranking', href: '/ranking' },
  { label: 'Perfil', href: '/profile' },
  { label: 'Histórico', href: '/history' },
  { label: 'Conquistas', href: '/achievements' },
  { label: 'Professor', href: '/teacher' },
];

export default function DevHub() {
  const { theme, preference, setPreference } = useAppTheme();
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const [name, setName] = useState('');

  return (
    <Screen>
      <Logo size="md" />

      <Section title="Tema">
        <SegmentedControl
          value={preference}
          onChange={setPreference}
          options={[
            { value: 'system', label: 'Sistema' },
            { value: 'light', label: 'Claro' },
            { value: 'dark', label: 'Escuro' },
          ]}
        />
        <AppText variant="caption" color="tertiary">
          API: {env.apiUrl}
        </AppText>
      </Section>

      <Section title="Navegação">
        <View style={styles.wrap}>
          {routes.map((route) => (
            <Button
              key={route.label}
              title={route.label}
              size="sm"
              variant="secondary"
              fullWidth={false}
              onPress={() => router.push(route.href)}
            />
          ))}
        </View>
      </Section>

      <Section title="Tipografia">
        <AppText variant="display">Display 30</AppText>
        <AppText variant="title">Title 24</AppText>
        <AppText variant="subtitle">Subtitle 20</AppText>
        <AppText variant="heading">Heading 18</AppText>
        <AppText variant="body">Body 16 — texto padrão do app.</AppText>
        <AppText variant="label" color="secondary">
          Label 14 secundário
        </AppText>
        <AppText variant="caption" color="tertiary">
          Caption 12 terciário
        </AppText>
      </Section>

      <Section title="Cores">
        <View style={styles.wrap}>
          {Object.entries({ ...theme.colors.brand, ...theme.colors.background }).map(([key, value]) => (
            <View key={key} style={styles.swatch}>
              <View style={[styles.swatchColor, { backgroundColor: value, borderColor: theme.colors.border.subtle }]} />
              <AppText variant="caption" color="secondary">
                {key}
              </AppText>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Botões">
        <Button title="Primário" icon="plus" />
        <Button title="Outline" variant="outline" />
        <Button title="Secundário" variant="secondary" />
        <View style={styles.row}>
          <Button title="Pequeno" size="sm" fullWidth={false} />
          <Button title="Carregando" size="sm" fullWidth={false} loading />
          <Button title="Desabilitado" size="sm" fullWidth={false} disabled />
        </View>
      </Section>

      <Section title="Inputs">
        <TextField label="Nome" icon="user" placeholder="Seu nome completo" value={name} onChangeText={setName} />
        <TextField icon="lock" placeholder="Senha" secureToggle />
        <TextField icon="calendar" placeholder="dd/mm/aaaa" error="Data de nascimento inválida" />
      </Section>

      <Section title="Cards e listas">
        <Card variant="hero" onPress={() => {}} style={styles.row}>
          <Icon name="waves" size="lg" color={theme.colors.hero.text} />
          <View style={styles.flex}>
            <AppText variant="label" color={theme.colors.hero.textMuted}>
              Sequência atual
            </AppText>
            <AppText variant="title" color={theme.colors.hero.text}>
              5 dias
            </AppText>
          </View>
          <Icon name="flame" color={theme.colors.hero.text} />
        </Card>

        <Card variant="highlight">
          <AppText variant="label" color="secondary">
            Seus pontos
          </AppText>
          <AppText variant="display">980</AppText>
        </Card>

        <ListRow
          title="Primeiro Mergulho"
          subtitle="Registrou seu primeiro treino"
          left={<IconBadge name="medal" />}
          onPress={() => {}}
        />
        <ListRow
          title="Focado"
          subtitle="5 dias sem faltar"
          left={<IconBadge name="zap" color={theme.colors.semantic.warning} background={theme.colors.semantic.warningBackground} />}
          onPress={() => {}}
        />
      </Section>

      <Section title="Badges, avatar e segmentado">
        <View style={styles.row}>
          <StatusBadge status="PENDING" />
          <StatusBadge status="APPROVED" />
          <StatusBadge status="REJECTED" />
        </View>
        <View style={styles.row}>
          <Avatar />
          <Avatar highlighted />
        </View>
        <SegmentedControl
          value={period}
          onChange={setPeriod}
          options={[
            { value: 'weekly', label: 'Semanal' },
            { value: 'monthly', label: 'Mensal' },
          ]}
        />
      </Section>

      <Section title="Estados">
        <InlineMessage message="Sua atividade será enviada para validação do professor." />
        <InlineMessage tone="error" message="Não foi possível conectar ao servidor." />
        <Card>
          <EmptyState title="Nenhuma atividade ainda" description="Registre seu primeiro treino!" />
        </Card>
      </Section>
    </Screen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <AppText variant="overline" color="tertiary">
        {title}
      </AppText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
    marginTop: 8,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  flex: {
    flex: 1,
  },
  swatch: {
    alignItems: 'center',
    gap: 4,
    width: 72,
  },
  swatchColor: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
  },
});
