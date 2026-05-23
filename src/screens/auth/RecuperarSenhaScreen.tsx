import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TopAppBar, Button} from '../../components';
import {colors, typography, spacing} from '../../theme';
import {AuthStackParamList} from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'RecuperarSenha'
>;

export default function RecuperarSenhaScreen() {
  const navigation = useNavigation<NavigationProp>();
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
        onBackPress={() => navigation.goBack()}
        title="EducaPlus"
        brandTitle
        centerTitle
      />
      <View style={styles.content}>
        <Animated.View
          style={[styles.lockIcon, {transform: [{scale: pulseAnim}]}]}>
          <View style={styles.iconCircle}>
            <Text style={styles.lockEmoji}>🔐</Text>
          </View>
        </Animated.View>

        <Text style={styles.title}>Esqueceu a senha?</Text>
        <Text style={styles.description}>
          Digite seu e-mail institucional e enviaremos instruções para
          redefinir sua senha.
        </Text>

        <TextInput
          style={styles.emailInput}
          placeholder="seu@email.com"
          placeholderTextColor={colors.outline}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.containerPadding,
    gap: spacing.stackGap,
    paddingTop: 64,
  },
  lockIcon: {
    marginBottom: spacing.base,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.outlineVariant,
  },
  lockEmoji: {
    fontSize: 36,
  },
  title: {
    ...typography.headlineMd,
    color: colors.onSurface,
    textAlign: 'center',
  },
  description: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 320,
  },
  emailInput: {
    width: '100%',
    maxWidth: 400,
    height: 48,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    paddingHorizontal: 16,
    ...typography.bodyMd,
    color: colors.onSurface,
    backgroundColor: colors.surface,
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
  },
});
