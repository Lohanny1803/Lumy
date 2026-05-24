import { Tabs, useSegments } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../../src/components/Icon';
import { colors, typography, spacing, shadows } from '../../src/theme';

const TAB_ITEMS = [
  { key: 'index', label: 'Início', icon: 'home' },
  { key: 'disciplinas', label: 'Disciplinas', icon: 'menu_book' },
  { key: 'calendario', label: 'Calendário', icon: 'calendar_month' },
  { key: 'notificacoes', label: 'Notificações', icon: 'notifications' },
  { key: 'perfil', label: 'Perfil', icon: 'person' },
];

function CustomTabBar({ state, navigation }: any) {
  const segments = useSegments();
  // Hide tab bar inside disciplina detail screens
  const isDisciplinaDetail = segments.includes('[id]' as never);
  if (isDisciplinaDetail) return null;

  return (
    <View style={styles.container}>
      {TAB_ITEMS.map(item => {
        const routeIdx = state.routes.findIndex((r: any) => r.name === item.key);
        const focused = state.index === routeIdx;

        return (
          <TouchableOpacity
            key={item.key}
            style={styles.tab}
            onPress={() => {
              if (!focused) navigation.navigate(item.key);
            }}
            activeOpacity={0.7}>
            <View style={styles.iconContainer}>
              <Icon
                name={item.icon}
                size={24}
                color={focused ? colors.primary : colors.onSurfaceVariant}
                filled={focused}
              />
            </View>
            <Text style={[styles.label, focused && styles.activeLabel]}>
              {item.label}
            </Text>
            <View style={[styles.dot, focused && styles.activeDot]} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function MainLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="disciplinas" />
      <Tabs.Screen name="calendario" />
      <Tabs.Screen name="notificacoes" />
      <Tabs.Screen name="perfil" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    paddingHorizontal: spacing.base,
    ...shadows.topBar,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.base,
  },
  iconContainer: {
    position: 'relative',
  },
  label: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
    marginTop: 2,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
});
