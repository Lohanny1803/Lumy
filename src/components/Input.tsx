import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import Icon from './Icon';
import {colors, typography, spacing} from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  leftIcon?: string;
  isPassword?: boolean;
  rightLink?: {text: string; onPress: () => void};
  containerStyle?: ViewStyle;
  error?: string;
}

export default function Input({
  label,
  leftIcon,
  isPassword = false,
  rightLink,
  containerStyle,
  error,
  ...rest
}: InputProps) {
  const [secureText, setSecureText] = useState(isPassword);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {rightLink && (
            <TouchableOpacity onPress={rightLink.onPress} activeOpacity={0.7}>
              <Text style={styles.link}>{rightLink.text}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        {leftIcon && (
          <View style={styles.leftIcon}>
            <Icon name={leftIcon} size={20} color={colors.outline} />
          </View>
        )}
        <RNTextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            isPassword ? styles.inputWithRightIcon : null,
          ]}
          placeholderTextColor={colors.outline}
          secureTextEntry={secureText}
          autoCapitalize="none"
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={() => setSecureText(!secureText)}
            activeOpacity={0.7}>
            <Icon
              name={secureText ? 'visibility_off' : 'visibility'}
              size={20}
              color={colors.outline}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.base,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...typography.labelMd,
    color: colors.onSurface,
  },
  link: {
    ...typography.labelMd,
    color: colors.primary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.error,
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  input: {
    flex: 1,
    ...typography.bodyMd,
    color: colors.onSurface,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  inputWithLeftIcon: {
    paddingLeft: 40,
  },
  inputWithRightIcon: {
    paddingRight: 40,
  },
  errorText: {
    ...typography.bodySm,
    color: colors.error,
  },
});
