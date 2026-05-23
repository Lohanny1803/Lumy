import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Input, Button, Icon} from '../../components';
import {colors, typography, spacing, shadows} from '../../theme';
import {AuthStackParamList, RootStackParamList} from '../../navigation/types';
import {CompositeNavigationProp} from '@react-navigation/native';

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, 'Cadastro'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function CadastroScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Main');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.blur} />
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Icon name="school" size={32} color={colors.onPrimary} filled />
            </View>
            <View style={styles.titleGroup}>
              <Text style={styles.title}>Criar Conta</Text>
              <Text style={styles.subtitle}>
                Preencha os dados para começar sua jornada
              </Text>
            </View>
          </View>

          <View style={styles.form}>
            <Input
              label="Nome Completo"
              placeholder="Seu nome completo"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />

            <Input
              label="E-mail Institucional"
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
            />

            <Input
              label="Confirmar Senha"
              leftIcon="lock_reset"
              placeholder="••••••••"
              isPassword
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAccepted(!accepted)}
              activeOpacity={0.7}>
              <View
                style={[
                  styles.checkbox,
                  accepted && styles.checkboxChecked,
                ]}>
                {accepted && (
                  <Icon name="check_circle" size={16} color={colors.onPrimary} filled />
                )}
              </View>
              <Text style={styles.checkboxText}>
                Aceito os{' '}
                <Text style={styles.checkboxLink}>Termos de Uso</Text> e a{' '}
                <Text style={styles.checkboxLink}>Política de Privacidade</Text>
              </Text>
            </TouchableOpacity>

            <Button
              title="Criar minha conta"
              onPress={handleRegister}
              loading={loading}
              disabled={!accepted}
              variant="secondary"
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem uma conta? </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}>
              <Text style={styles.footerLink}>Entre agora</Text>
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
    backgroundColor: colors.primaryDark,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.containerPadding,
    minHeight: '100%',
  },
  blur: {
    position: 'absolute',
    top: -100,
    left: -100,
    right: -100,
    bottom: -100,
    backgroundColor: colors.background,
    opacity: 0.15,
    borderRadius: 999,
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    flex: 1,
    lineHeight: 18,
  },
  checkboxLink: {
    color: colors.primary,
    fontWeight: '600',
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
