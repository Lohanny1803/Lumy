import React from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {colors, shadows} from '../theme';

interface CardProps {
  children: React.ReactNode;
  accentColor?: string;
  style?: StyleProp<ViewStyle>;
  noShadow?: boolean;
}

export default function Card({
  children,
  accentColor,
  style,
  noShadow = false,
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        !noShadow && shadows.card,
        accentColor && {borderLeftWidth: 4, borderLeftColor: accentColor},
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    overflow: 'hidden',
  },
});
