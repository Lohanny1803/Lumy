import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TopAppBar, TabsHeader, Card, Icon} from '../../components';
import {colors, typography, spacing} from '../../theme';
import {DisciplinaStackParamList} from '../../navigation/types';

type NavProp = NativeStackNavigationProp<DisciplinaStackParamList, 'DisciplinaNotas'>;
type RouteType = RouteProp<DisciplinaStackParamList, 'DisciplinaNotas'>;

const tabs = [
  {key: 'mural', label: 'Mural'},
  {key: 'atividades', label: 'Atividades'},
  {key: 'notas', label: 'Notas'},
  {key: 'pessoas', label: 'Pessoas'},
];

const trabalhos = [
  {id: '1', titulo: 'Implementação de Grafos', nota: 9.0},
  {id: '2', titulo: 'Relatório de Árvores Binárias', nota: 8.0},
];

const provas = [
  {id: '3', titulo: 'P1 - Teoria de Estruturas', nota: 8.5},
  {id: '4', titulo: 'P2 - Avaliação Final', nota: null},
];

export default function DisciplinaNotasScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteType>();
  const {disciplinaId, nome, codigo, turma} = route.params ?? {
    disciplinaId: '1',
    nome: 'Estrutura de Dados',
    codigo: 'CIE-102',
    turma: 'Turma A',
  };

  function handleTabPress(key: string) {
    const params = {disciplinaId, nome, codigo, turma};
    if (key === 'atividades' || key === 'mural') {
      navigation.replace('DisciplinaAtividades', params);
    } else if (key === 'pessoas') {
      navigation.replace('DisciplinaPessoas', {disciplinaId, nome});
    }
  }

  return (
    <View style={styles.screen}>
      <TopAppBar
        showBack
        onBackPress={() => navigation.goBack()}
        title={nome}
        subtitle={`${codigo} · ${turma}`}
        brandTitle
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}>
        <TabsHeader
          tabs={tabs}
          activeTab="notas"
          onTabPress={handleTabPress}
        />

        <Card accentColor={colors.primary} style={styles.gradeCard}>
          <Text style={styles.gradeLabel}>Média Atual</Text>
          <View style={styles.gradeRow}>
            <Text style={styles.gradeValue}>8.5</Text>
            <View style={styles.gradeBar}>
              <View style={[styles.gradeFill, {width: '85%'}]} />
            </View>
          </View>
          <Text style={styles.gradeTarget}>Para aprovação: 7.0</Text>
        </Card>

        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Trabalhos</Text>
          {trabalhos.map(t => (
            <Card key={t.id} style={styles.gradeItem}>
              <View style={styles.gradeItemRow}>
                <Icon
                  name="article"
                  size={20}
                  color={colors.secondary}
                />
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
                <Icon
                  name="description"
                  size={20}
                  color={colors.primary}
                />
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

        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
    marginTop: 64,
  },
  scrollContent: {
    padding: spacing.containerPadding,
  },
  gradeCard: {
    marginTop: spacing.sectionMargin,
    gap: 8,
  },
  gradeLabel: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  gradeValue: {
    ...typography.headlineLg,
    color: colors.primary,
  },
  gradeBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 4,
    overflow: 'hidden',
  },
  gradeFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  gradeTarget: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  category: {
    marginTop: spacing.sectionMargin,
    gap: spacing.inlineGap,
  },
  categoryTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginBottom: spacing.base,
  },
  gradeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  gradeItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  gradeItemTitle: {
    ...typography.bodyMd,
    color: colors.onSurface,
    flex: 1,
  },
  gradeItemNota: {
    ...typography.headlineSm,
    color: colors.secondary,
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  pendingText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
});
