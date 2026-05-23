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
import {TopAppBar, BottomNavBar, Chip, Card, Icon} from '../../components';
import {colors, typography, spacing, shadows} from '../../theme';
import {MainTabParamList} from '../../navigation/types';

type NavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'CalendarioTab'
>;

const DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const events = [
  {
    id: '1',
    time: '08:30h',
    title: 'Cálculo Diferencial II',
    type: 'Aula',
    typeColor: colors.primary,
    online: true,
    participants: '3+12',
  },
  {
    id: '2',
    time: '14:00h',
    title: 'Física Clássica',
    type: 'Prova',
    typeColor: colors.error,
    note: 'Urgente: Revisar Fórmulas',
  },
  {
    id: '3',
    time: '19:00h',
    title: 'Algoritmos Estruturados',
    type: 'Entrega',
    typeColor: colors.secondary,
    online: true,
  },
];

const tabs = [
  {key: 'HomeTab', label: 'Início', icon: 'home'},
  {key: 'DisciplinasTab', label: 'Disciplinas', icon: 'menu_book'},
  {key: 'CalendarioTab', label: 'Calendário', icon: 'calendar_month', badge: true},
  {key: 'NotificacoesTab', label: 'Notificações', icon: 'notifications'},
  {key: 'PerfilTab', label: 'Perfil', icon: 'person'},
];

const filters = ['Todos', 'Aulas', 'Provas', 'Trabalhos'];

export default function CalendarioScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDay, setSelectedDay] = useState(9);
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [currentMonth, _setCurrentMonth] = useState(9); // Outubro

  return (
    <View style={styles.screen}>
      <TopAppBar title="Lumy" brandTitle />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.calendarCard}>
          <View style={styles.monthHeader}>
            <TouchableOpacity activeOpacity={0.7}>
              <Icon
                name="chevron_left"
                size={24}
                color={colors.onSurface}
              />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
              {MONTHS[currentMonth]} 2023
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Icon
                name="chevron_right"
                size={24}
                color={colors.onSurface}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.weekDays}>
            {DAYS.map((day, i) => (
              <Text key={i} style={styles.weekDay}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {[26, 27, 28, 29, 30].map(d => (
              <View key={`prev-${d}`} style={styles.dayCell}>
                <Text style={styles.dayOther}>{d}</Text>
              </View>
            ))}
            {Array.from({length: 15}, (_, i) => i + 1).map(d => (
              <TouchableOpacity
                key={d}
                style={[
                  styles.dayCell,
                  d === selectedDay && styles.daySelected,
                ]}
                onPress={() => setSelectedDay(d)}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.dayText,
                    d === selectedDay && styles.dayTextSelected,
                  ]}>
                  {d}
                </Text>
                {[2, 4, 11].includes(d) && (
                  <View style={styles.dayDot} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterContent}>
          {filters.map(f => (
            <Chip
              key={f}
              label={f}
              active={f === selectedFilter}
              onPress={() => setSelectedFilter(f)}
            />
          ))}
        </ScrollView>

        <Text style={styles.eventsTitle}>
          Eventos de Hoje (09 Out)
        </Text>

        <View style={styles.eventsList}>
          {events.map(event => (
            <Card key={event.id} accentColor={event.typeColor}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventTime}>{event.time}</Text>
                <Chip label={event.type} active color={event.typeColor} />
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventMeta}>
                {event.online && (
                  <View style={styles.onlineBadge}>
                    <Icon name="circle" size={8} color={colors.secondary} filled />
                    <Text style={styles.onlineText}>Online</Text>
                  </View>
                )}
                {event.participants && (
                  <View style={styles.participants}>
                    <Icon name="groups" size={14} color={colors.onSurfaceVariant} />
                    <Text style={styles.participantsText}>
                      {event.participants}
                    </Text>
                  </View>
                )}
                {event.note && (
                  <Text style={styles.eventNote}>{event.note}</Text>
                )}
              </View>
            </Card>
          ))}
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      <BottomNavBar
        tabs={tabs}
        activeTab="CalendarioTab"
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
  calendarCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.containerPadding,
    marginBottom: spacing.stackGap,
    ...shadows.card,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.stackGap,
  },
  monthTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    fontWeight: '700',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: spacing.base,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  daySelected: {
    backgroundColor: colors.primary,
  },
  dayText: {
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  dayOther: {
    ...typography.bodyMd,
    color: colors.outline,
  },
  dayTextSelected: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  dayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 2,
  },
  filterRow: {
    marginBottom: spacing.stackGap,
  },
  filterContent: {
    paddingVertical: spacing.base,
  },
  eventsTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginBottom: spacing.stackGap,
  },
  eventsList: {
    gap: spacing.inlineGap,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  eventTime: {
    ...typography.labelMd,
    color: colors.primary,
  },
  eventTitle: {
    ...typography.bodyMd,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.base,
  },
  eventMeta: {
    flexDirection: 'row',
    gap: spacing.inlineGap,
    flexWrap: 'wrap',
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  onlineText: {
    ...typography.bodySm,
    color: colors.secondary,
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  participantsText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  eventNote: {
    ...typography.bodySm,
    color: colors.error,
    fontStyle: 'italic',
  },
});
