import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from './Icon';
import {colors, typography, spacing, shadows} from '../theme';

interface TopAppBarProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  centerTitle?: boolean;
  brandTitle?: boolean;
  style?: ViewStyle;
}

export default function TopAppBar({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightAction,
  centerTitle = false,
  brandTitle = false,
  style,
}: TopAppBarProps) {
  return (
    <View style={[styles.container, shadows.topBar, style]}>
      {showBack ? (
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backButton}
          activeOpacity={0.7}>
          <Icon name="arrow_back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}

      <View
        style={[
          styles.titleContainer,
          centerTitle && styles.titleCentered,
        ]}>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
        {title && (
          <Text
            style={[
              styles.title,
              brandTitle && styles.brandTitle,
            ]}
            numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      <View style={styles.rightContainer}>
        {rightAction || <View style={styles.backButton} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    paddingHorizontal: spacing.containerPadding,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleCentered: {
    alignItems: 'center',
  },
  title: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  brandTitle: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  subtitle: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
