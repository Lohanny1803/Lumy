import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, typography} from '../theme';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  color?: string;
  count?: string;
}

export default function Chip({
  label,
  active = false,
  onPress,
  color,
  count,
}: ChipProps) {
  const bgColor = active
    ? color || colors.primary
    : colors.surfaceContainerHigh;
  const textColor = active ? colors.onPrimary : colors.onSurfaceVariant;

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[styles.chip, {backgroundColor: bgColor}]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={[styles.label, {color: textColor}]}>
        {label}
        {count ? ` (${count})` : ''}
      </Text>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    marginRight: 8,
  },
  label: {
    ...typography.labelMd,
  },
});
