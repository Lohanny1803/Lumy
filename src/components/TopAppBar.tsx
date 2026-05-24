import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Image,
} from 'react-native';
import Icon from './Icon';
import {colors, typography, spacing, shadows} from '../theme';

const lumyLogo = require('../../assets/Lumy-2.png');

interface RightAction {
  icon: string;
  onPress: () => void;
  badge?: boolean;
}

interface TopAppBarProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  rightActions?: RightAction[];
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
  rightActions,
  centerTitle = false,
  brandTitle = false,
  style,
}: TopAppBarProps) {
  return (
    <View style={[styles.container, shadows.topBar, style]}>
      {/* Lado esquerdo */}
      {showBack ? (
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.iconButton}
          activeOpacity={0.7}>
          <Icon name="arrow_back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
      ) : brandTitle ? (
        <View style={styles.brandMark}>
          <Image source={lumyLogo} style={styles.brandLogo} resizeMode="contain" />
        </View>
      ) : (
        <View style={styles.iconButton} />
      )}

      {/* Centro */}
      {brandTitle ? (
        <View style={[styles.brandContainer, centerTitle && styles.brandCentered]}>
          <Text style={styles.brandName} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.brandSubtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      ) : (
        <View
          style={[
            styles.titleContainer,
            centerTitle && styles.titleCentered,
          ]}>
          {subtitle ? (
            <Text style={styles.detailSubtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
          {title ? (
            <Text style={styles.detailTitle} numberOfLines={1}>
              {title}
            </Text>
          ) : null}
        </View>
      )}

      {/* Lado direito */}
      <View style={styles.rightContainer}>
        {rightActions && rightActions.length > 0 ? (
          rightActions.map((action, i) => (
            <TouchableOpacity
              key={i}
              style={styles.iconButton}
              onPress={action.onPress}
              activeOpacity={0.7}>
              {action.badge ? (
                <View>
                  <Icon name={action.icon} size={24} color={colors.onSurface} />
                  <View style={styles.badge} />
                </View>
              ) : (
                <Icon name={action.icon} size={24} color={colors.onSurface} />
              )}
            </TouchableOpacity>
          ))
        ) : rightAction ? (
          rightAction
        ) : (
          <View style={styles.iconButton} />
        )}
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
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogo: {
    width: 26,
    height: 26,
  },
  brandContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  brandCentered: {
    alignItems: 'center',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primaryDark,
    letterSpacing: -0.4,
    lineHeight: 24,
  },
  brandSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  titleCentered: {
    alignItems: 'center',
  },
  detailSubtitle: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  detailTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badge: {
    position: 'absolute',
    top: 1,
    right: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
});
