import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { TopAppBar, TabsHeader, Card, Icon } from '../../../../src/components';
import { colors, typography, spacing, shadows } from '../../../../src/theme';

const tabs = [
  { key: 'mural', label: 'Mural' },
  { key: 'atividades', label: 'Atividades' },
  { key: 'notas', label: 'Notas' },
  { key: 'pessoas', label: 'Pessoas' },
];

const professores = [
  { id: '1', nome: 'Prof. Dr. Ricardo Silva', cargo: 'Professor Titular', avatar: 'RS' },
  { id: '2', nome: 'Profa. Dra. Mariana Hoff', cargo: 'Professora Assistente', avatar: 'MH' },
];

const alunos = [
  { id: '1', nome: 'Ana Beatriz Carvalho', avatar: 'AB' },
  { id: '2', nome: 'Carlos Rodrigues', avatar: 'CR' },
  { id: '3', nome: 'Daniel Souza', avatar: 'DS' },
  { id: '4', nome: 'Fernanda Lima', avatar: 'FL' },
  { id: '5', nome: 'Gabriela Costa', avatar: 'GC' },
  { id: '6', nome: 'João Pedro Silva', avatar: 'JP' },
];

export default function PessoasScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; nome: string; codigo: string; turma: string }>();
  const { nome = 'Disciplina' } = params;
  const [search, setSearch] = useState('');

  function handleTabPress(key: string) {
    if (key === 'mural') {
      router.replace({ pathname: '/(main)/disciplinas/[id]/mural', params });
    } else if (key === 'atividades') {
      router.replace({ pathname: '/(main)/disciplinas/[id]/atividades', params });
    } else if (key === 'notas') {
      router.replace({ pathname: '/(main)/disciplinas/[id]/notas', params });
    }
  }

  const filteredAlunos = alunos.filter(a =>
    a.nome.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.screen}>
      <TopAppBar
        showBack
        onBackPress={() => router.back()}
        title={nome}
        brandTitle
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}>
        <TabsHeader tabs={tabs} activeTab="pessoas" onTabPress={handleTabPress} />

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
                <TouchableOpacity style={styles.emailButton} activeOpacity={0.7}>
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
            <TouchableOpacity key={a.id} style={styles.studentCard} activeOpacity={0.7}>
              <View style={styles.studentAvatar}>
                <Text style={styles.studentAvatarText}>{a.avatar}</Text>
              </View>
              <Text style={styles.studentName} numberOfLines={2}>{a.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.loadMore} activeOpacity={0.7}>
          <Icon name="expand_more" size={20} color={colors.primary} />
          <Text style={styles.loadMoreText}>Carregar mais alunos</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, marginTop: 64 },
  scrollContent: { padding: spacing.containerPadding },
  sectionTitle: { ...typography.headlineSm, color: colors.onSurface, marginTop: spacing.sectionMargin, marginBottom: spacing.stackGap },
  profList: { gap: spacing.inlineGap },
  personCard: { padding: spacing.stackGap },
  personRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  avatarText: { ...typography.labelMd, color: colors.primaryDark, fontWeight: '700' },
  personInfo: { flex: 1 },
  personName: { ...typography.bodyMd, fontWeight: '700', color: colors.onSurface },
  personRole: { ...typography.bodySm, color: colors.onSurfaceVariant },
  emailButton: { padding: 8 },
  studentsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sectionMargin, marginBottom: spacing.stackGap },
  studentCount: { ...typography.bodySm, color: colors.onSurfaceVariant },
  searchWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 12,
    paddingHorizontal: 16, height: 48, marginBottom: spacing.stackGap, ...shadows.card,
  },
  searchInput: { flex: 1, marginLeft: 12, ...typography.bodyMd, color: colors.onSurface },
  studentsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.inlineGap },
  studentCard: { width: '30%', alignItems: 'center', gap: 8, padding: spacing.base },
  studentAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center' },
  studentAvatarText: { ...typography.labelMd, color: colors.onSurfaceVariant, fontWeight: '700' },
  studentName: { ...typography.labelSm, color: colors.onSurface, textAlign: 'center' },
  loadMore: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: spacing.sectionMargin, padding: spacing.stackGap },
  loadMoreText: { ...typography.labelMd, color: colors.primary },
});
