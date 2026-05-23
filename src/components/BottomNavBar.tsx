import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from './Icon';
import {colors, typography, spacing, shadows} from '../theme';

interface TabItem {
  key: string;
  label: string;
  icon: string;
  badge?: boolean;
}

interface BottomNavBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (key: string) => void;
}

export default function BottomNavBar({
  tabs,
  activeTab,
  onTabPress,
}: BottomNavBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.7}>
            <View style={styles.iconContainer}>
              <Icon
                name={tab.icon}
                size={24}
                color={isActive ? colors.primary : colors.onSurfaceVariant}
                filled={isActive}
              />
              {tab.badge && <View style={styles.badge} />}
            </View>
            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}>
              {tab.label}
            </Text>
            <View
              style={[
                styles.dot,
                isActive && styles.activeDot,
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
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
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
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
    marginTop: 2,
    opacity: 0,
  },
  activeDot: {
    backgroundColor: colors.primary,
    opacity: 1,
  },
});
