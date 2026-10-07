import { Modal, ScrollView, StyleSheet, View } from 'react-native';

import { AppText, Button, IconBadge, ListRow } from '@/components/ui';
import { useTheme } from '@/contexts/theme-context';
import { REQUIREMENT_ICON, type UnlockedAchievement } from '@/lib/achievement';

interface NewAchievementsModalProps {
  achievements: UnlockedAchievement[];
  onClose: () => void;
  onSeeAll: () => void;
}

/** Popup da Home com as conquistas desbloqueadas desde a última visita */
export function NewAchievementsModal({ achievements, onClose, onSeeAll }: NewAchievementsModalProps) {
  const theme = useTheme();
  const { colors } = theme;
  const single = achievements.length === 1;

  return (
    <Modal visible={achievements.length > 0} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.backdrop, { backgroundColor: colors.overlay, padding: theme.spacing[4] }]}>
        <View
          accessibilityViewIsModal
          style={[
            styles.dialog,
            theme.shadows.sm,
            {
              backgroundColor: colors.background.secondary,
              borderColor: colors.border.default,
              borderRadius: theme.radius['2xl'],
              padding: theme.spacing[5],
              gap: theme.spacing[4],
            },
          ]}>
          <View style={[styles.header, { gap: theme.spacing[2] }]}>
            <IconBadge
              name="trophy"
              size={64}
              iconSize="lg"
              background={colors.semantic.warningBackground}
              color={colors.ranking.gold}
            />
            <AppText variant="title" style={styles.center}>
              {single ? 'Nova conquista!' : `${achievements.length} novas conquistas!`}
            </AppText>
            <AppText color="secondary" style={styles.center}>
              {single ? 'Você desbloqueou uma conquista.' : 'Você desbloqueou novas conquistas.'}
            </AppText>
          </View>

          <ScrollView style={styles.list} contentContainerStyle={{ gap: theme.spacing[3] }}>
            {achievements.map((entry) => (
              <ListRow
                key={entry._id}
                title={entry.achievementId.name}
                subtitle={entry.achievementId.description}
                left={
                  <IconBadge
                    name={REQUIREMENT_ICON[entry.achievementId.requirement.type]}
                    background={colors.semantic.successBackground}
                    color={colors.semantic.success}
                  />
                }
                right={
                  <AppText variant="caption" color="secondary">
                    +{entry.achievementId.points} pts
                  </AppText>
                }
              />
            ))}
          </ScrollView>

          <View style={{ gap: theme.spacing[2] }}>
            <Button title="Continuar" onPress={onClose} />
            <Button title="Ver minhas conquistas" variant="ghost" onPress={onSeeAll} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dialog: {
    borderWidth: 1,
    maxHeight: '85%',
    maxWidth: 420,
    width: '100%',
  },
  header: {
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
  },
  list: {
    flexGrow: 0,
  },
});
