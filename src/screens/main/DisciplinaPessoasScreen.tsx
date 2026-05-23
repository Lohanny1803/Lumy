import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TopAppBar, TabsHeader, Card, Icon} from '../../components';
import {colors, typography, spacing, shadows} from '../../theme';
import {DisciplinaStackParamList} from '../../navigation/types';

type NavProp = NativeStackNavigationProp<DisciplinaStackParamList, 'DisciplinaPessoas'>;
type RouteType = RouteProp<DisciplinaStackParamList, 'DisciplinaPessoas'>;

const tabs = [
  {key: 'mural', label: 'Mural'},
  {key: 'atividades', label: 'Atividades'},
  {key: 'notas', label: 'Notas'},
  {key: 'pessoas', label: 'Pessoas'},
];

const professores = [
  {
    id: '1',
    nome: 'Prof. Dr. Ricardo Silva',
    cargo: 'Professor Titular',
    avatar: 'RS',
  },
  {
    id: '2',
    nome: 'Profa. Dra. Mariana Hoff',
    cargo: 'Professora Assistente',
    avatar: 'MH',
  },
];

const alunos = [
  {id: '1', nome: 'Ana Beatriz Carvalho', avatar: 'AB'},
  {id: '2', nome: 'Carlos Rodrigues', avatar: 'CR'},
  {id: '3', nome: 'Daniel Souza', avatar: 'DS'},
  {id: '4', nome: 'Fernanda Lima', avatar: 'FL'},
  {id: '5', nome: 'Gabriela Costa', avatar: 'GC'},
  {id: '6', nome: 'João Pedro Silva', avatar: 'JP'},
];

export default function DisciplinaPessoasScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteType>();
  const {disciplinaId, nome} = route.params ?? {disciplinaId: '1', nome: 'Estrutura de Dados'};
  const [search, setSearch] = useState('');

  function handleTabPress(key: string) {
    const baseParams = {disciplinaId, nome, codigo: 'CIE-102', turma: 'Turma A'};
    if (key === 'atividades' || key === 'mural') {
      navigation.replace('DisciplinaAtividades', baseParams);
    } else if (key === 'notas') {
      navigation.replace('DisciplinaNotas', baseParams);
    }
  }

  const filteredAlunos = alunos.filter(a =>
    a.nome.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.screen}>
      <TopAppBar
        showBack
        onBackPress={() => navigation.goBack()}
        title={nome}
        brandTitle
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}>
        <TabsHeader
          tabs={tabs}
          activeTab="pessoas"
          onTabPress={handleTabPress}
        />

        <Text style={styles.sectionTitle}>Professores</Text>
        <View style={styles.profList}>
          {professores.map(p => (
            <Card key={p.id} style={styles.personCard}>
              <View style={styles.personRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{p.avatar}</Text>
                </View>
                <View style={styles.personInfo}>
                  <Text style={styles.personName}>{p.nome}</Text>
                  <Text style={styles.personRole}>{p.cargo}</Text>
                </View>
                <TouchableOpacity
                  style={styles.emailButton}
                  activeOpacity={0.7}>
                  <Icon name="email" size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>

        <View style={styles.studentsHeader}>
          <Text style={styles.sectionTitle}>Colegas de Turma</Text>
          <Text style={styles.studentCount}>32 alunos</Text>
        </View>

        <View style={styles.searchWrapper}>
          <Icon name="search" size={20} color={colors.onSurfaceVariant} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar aluno..."
            placeholderTextColor={colors.outline}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.studentsGrid}>
          {filteredAlunos.map(a => (
            <TouchableOpacity
              key={a.id}
              style={styles.studentCard}
              activeOpacity={0.7}>
              <View style={styles.studentAvatar}>
                <Text style={styles.studentAvatarText}>{a.avatar}</Text>
              </View>
              <Text style={styles.studentName} numberOfLines={2}>
                {a.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.loadMore} activeOpacity={0.7}>
          <Icon name="expand_more" size={20} color={colors.primary} />
          <Text style={styles.loadMoreText}>Carregar mais alunos</Text>
        </TouchableOpacity>

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
  sectionTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginTop: spacing.sectionMargin,
    marginBottom: spacing.stackGap,
  },
  profList: {
    gap: spacing.inlineGap,
  },
  personCard: {
    padding: spacing.stackGap,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.labelMd,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },
  personRole: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  emailButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight + '30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: spacing.sectionMargin,
  },
  studentCount: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: spacing.stackGap,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  studentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.inlineGap,
  },
  studentCard: {
    width: '30%',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.stackGap,
    ...shadows.card,
  },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentAvatarText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
    fontWeight: '700',
  },
  studentName: {
    ...typography.bodySm,
    color: colors.onSurface,
    textAlign: 'center',
  },
  loadMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: spacing.stackGap,
    paddingVertical: 12,
  },
  loadMoreText: {
    ...typography.labelMd,
    color: colors.primary,
  },
});
