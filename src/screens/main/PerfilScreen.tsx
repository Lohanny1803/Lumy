import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TopAppBar, BottomNavBar, Card, Icon} from '../../components';
import {colors, typography, spacing, shadows} from '../../theme';
import {MainTabParamList, RootStackParamList} from '../../navigation/types';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'PerfilTab'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const tabs = [
  {key: 'HomeTab', label: 'Início', icon: 'home'},
  {key: 'DisciplinasTab', label: 'Disciplinas', icon: 'menu_book'},
  {key: 'CalendarioTab', label: 'Calendário', icon: 'calendar_month'},
  {key: 'NotificacoesTab', label: 'Notificações', icon: 'notifications'},
  {key: 'PerfilTab', label: 'Perfil', icon: 'person'},
];

export default function PerfilScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.screen}>
      <TopAppBar
        title="Lumy"
        brandTitle
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Icon name="person" size={64} color={colors.onSurfaceVariant} />
          </View>
          <Text style={styles.profileName}>Lucas Oliveira</Text>
          <Text style={styles.profileCourse}>
            Ciência da Computação · 5º Semestre
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Desempenho Acumulado</Text>
        <View style={styles.bentoGrid}>
          <Card accentColor={colors.secondary} style={styles.bentoCard}>
            <Text style={styles.bentoLabel}>Média Global</Text>
            <View style={styles.bentoValueRow}>
              <Text style={styles.bentoValue}>8.7</Text>
              <View style={styles.trendBadge}>
                <Icon name="trending_up" size={14} color={colors.secondary} />
                <Text style={styles.trendText}>+0.2</Text>
              </View>
            </View>
          </Card>
          <Card accentColor={colors.primary} style={styles.bentoCard}>
            <Text style={styles.bentoLabel}>Frequência</Text>
            <Text style={styles.bentoValue}>94%</Text>
          </Card>
          <Card accentColor={colors.tertiaryContainer} style={styles.bentoCardFull}>
            <Text style={styles.bentoLabel}>Horas Complementares</Text>
            <View style={styles.hoursRow}>
              <Text style={styles.hoursValue}>164</Text>
              <Text style={styles.hoursTotal}>/ 200 hrs</Text>
            </View>
            <View style={styles.hoursBar}>
              <View style={[styles.hoursFill, {width: '82%'}]} />
            </View>
          </Card>
        </View>

        <Text style={styles.sectionLabel}>Preferências</Text>
        <Card style={styles.menuCard}>
          <MenuItem
            icon="person"
            label="Dados Pessoais"
            subtitle="Email, telefone e endereço"
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon="settings"
            label="Configurações"
            subtitle="Notificações e privacidade"
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon="help"
            label="Central de Ajuda"
            subtitle="Dúvidas e suporte técnico"
          />
        </Card>

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.7}
          onPress={() => navigation.replace('Auth')}>
          <Icon name="logout" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>

        <View style={{height: 100}} />
      </ScrollView>

      <BottomNavBar
        tabs={tabs}
        activeTab="PerfilTab"
        onTabPress={key =>
          navigation.navigate(key as keyof MainTabParamList)
        }
      />
    </View>
  );
}

function MenuItem({
  icon,
  label,
  subtitle,
}: {
  icon: string;
  label: string;
  subtitle: string;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
      <View style={styles.menuIcon}>
        <Icon name={icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuLabel}>{label}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <Icon
        name="chevron_right"
        size={20}
        color={colors.outline}
      />
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
    gap: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 16,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 4,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
    marginBottom: 16,
  },
  profileName: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  profileCourse: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  sectionLabel: {
    ...typography.labelMd,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bentoCard: {
    width: '47%',
    gap: 8,
  },
  bentoCardFull: {
    width: '100%',
    gap: 8,
  },
  bentoLabel: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  bentoValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  bentoValue: {
    ...typography.headlineLg,
    color: colors.onSurface,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryContainer + '30',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  trendText: {
    ...typography.bodySm,
    color: colors.secondary,
    fontWeight: '600',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  hoursValue: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  hoursTotal: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  hoursBar: {
    height: 6,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 3,
    overflow: 'hidden',
  },
  hoursFill: {
    height: '100%',
    backgroundColor: colors.tertiaryContainer,
    borderRadius: 3,
  },
  menuCard: {
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.stackGap,
    gap: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight + '40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },
  menuSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.outlineVariant,
    marginLeft: 60,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: spacing.stackGap,
    gap: 12,
  },
  logoutText: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: colors.error,
  },
});
