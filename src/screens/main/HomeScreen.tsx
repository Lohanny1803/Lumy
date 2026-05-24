import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TopAppBar, BottomNavBar, Card, Chip, Icon} from '../../components';
import {colors, typography, spacing, shadows} from '../../theme';
import {MainTabParamList} from '../../navigation/types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type NavigationProp = BottomTabNavigationProp<MainTabParamList, 'HomeTab'>;

const tabs = [
  {key: 'HomeTab', label: 'Início', icon: 'home'},
  {key: 'DisciplinasTab', label: 'Disciplinas', icon: 'menu_book'},
  {key: 'CalendarioTab', label: 'Calendário', icon: 'calendar_month'},
  {key: 'NotificacoesTab', label: 'Notificações', icon: 'notifications'},
  {key: 'PerfilTab', label: 'Perfil', icon: 'person'},
];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.screen}>
      <TopAppBar title="Lumy" subtitle="Olá, Lucas Oliveira!" brandTitle />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Card accentColor={colors.primary} style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo Acadêmico</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconLabel}>
                <Icon name="grade" size={16} color={colors.onSurfaceVariant} />
                <Text style={styles.summaryLabel}>Média Geral</Text>
              </View>
              <Text style={styles.summaryValue}>8.5</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconLabel}>
                <Icon name="pie_chart" size={16} color={colors.onSurfaceVariant} />
                <Text style={styles.summaryLabel}>Frequência</Text>
              </View>
              <Text style={styles.summaryValue}>92%</Text>
            </View>
          </View>
        </Card>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Minhas Disciplinas</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('DisciplinasTab')}
              activeOpacity={0.7}>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.disciplineGrid}>
            <Card accentColor={colors.secondary} style={styles.disciplineCard}>
              <Icon name="architecture" size={24} color={colors.secondary} />
              <Text style={styles.disciplineName}>Cálculo Diferencial</Text>
            </Card>
            <Card accentColor={colors.error} style={styles.disciplineCard}>
              <Icon name="code" size={24} color={colors.error} />
              <Text style={styles.disciplineName}>Estrutura de Dados</Text>
            </Card>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas Entregas</Text>
          <View style={styles.taskList}>
            <TaskCard
              day="24"
              title="Projeto de Algoritmos"
              subtitle="Sexta, às 23:59"
              urgency="Urgente"
              urgencyColor={colors.error}
            />
            <TaskCard
              day="26"
              title="Relatório de Física"
              subtitle="Domingo, às 18:00"
              urgency="Em Aberto"
              urgencyColor={colors.onSurfaceVariant}
            />
          </View>
        </View>

        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>
            "A educação é a arma mais poderosa que você pode usar para mudar
            o mundo."
          </Text>
          <Text style={styles.quoteAuthor}>— Nelson Mandela</Text>
          <View style={styles.quoteIcon}>
            <Icon name="auto_stories" size={100} color={colors.onPrimary} filled />
          </View>
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      <BottomNavBar
        tabs={tabs}
        activeTab="HomeTab"
        onTabPress={key =>
          navigation.navigate(key as keyof MainTabParamList)
        }
      />
    </View>
  );
}

function TaskCard({
  day,
  title,
  subtitle,
  urgency,
  urgencyColor,
}: {
  day: string;
  title: string;
  subtitle: string;
  urgency: string;
  urgencyColor: string;
}) {
  return (
    <Card style={styles.taskCard}>
      <View style={styles.taskDayContainer}>
        <Text style={styles.taskDay}>{day}</Text>
      </View>
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{title}</Text>
        <Text style={styles.taskSubtitle}>{subtitle}</Text>
      </View>
      <Chip
        label={urgency}
        active
        color={
          urgencyColor === colors.error
            ? colors.errorContainer
            : colors.surfaceContainerHigh
        }
      />
    </Card>
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
    gap: spacing.sectionMargin,
  },
  summaryCard: {
    gap: 16,
    padding: spacing.stackGap,
  },
  summaryTitle: {
    ...typography.headlineSm,
    color: colors.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  summaryIconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summaryLabel: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryValue: {
    ...typography.headlineLg,
    color: colors.primary,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.outlineVariant,
  },
  section: {
    gap: spacing.stackGap,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  seeAll: {
    ...typography.labelMd,
    color: colors.primary,
  },
  disciplineGrid: {
    flexDirection: 'row',
    gap: spacing.inlineGap,
  },
  disciplineCard: {
    flex: 1,
    height: 128,
    justifyContent: 'space-between',
  },
  disciplineName: {
    ...typography.labelMd,
    fontWeight: '700',
    color: colors.onSurface,
  },
  taskList: {
    gap: spacing.inlineGap,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: spacing.stackGap,
  },
  taskDayContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.errorContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskDay: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onErrorContainer,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    ...typography.bodyMd,
    fontWeight: '700',
    color: colors.onSurface,
  },
  taskSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  quoteCard: {
    backgroundColor: colors.primaryDark,
    padding: 24,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
    ...shadows.card,
  },
  quoteText: {
    ...typography.bodyMd,
    fontStyle: 'italic',
    color: colors.onPrimary,
    opacity: 0.9,
    marginBottom: 8,
  },
  quoteAuthor: {
    ...typography.labelMd,
    color: colors.onPrimary,
    opacity: 0.7,
  },
  quoteIcon: {
    position: 'absolute',
    bottom: -16,
    right: -16,
    opacity: 0.1,
  },
});
