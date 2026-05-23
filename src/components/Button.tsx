import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import {colors, typography} from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    fullWidth && styles.fullWidth,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'outline' && styles.outline,
    variant === 'danger' && styles.danger,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    variant === 'primary' && styles.textPrimary,
    variant === 'secondary' && styles.textSecondary,
    variant === 'outline' && styles.textOutline,
    variant === 'danger' && styles.textDanger,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'outline' ? colors.primary : colors.onPrimary
          }
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  primary: {
    backgroundColor: colors.primary,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  secondary: {
    backgroundColor: colors.primaryDark,
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  danger: {
    backgroundColor: colors.transparent,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    ...typography.headlineSm,
  },
  textPrimary: {
    color: colors.onPrimary,
  },
  textSecondary: {
    color: colors.onPrimary,
  },
  textOutline: {
    color: colors.onSurface,
  },
  textDanger: {
    color: colors.error,
  },
});
