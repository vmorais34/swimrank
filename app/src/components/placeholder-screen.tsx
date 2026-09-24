import { router } from 'expo-router';

import { EmptyState, Header, Screen } from '@/components/ui';

/** Tela provisória — substituída conforme cada tela da 4.3 é implementada */
export function PlaceholderScreen({ title, back }: { title: string; back?: boolean }) {
  return (
    <Screen>
      <Header title={title} onBack={back ? () => router.back() : undefined} />
      <EmptyState icon="waves" title="Em construção" description={`A tela "${title}" será implementada nos próximos blocos.`} />
    </Screen>
  );
}
