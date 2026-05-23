import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from './Icon';
import {colors, shadows} from '../theme';

interface FABProps {
  onPress: () => void;
  icon?: string;
  label?: string;
}

export default function FAB({onPress, icon = 'add', label}: FABProps) {
  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
      activeOpacity={0.8}>
      {label ? (
        <Text style={styles.label}>{label}</Text>
      ) : (
        <Icon name={icon} size={28} color={colors.onPrimary} filled />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 40,
    ...shadows.fab,
  },
  label: {
    color: colors.onPrimary,
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 30,
    textAlign: 'center',
  },
});
