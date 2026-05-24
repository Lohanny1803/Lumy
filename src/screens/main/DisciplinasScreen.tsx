import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {TopAppBar, BottomNavBar, Card, Chip, Icon} from '../../components';
import {colors, typography, spacing, shadows} from '../../theme';
import {DisciplinaStackParamList, MainTabParamList} from '../../navigation/types';

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<DisciplinaStackParamList, 'DisciplinasList'>,
  BottomTabNavigationProp<MainTabParamList>
>;

const disciplines = [
  {
    id: '1',
    nome: 'Cálculo I',
    codigo: 'MAT101',
    turma: 'T01',
    professor: 'Dr. Alberto Santos',
    progresso: 75,
    tag: 'Exatas',
    tagColor: colors.primary,
    icon: 'architecture',
  },
  {
    id: '2',
    nome: 'Estrutura de Dados',
    codigo: 'INF202',
    turma: 'T02',
    professor: 'Profa. Marina Costa',
    progresso: 45,
    tag: 'Tech',
    tagColor: colors.secondary,
    icon: 'code',
  },
  {
    id: '3',
    nome: 'Algoritmos',
    codigo: 'INF301',
    turma: 'T01',
    professor: 'Prof. Ricardo Mello',
    progresso: 92,
    tag: 'Tech',
    tagColor: colors.secondary,
    icon: 'code',
  },
  {
    id: '4',
    nome: 'Inteligência Artificial',
    codigo: 'INF401',
    turma: 'T03',
    professor: 'Dra. Elenir Rocha',
    progresso: 12,
    tag: 'Avançado',
    tagColor: colors.error,
    icon: 'psychology',
  },
  {
    id: '5',
    nome: 'Sistemas Operacionais',
    codigo: 'INF305',
    turma: 'T02',
    professor: 'Prof. Marcos Paulo',
    progresso: 60,
    tag: 'Tech',
    tagColor: colors.secondary,
    icon: 'memory',
  },
  {
    id: '6',
    nome: 'Física Quântica',
    codigo: 'FIS401',
    turma: 'T01',
    professor: 'Dra. Sônia Abreu',
    progresso: 30,
    tag: 'Exatas',
    tagColor: colors.primary,
    icon: 'science',
  },
  {
    id: '7',
    nome: 'História da Ciência',
    codigo: 'HIS201',
    turma: 'T04',
    professor: 'Prof. Julio Verne',
    progresso: 85,
    tag: 'Humanas',
    tagColor: colors.tertiaryContainer,
    icon: 'history',
  },
];

const tabs = [
  {key: 'HomeTab', label: 'Início', icon: 'home'},
  {key: 'DisciplinasTab', label: 'Disciplinas', icon: 'menu_book'},
  {key: 'CalendarioTab', label: 'Calendário', icon: 'calendar_month'},
  {key: 'NotificacoesTab', label: 'Notificações', icon: 'notifications'},
  {key: 'PerfilTab', label: 'Perfil', icon: 'person'},
];

export default function DisciplinasScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');

  const filtered = disciplines.filter(
    d =>
      d.nome.toLowerCase().includes(search.toLowerCase()) ||
      d.professor.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.screen}>
      <TopAppBar title="Lumy" brandTitle />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}>
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Disciplinas</Text>
          <Text style={styles.pageSubtitle}>
            Acompanhe seu progresso acadêmico.
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Icon
              name="search"
              size={20}
              color={colors.onSurfaceVariant}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar disciplinas ou professores..."
              placeholderTextColor={colors.outline}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        <View style={styles.list}>
          {filtered.map((d, i) => (
            <TouchableOpacity
              key={`${d.id}-${i}`}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('DisciplinaMural', {
                  disciplinaId: d.id,
                  nome: d.nome,
                  codigo: d.codigo,
                  turma: d.turma,
                })
              }>
              <Card accentColor={d.tagColor} style={styles.disciplineCard}>
                <View style={styles.cardHeader}>
                    <View style={styles.disciplineNameRow}>
                      <Icon name={d.icon} size={20} color={d.tagColor} />
                      <Text style={styles.disciplineName}>{d.nome}</Text>
                    </View>
                  <Chip label={d.tag} active color={d.tagColor} />
                </View>
                <View style={styles.professorRow}>
                  <Icon
                    name="person"
                    size={18}
                    color={colors.onSurfaceVariant}
                  />
                  <Text style={styles.professorName}>{d.professor}</Text>
                </View>
                <View style={styles.progressRow}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {width: `${d.progresso}%`},
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>{d.progresso}%</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      <BottomNavBar
        tabs={tabs}
        activeTab="DisciplinasTab"
        onTabPress={key =>
          navigation.navigate(key as keyof MainTabParamList)
        }
      />
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
    paddingHorizontal: spacing.containerPadding,
  },
  headerSection: {
    marginBottom: spacing.sectionMargin,
    marginTop: spacing.stackGap,
  },
  pageTitle: {
    ...typography.headlineLg,
    color: colors.primary,
    marginBottom: spacing.base,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  searchContainer: {
    paddingBottom: spacing.stackGap,
    backgroundColor: colors.background,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    ...shadows.card,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  list: {
    gap: spacing.stackGap,
  },
  disciplineCard: {
    gap: spacing.inlineGap,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  disciplineNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  disciplineName: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  professorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  professorName: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
});
