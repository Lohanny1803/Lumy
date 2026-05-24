import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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

const posts = [
  {
    id: '1',
    autor: 'Prof. Dr. Ricardo Silva',
    avatar: 'RS',
    cargo: 'Professor',
    tempo: '2 horas atrás',
    conteudo: 'Pessoal, a lista de exercícios 04 já está disponível na aba de Atividades. Prazo de entrega: domingo, 26/05, às 23:59. Qualquer dúvida, postem aqui no mural!',
    anexo: null,
    curtidas: 12,
    comentarios: 3,
    tipo: 'aviso' as const,
  },
  {
    id: '2',
    autor: 'Prof. Dr. Ricardo Silva',
    avatar: 'RS',
    cargo: 'Professor',
    tempo: '1 dia atrás',
    conteudo: 'Material complementar sobre Árvores Binárias adicionado. Recomendo a leitura antes da próxima aula.',
    anexo: { nome: 'arvores_binarias_slides.pdf', tipo: 'pdf' },
    curtidas: 8,
    comentarios: 1,
    tipo: 'material' as const,
  },
  {
    id: '3',
    autor: 'Ana Beatriz Carvalho',
    avatar: 'AB',
    cargo: 'Aluna',
    tempo: '2 dias atrás',
    conteudo: 'Alguém conseguiu resolver o exercício 7 da lista 03? Estou travada na parte de recursão.',
    anexo: null,
    curtidas: 4,
    comentarios: 5,
    tipo: 'duvida' as const,
  },
  {
    id: '4',
    autor: 'Profa. Dra. Mariana Hoff',
    avatar: 'MH',
    cargo: 'Professora Assistente',
    tempo: '3 dias atrás',
    conteudo: 'Lembrete: a P2 será realizada no dia 05/06, das 14h às 16h, no Laboratório 3. Conteúdo: pilhas, filas e árvores.',
    anexo: null,
    curtidas: 21,
    comentarios: 7,
    tipo: 'prova' as const,
  },
];

const tipoConfig = {
  aviso: { icon: 'campaign', color: colors.primary, label: 'Aviso' },
  material: { icon: 'attachment', color: colors.secondary, label: 'Material' },
  duvida: { icon: 'forum', color: colors.onSurfaceVariant, label: 'Dúvida' },
  prova: { icon: 'warning', color: colors.error, label: 'Prova' },
};

