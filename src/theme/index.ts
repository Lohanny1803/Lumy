import {Platform, TextStyle, ViewStyle} from 'react-native';

export const colors = {
  primary: '#0096C7',
  primaryDark: '#001e2b',
  primaryLight: '#c2e8ff',
  primaryContainer: '#003448',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#26a2d4',

  secondary: '#00677d',
  secondaryLight: '#b3ebff',
  secondaryContainer: '#50d9fe',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#005c70',

  tertiary: '#001f24',
  tertiaryContainer: '#0e353b',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#7a9ea5',

  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  onErrorContainer: '#93000a',

  background: '#eefcff',
  onBackground: '#111e20',
  surface: '#ffffff',
  surfaceVariant: '#d7e5e8',
  surfaceContainer: '#e2f0f3',
  surfaceContainerLow: '#e8f6f9',
  surfaceContainerHigh: '#ddebee',
  surfaceContainerHighest: '#d7e5e8',

  onSurface: '#111e20',
  onSurfaceVariant: '#454652',

  outline: '#767683',
  outlineVariant: '#c6c5d4',

  inverseSurface: '#263335',
  inverseOnSurface: '#e5f3f6',
  inversePrimary: '#77d1ff',

  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const typography: Record<string, TextStyle> = {
  headlineLg: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    letterSpacing: -0.56,
  },
  headlineMd: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.22,
  },
  headlineSm: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  bodyLg: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyMd: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySm: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  labelMd: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSm: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 12,
  },
};

export const spacing = {
  base: 4,
  containerPadding: 20,
  stackGap: 16,
  inlineGap: 12,
  sectionMargin: 24,
  gridGutter: 16,
} as const;

export const borderRadius = {
  sm: 4,
  DEFAULT: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const shadows: Record<string, ViewStyle> = {
  card: Platform.select({
    web: {boxShadow: '0px 2px 8px rgba(0,0,0,0.04)'} as ViewStyle,
    default: {
      shadowColor: colors.black,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 2,
    },
  })!,
  fab: Platform.select({
    web: {boxShadow: '0px 4px 12px rgba(0,0,0,0.12)'} as ViewStyle,
    default: {
      shadowColor: colors.black,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
    },
  })!,
  topBar: Platform.select({
    web: {boxShadow: '0px 1px 2px rgba(0,0,0,0.08)'} as ViewStyle,
    default: {
      shadowColor: colors.black,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 2,
    },
  })!,
};
