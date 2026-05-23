import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TopAppBar, BottomNavBar, Card, Icon} from '../../components';
import {colors, typography, spacing} from '../../theme';
import {MainTabParamList} from '../../navigation/types';

type NavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'NotificacoesTab'
>;

type NotifType = 'secondary' | 'primary' | 'tertiary' | 'error';

const accentMap: Record<NotifType, string> = {
  secondary: colors.secondary,
  primary: colors.primaryDark,
  tertiary: colors.tertiary,
  error: colors.error,
};

const iconBgMap: Record<NotifType, string> = {
  secondary: colors.secondaryLight,
  primary: colors.primaryLight,
  tertiary: '#c3e9f1',
  error: colors.errorContainer,
};

const initialNotifications = [
  {
    id: '1',
    title: 'Novo material postado',
    body: 'O Prof. Ricardo postou "Cálculo III - Lista de Exercícios 04" em Matemática Avançada.',
    time: '10 min atrás',
    read: false,
    type: 'secondary' as NotifType,
    icon: 'menu_book',
    group: 'today',
  },
  {
    id: '2',
    title: 'Sua nota foi publicada',
    body: 'Resultado disponível: Prova Semestral de Estruturas de Dados. Confira no portal.',
    time: '2 horas atrás',
    read: false,
    type: 'primary' as NotifType,
    icon: 'grade',
    group: 'today',
  },
  {
    id: '3',
    title: 'Lembrete de Entrega',
    body: 'O prazo para o Trabalho Interdisciplinar encerra amanhã às 23:59.',
    time: '23h atrás',
    read: true,
    type: 'tertiary' as NotifType,
    icon: 'calendar_month',
    group: 'yesterday',
  },
  {
    id: '4',
    title: 'Aviso da Secretaria',
    body: 'As rematrículas para o próximo semestre já estão abertas através do app.',
    time: '1 dia atrás',
    read: true,
    type: 'error' as NotifType,
    icon: 'campaign',
    group: 'yesterday',
  },
];

const tabs = [
  {key: 'HomeTab', label: 'Início', icon: 'home'},
  {key: 'DisciplinasTab', label: 'Disciplinas', icon: 'menu_book'},
  {key: 'CalendarioTab', label: 'Calendário', icon: 'calendar_month'},
  {key: 'NotificacoesTab', label: 'Notificações', icon: 'notifications'},
  {key: 'PerfilTab', label: 'Perfil', icon: 'person'},
];

export default function NotificacoesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [allRead, setAllRead] = useState(false);

  const markAllAsRead = () => {
    setAllRead(true);
    setNotifications(prev => prev.map(n => ({...n, read: true})));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? {...n, read: true} : n)),
    );
  };

  const todayItems = notifications.filter(n => n.group === 'today');
  const yesterdayItems = notifications.filter(n => n.group === 'yesterday');

  return (
    <View style={styles.screen}>
      <TopAppBar title="Lumy" brandTitle />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Notificações</Text>
          {!allRead && (
            <TouchableOpacity onPress={markAllAsRead} activeOpacity={0.7} style={styles.markAllBtn}>
              <Icon name="done_all" size={18} color={colors.primary} />
              <Text style={styles.markAllText}>Marcar todas como lidas</Text>
            </TouchableOpacity>
          )}
        </View>

        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconBox}>
              <Icon name="notifications_off" size={80} color={colors.outlineVariant} />
            </View>
            <Text style={styles.emptyTitle}>Tudo em dia!</Text>
            <Text style={styles.emptyBody}>
              Você não tem novas notificações no momento.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {todayItems.map(n => (
              <NotifCard key={n.id} n={n} onPress={markAsRead} />
            ))}

            {yesterdayItems.length > 0 && (
              <View style={styles.dateSeparator}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorLabel}>Ontem</Text>
                <View style={styles.separatorLine} />
              </View>
            )}

            {yesterdayItems.map(n => (
              <NotifCard key={n.id} n={n} onPress={markAsRead} />
            ))}
          </View>
        )}

        <View style={{height: 100}} />
      </ScrollView>

      <BottomNavBar
        tabs={tabs}
        activeTab="NotificacoesTab"
        onTabPress={key =>
          navigation.navigate(key as keyof MainTabParamList)
        }
      />
    </View>
  );
}

function NotifCard({
  n,
  onPress,
}: {
  n: (typeof initialNotifications)[0];
  onPress: (id: string) => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(n.id)}>
      <Card
        accentColor={accentMap[n.type]}
        style={[styles.notifCard, n.read && styles.notifRead]}>
        <View style={styles.notifRow}>
          <View
            style={[
              styles.iconAvatar,
              {backgroundColor: iconBgMap[n.type]},
            ]}>
            <Icon name={n.icon} size={22} color={accentMap[n.type]} />
          </View>
          <View style={styles.notifContent}>
            <View style={styles.notifTitleRow}>
              <Text
                style={[styles.notifTitle, n.read && styles.notifTitleRead]}
                numberOfLines={1}>
                {n.title}
              </Text>
              <Text style={styles.notifTime}>{n.time}</Text>
            </View>
            <Text style={styles.notifBody} numberOfLines={2}>
              {n.body}
            </Text>
          </View>
          {!n.read && (
            <View
              style={[
                styles.unreadDot,
                {backgroundColor: accentMap[n.type]},
              ]}
            />
          )}
        </View>
      </Card>
    </TouchableOpacity>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sectionMargin,
    marginTop: spacing.stackGap,
    flexWrap: 'wrap',
    gap: 8,
  },
  pageTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.primaryLight + '30',
  },
  markAllText: {
    ...typography.labelMd,
    color: colors.primary,
  },
  list: {
    gap: spacing.inlineGap,
  },
  notifCard: {
    padding: spacing.stackGap,
  },
  notifRead: {
    opacity: 0.65,
  },
  notifRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  iconAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notifContent: {
    flex: 1,
    gap: 4,
  },
  notifTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  notifTitle: {
    ...typography.labelMd,
    color: colors.onSurface,
    flex: 1,
  },
  notifTitleRead: {
    fontWeight: '400',
  },
  notifTime: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    flexShrink: 0,
  },
  notifBody: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    lineHeight: 16,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    flexShrink: 0,
  },
  dateSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: spacing.base,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  separatorLabel: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  emptyIconBox: {
    width: 192,
    height: 192,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  emptyBody: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 280,
  },
});

