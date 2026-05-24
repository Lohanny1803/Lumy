import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Input, Button } from '../../src/components';
import { colors, typography, spacing, shadows } from '../../src/theme';

const lumyLogo = require('../../assets/Lumy-2.png');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(main)/');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Image source={lumyLogo} style={styles.logo} resizeMode="contain" />
            </View>
            <View style={styles.titleGroup}>
              <Text style={styles.title}>Bem-vindo de volta</Text>
              <Text style={styles.subtitle}>
                Acesse sua conta para continuar seus estudos
              </Text>
            </View>
          </View>

          <View style={styles.form}>
            <Input
              label="E-mail"
              leftIcon="mail"
              placeholder="seu@email.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Input
              label="Senha"
              leftIcon="lock"
              placeholder="••••••••"
              isPassword
              value={password}
              onChangeText={setPassword}
              rightLink={{
                text: 'Esqueci minha senha',
                onPress: () => router.push('/(auth)/recuperar-senha'),
              }}
            />

            <Button
              title="Entrar"
              onPress={handleLogin}
              loading={loading}
              disabled={!email || !password}
              variant="secondary"
            />
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou entre com</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
            <Text style={styles.googleG}>G</Text>
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Não tem uma conta? </Text>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/cadastro')}
              activeOpacity={0.7}>
              <Text style={styles.footerLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.containerPadding,
    minHeight: '100%',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 32,
    gap: 32,
    ...shadows.card,
    maxWidth: 448,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: colors.primaryDark,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    ...shadows.topBar,
  },
  logo: {
    width: 58,
    height: 58,
  },
  titleGroup: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    ...typography.headlineLg,
    color: colors.onSurface,
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  form: {
    gap: spacing.stackGap,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  dividerText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginHorizontal: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingVertical: 12,
    borderRadius: 8,
  },
  googleG: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4285F4',
  },
  socialText: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  footerLink: {
    ...typography.labelMd,
    color: colors.primary,
  },
});
