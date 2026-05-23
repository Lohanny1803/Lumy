import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, typography} from '../theme';

interface Tab {
  key: string;
  label: string;
}

interface TabsHeaderProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (key: string) => void;
}

export default function TabsHeader({tabs, activeTab, onTabPress}: TabsHeaderProps) {
  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.7}>
            <Text
              style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  activeTabText: {
    color: colors.primary,
  },
});
