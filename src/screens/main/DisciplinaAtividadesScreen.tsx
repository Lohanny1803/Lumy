import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TopAppBar, TabsHeader, Card, Chip, Icon} from '../../components';
import {colors, typography, spacing} from '../../theme';
import {DisciplinaStackParamList} from '../../navigation/types';

type NavProp = NativeStackNavigationProp<DisciplinaStackParamList, 'DisciplinaAtividades'>;
type RouteType = RouteProp<DisciplinaStackParamList, 'DisciplinaAtividades'>;

const tabs = [
  {key: 'mural', label: 'Mural'},
  {key: 'atividades', label: 'Atividades'},
  {key: 'notas', label: 'Notas'},
  {key: 'pessoas', label: 'Pessoas'},
];

const filtros = [
  {key: 'todos', label: 'Todos', count: '12'},
  {key: 'b1', label: '1º Bimestre'},
  {key: 'b2', label: '2º Bimestre'},
  {key: 'final', label: 'Trabalho Final'},
];

const atividades = [
  {
    id: '1',
    titulo: 'Avaliação Parcial 1 - Pilhas e Filas',
    tipo: 'Pendente',
    prazo: 'Amanhã, 23:59',
    urgente: true,
  },
  {
    id: '2',
    titulo: 'Lista de Exercícios: Algoritmos de Busca',
    tipo: 'Entregue',
    subtipo: 'Entrega de Arquivo',
    statusColor: colors.secondary,
  },
  {
    id: '3',
    titulo: 'Leitura Obrigatória: Capítulo 3',
    tipo: 'Material',
    subtipo: 'Sem prazo',
    statusColor: colors.outline,
  },
  {
    id: '4',
    titulo: 'Fórum de Discussão: Arrays vs Listas',
    tipo: 'Atrasado',
    subtipo: '10 de Set',
    statusColor: colors.error,
  },
];

export default function DisciplinaAtividadesScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteType>();
  const {disciplinaId, nome, codigo, turma} = route.params ?? {
    disciplinaId: '1',
    nome: 'Estrutura de Dados',
    codigo: 'CIE-102',
    turma: 'Turma A',
  };
  const [filter, setFilter] = useState('todos');

  function handleTabPress(key: string) {
    const params = {disciplinaId, nome, codigo, turma};
    if (key === 'mural') {
      navigation.replace('DisciplinaMural', params);
    } else if (key === 'notas') {
      navigation.replace('DisciplinaNotas', params);
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
          activeTab="atividades"
          onTabPress={handleTabPress}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterContent}>
          {filtros.map(f => (
            <Chip
              key={f.key}
              label={f.label}
              count={f.count}
              active={f.key === filter}
              onPress={() => setFilter(f.key)}
            />
          ))}
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximo do Prazo</Text>
          {atividades
            .filter(a => a.urgente)
            .map(a => (
              <Card
                key={a.id}
                accentColor={colors.error}
                style={styles.activityCard}>
                <View style={styles.activityHeader}>
                  <View style={styles.activityTypeRow}>
                    <Icon
                      name="warning"
                      size={16}
                      color={colors.error}
                    />
                    <Text style={styles.activityType}>{a.tipo}</Text>
                  </View>
                  <Chip label={a.prazo || ''} active color={colors.errorContainer} />
                </View>
                <Text style={styles.activityTitle}>{a.titulo}</Text>
              </Card>
            ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1º Bimestre</Text>
          <View style={styles.activityList}>
            {atividades
              .filter(a => !a.urgente)
              .map(a => (
                <Card key={a.id} style={styles.activityCard}>
                  <View style={styles.activityHeader}>
                    <View style={styles.activityTypeRow}>
                      <Icon
                        name={
                          a.statusColor === colors.secondary
                            ? 'check_circle'
                            : a.statusColor === colors.error
                            ? 'error'
                            : 'description'
                        }
                        size={16}
                        color={a.statusColor}
                      />
                      <Text style={styles.activityType}>{a.tipo}</Text>
                    </View>
                    {a.subtipo && (
                      <Chip
                        label={a.subtipo}
                        active
                        color={
                          a.statusColor === colors.secondary
                            ? colors.secondaryContainer
                            : a.statusColor === colors.error
                            ? colors.errorContainer
                            : colors.surfaceContainerHigh
                        }
                      />
                    )}
                  </View>
                  <Text style={styles.activityTitle}>{a.titulo}</Text>
                </Card>
              ))}
          </View>
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
  filterRow: {
    marginVertical: spacing.stackGap,
  },
  filterContent: {
    paddingVertical: spacing.base,
  },
  section: {
    marginBottom: spacing.sectionMargin,
  },
  sectionTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginBottom: spacing.stackGap,
  },
  activityList: {
    gap: spacing.inlineGap,
  },
  activityCard: {
    gap: 8,
    marginBottom: spacing.base,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activityType: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  activityTitle: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },
});
