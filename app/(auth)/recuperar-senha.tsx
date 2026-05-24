import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { TopAppBar, Button, Input, Icon } from '../../src/components';
import { colors, typography, spacing } from '../../src/theme';

export default function RecuperarSenhaScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const handleSend = () => {
    setSent(true);
  };

  return (
    <View style={styles.screen}>
      <TopAppBar
        showBack
        onBackPress={() => router.back()}
        title="Lumy"
        brandTitle
        centerTitle
      />
      <View style={styles.content}>
        <Animated.View
          style={[styles.lockIcon, { transform: [{ scale: pulseAnim }] }]}>
          <View style={styles.iconCircle}>
            <Icon name="lock_reset" size={48} color={colors.secondary} filled />
          </View>
        </Animated.View>

        <Text style={styles.title}>Esqueceu a senha?</Text>
        <Text style={styles.description}>
          Não se preocupe! Insira seu e-mail cadastrado e enviaremos as
          instruções para redefinição.
        </Text>

        <Input
          label="E-mail"
          leftIcon="mail"
          placeholder="aluno@instituicao.edu.br"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {sent && (
          <Text style={styles.sentMessage}>
            Instruções enviadas! Verifique sua caixa de entrada.
          </Text>
        )}

        <Button
          title={sent ? 'Reenviar Instruções' : 'Enviar Instruções'}
          onPress={handleSend}
          variant="secondary"
        />

        <TouchableOpacity style={styles.helpLink} activeOpacity={0.7}>
          <Text style={styles.helpText}>Precisa de ajuda?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'stretch',
    paddingHorizontal: spacing.containerPadding,
    gap: spacing.stackGap,
    paddingTop: 64,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  lockIcon: {
    alignSelf: 'center',
    marginBottom: spacing.base,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.headlineLg,
    color: colors.onSurface,
    textAlign: 'center',
  },
  description: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 320,
  },
  sentMessage: {
    ...typography.bodySm,
    color: colors.secondary,
    textAlign: 'center',
  },
  helpLink: {
    marginTop: spacing.base,
  },
  helpText: {
    ...typography.labelMd,
    color: colors.primary,
    textAlign: 'center',
  },
});
