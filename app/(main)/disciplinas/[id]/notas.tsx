import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { TopAppBar, TabsHeader, Card, Icon } from '../../../../src/components';
import { colors, typography, spacing } from '../../../../src/theme';

const tabs = [
  { key: 'mural', label: 'Mural' },
  { key: 'atividades', label: 'Atividades' },
  { key: 'notas', label: 'Notas' },
  { key: 'pessoas', label: 'Pessoas' },
];

const trabalhos = [
  { id: '1', titulo: 'Implementação de Grafos', nota: 9.0 },
  { id: '2', titulo: 'Relatório de Árvores Binárias', nota: 8.0 },
];

const provas = [
  { id: '3', titulo: 'P1 - Teoria de Estruturas', nota: 8.5 },
  { id: '4', titulo: 'P2 - Avaliação Final', nota: null },
];

export default function NotasScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; nome: string; codigo: string; turma: string }>();
  const { nome = 'Disciplina', codigo = '', turma = '' } = params;

  function handleTabPress(key: string) {
    if (key === 'mural') {
      router.replace({ pathname: '/(main)/disciplinas/[id]/mural', params });
    } else if (key === 'atividades') {
      router.replace({ pathname: '/(main)/disciplinas/[id]/atividades', params });
    } else if (key === 'pessoas') {
      router.replace({ pathname: '/(main)/disciplinas/[id]/pessoas', params });
    }
  }

  return (
    <View style={styles.screen}>
      <TopAppBar
        showBack
        onBackPress={() => router.back()}
        title={nome}
        subtitle={codigo && turma ? `${codigo} · ${turma}` : undefined}
        brandTitle
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}>
        <TabsHeader tabs={tabs} activeTab="notas" onTabPress={handleTabPress} />

        <Card accentColor={colors.primary} style={styles.gradeCard}>
          <Text style={styles.gradeLabel}>Média Atual</Text>
          <View style={styles.gradeRow}>
            <Text style={styles.gradeValue}>8.5</Text>
            <View style={styles.gradeBar}>
              <View style={[styles.gradeFill, { width: '85%' }]} />
            </View>
          </View>
          <Text style={styles.gradeTarget}>Para aprovação: 7.0</Text>
        </Card>

        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Trabalhos</Text>
          {trabalhos.map(t => (
            <Card key={t.id} style={styles.gradeItem}>
              <View style={styles.gradeItemRow}>
                <Icon name="article" size={20} color={colors.secondary} />
                <Text style={styles.gradeItemTitle}>{t.titulo}</Text>
              </View>
              <Text style={styles.gradeItemNota}>{t.nota.toFixed(1)}</Text>
            </Card>
          ))}
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Provas</Text>
          {provas.map(p => (
            <Card key={p.id} style={styles.gradeItem}>
              <View style={styles.gradeItemRow}>
                <Icon name="description" size={20} color={colors.primary} />
                <Text style={styles.gradeItemTitle}>{p.titulo}</Text>
              </View>
              {p.nota !== null ? (
                <Text style={styles.gradeItemNota}>{p.nota.toFixed(1)}</Text>
              ) : (
                <View style={styles.pendingBadge}>
                  <Icon name="schedule" size={16} color={colors.onSurfaceVariant} />
                  <Text style={styles.pendingText}>Pendente</Text>
                </View>
              )}
            </Card>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, marginTop: 64 },
  scrollContent: { padding: spacing.containerPadding },
  gradeCard: { marginTop: spacing.sectionMargin, gap: 8 },
  gradeLabel: { ...typography.labelMd, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 },
  gradeRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  gradeValue: { ...typography.headlineLg, color: colors.primary },
  gradeBar: { flex: 1, height: 8, backgroundColor: colors.surfaceContainerHigh, borderRadius: 4, overflow: 'hidden' },
  gradeFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  gradeTarget: { ...typography.bodySm, color: colors.onSurfaceVariant },
  category: { marginTop: spacing.sectionMargin, gap: spacing.inlineGap },
  categoryTitle: { ...typography.headlineSm, color: colors.onSurface, marginBottom: spacing.base },
  gradeItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  gradeItemRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  gradeItemTitle: { ...typography.bodyMd, color: colors.onSurface, flex: 1 },
  gradeItemNota: { ...typography.headlineMd, color: colors.primary, fontWeight: '700' },
  pendingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  pendingText: { ...typography.labelMd, color: colors.onSurfaceVariant },
});
