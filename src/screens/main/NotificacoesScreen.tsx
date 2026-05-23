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

const initialNotifications = [
  {
    id: '1',
    title: 'Novo material postado',
    subtitle: 'Prof. Ricardo · Cálculo III',
    time: '10 min atrás',
    read: false,
    type: 'secondary' as const,
  },
  {
    id: '2',
    title: 'Sua nota foi publicada',
    subtitle: 'Prova Semestral de Estruturas de Dados',
    time: '2 horas atrás',
    read: false,
    type: 'primary' as const,
  },
  {
    id: '3',
    title: 'Lembrete de Entrega',
    subtitle: 'Trabalho Interdisciplinar',
    time: '23h atrás',
    read: true,
    type: 'secondary' as const,
  },
  {
    id: '4',
    title: 'Aviso da Secretaria',
    subtitle: 'Rematrículas abertas para o próximo semestre',
    time: '1 dia atrás',
    read: true,
    type: 'secondary' as const,
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
            <TouchableOpacity onPress={markAllAsRead} activeOpacity={0.7}>
              <Text style={styles.markAllText}>Marcar todas como lidas</Text>
            </TouchableOpacity>
          )}
        </View>

        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon
              name="notifications_off"
              size={48}
              color={colors.outline}
            />
            <Text style={styles.emptyText}>Tudo em dia!</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {notifications.map(n => (
              <TouchableOpacity
                key={n.id}
                activeOpacity={0.7}
                onPress={() => markAsRead(n.id)}>
                <Card
                  style={[
                    styles.notifCard,
                    ...(n.read ? [styles.notifRead] : []),
                  ]}>
                  <View style={styles.notifRow}>
                    <View style={styles.notifDotContainer}>
                      {!n.read && (
                        <View
                          style={[
                            styles.unreadDot,
                            n.type === 'primary'
                              ? styles.dotPrimary
                              : styles.dotSecondary,
                          ]}
                        />
                      )}
                    </View>
                    <View style={styles.notifContent}>
                      <Text
                        style={[
                          styles.notifTitle,
                          n.read && styles.textRead,
                        ]}>
                        {n.title}
                      </Text>
                      <Text style={styles.notifSubtitle}>{n.subtitle}</Text>
                    </View>
                    <Text style={styles.notifTime}>{n.time}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
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
  },
  pageTitle: {
    ...typography.headlineLg,
    color: colors.primary,
  },
  markAllText: {
    ...typography.labelMd,
    color: colors.primary,
  },
  list: {
    gap: spacing.base,
  },
  notifCard: {
    padding: spacing.stackGap,
  },
  notifRead: {
    opacity: 0.5,
  },
  notifRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  notifDotContainer: {
    paddingTop: 6,
    width: 8,
    alignItems: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotPrimary: {
    backgroundColor: colors.primary,
  },
  dotSecondary: {
    backgroundColor: colors.primaryLight,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 2,
  },
  textRead: {
    fontWeight: '400',
  },
  notifSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  notifTime: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 12,
  },
  emptyText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
});