export default function MuralScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; nome: string; codigo: string; turma: string }>();
  const { id, nome = 'Disciplina', codigo = '', turma = '' } = params;
  const [curtidas, setCurtidas] = useState<Record<string, boolean>>({});
  const [comentarioAberto, setComentarioAberto] = useState<string | null>(null);

  function handleTabPress(key: string) {
    if (key === 'atividades') {
      router.replace({ pathname: '/(main)/disciplinas/[id]/atividades', params });
    } else if (key === 'notas') {
      router.replace({ pathname: '/(main)/disciplinas/[id]/notas', params });
    } else if (key === 'pessoas') {
      router.replace({ pathname: '/(main)/disciplinas/[id]/pessoas', params });
    }
  }

  function toggleCurtida(postId: string) {
    setCurtidas(prev => ({ ...prev, [postId]: !prev[postId] }));
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
        <TabsHeader tabs={tabs} activeTab="mural" onTabPress={handleTabPress} />

        <TouchableOpacity style={styles.newPostBox} activeOpacity={0.8}>
          <View style={styles.newPostAvatar}>
            <Icon name="person" size={22} color={colors.onSurfaceVariant} />
          </View>
          <View style={styles.newPostInput}>
            <Text style={styles.newPostPlaceholder}>
              Compartilhe algo com a turma...
            </Text>
          </View>
          <Icon name="send" size={20} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.postList}>
          {posts.map(post => {
            const config = tipoConfig[post.tipo];
            const curtiu = curtidas[post.id] ?? false;
            const totalCurtidas = curtiu ? post.curtidas + 1 : post.curtidas;

            return (
              <Card key={post.id} accentColor={config.color} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={[styles.authorAvatar, { backgroundColor: config.color + '22' }]}>
                    <Text style={[styles.authorAvatarText, { color: config.color }]}>
                      {post.avatar}
                    </Text>
                  </View>
                  <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>{post.autor}</Text>
                    <View style={styles.authorMeta}>
                      <Text style={styles.authorCargo}>{post.cargo}</Text>
                      <Text style={styles.dotSep}>·</Text>
                      <Text style={styles.postTempo}>{post.tempo}</Text>
                    </View>
                  </View>
                  <View style={[styles.tipoBadge, { backgroundColor: config.color + '18' }]}>
                    <Icon name={config.icon} size={14} color={config.color} />
                    <Text style={[styles.tipoLabel, { color: config.color }]}>
                      {config.label}
                    </Text>
                  </View>
                </View>

                <Text style={styles.postConteudo}>{post.conteudo}</Text>

                {post.anexo && (
                  <TouchableOpacity style={styles.anexoBox} activeOpacity={0.7}>
                    <Icon name="attachment" size={18} color={colors.primary} />
                    <Text style={styles.anexoNome} numberOfLines={1}>
                      {post.anexo.nome}
                    </Text>
                    <Icon name="chevron_right" size={18} color={colors.outline} />
                  </TouchableOpacity>
                )}

                <View style={styles.postFooter}>
                  <TouchableOpacity
                    style={styles.footerAction}
                    activeOpacity={0.7}
                    onPress={() => toggleCurtida(post.id)}>
                    <Icon
                      name="grade"
                      size={18}
                      color={curtiu ? colors.primary : colors.onSurfaceVariant}
                    />
                    <Text style={[styles.footerActionText, curtiu && { color: colors.primary }]}>
                      {totalCurtidas}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.footerAction}
                    activeOpacity={0.7}
                    onPress={() =>
                      setComentarioAberto(comentarioAberto === post.id ? null : post.id)
                    }>
                    <Icon name="forum" size={18} color={colors.onSurfaceVariant} />
                    <Text style={styles.footerActionText}>{post.comentarios}</Text>
                  </TouchableOpacity>
                </View>

                {comentarioAberto === post.id && (
                  <View style={styles.commentBox}>
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Escreva um comentário..."
                      placeholderTextColor={colors.outline}
                      multiline
                    />
                    <TouchableOpacity style={styles.commentSend} activeOpacity={0.7}>
                      <Icon name="send" size={18} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                )}
              </Card>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, marginTop: 64 },
  scrollContent: { padding: spacing.containerPadding },
  newPostBox: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface, borderRadius: 12,
    borderWidth: 1, borderColor: colors.outlineVariant,
    padding: spacing.stackGap, marginTop: spacing.stackGap,
    marginBottom: spacing.sectionMargin, ...shadows.card,
  },
  newPostAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center', justifyContent: 'center',
  },
  newPostInput: { flex: 1 },
  newPostPlaceholder: { ...typography.bodyMd, color: colors.outline },
  postList: { gap: spacing.stackGap },
  postCard: { gap: spacing.inlineGap },
  postHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  authorAvatar: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  authorAvatarText: { ...typography.labelMd, fontWeight: '700' },
  authorInfo: { flex: 1 },
  authorName: { ...typography.bodyMd, fontWeight: '700', color: colors.onSurface },
  authorMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  authorCargo: { ...typography.bodySm, color: colors.onSurfaceVariant },
  dotSep: { ...typography.bodySm, color: colors.outline },
  postTempo: { ...typography.bodySm, color: colors.outline },
  tipoBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999,
  },
  tipoLabel: { ...typography.labelSm, fontWeight: '600' },
  postConteudo: { ...typography.bodyMd, color: colors.onSurface, lineHeight: 22 },
  anexoBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.surfaceContainerHigh, borderRadius: 8, padding: 10,
  },
  anexoNome: { ...typography.bodySm, color: colors.primary, flex: 1 },
  postFooter: { flexDirection: 'row', gap: 16, paddingTop: 4 },
  footerAction: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerActionText: { ...typography.labelMd, color: colors.onSurfaceVariant },
  commentBox: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 8,
    backgroundColor: colors.surfaceContainerHigh, borderRadius: 8, padding: 10,
  },
  commentInput: {
    flex: 1, ...typography.bodyMd, color: colors.onSurface,
    minHeight: 36, maxHeight: 80,
  },
  commentSend: { padding: 4 },
});
