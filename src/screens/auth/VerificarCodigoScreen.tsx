import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TopAppBar, Button} from '../../components';
import {colors, typography, spacing} from '../../theme';
import {AuthStackParamList} from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'VerificarCodigo'
>;

const CODE_LENGTH = 4;

export default function VerificarCodigoScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    setTimeout(() => inputRefs.current[0]?.focus(), 300);
  }, []);

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) {
      const digits = text.replace(/\D/g, '').split('').slice(0, CODE_LENGTH);
      const newCode = [...code];
      digits.forEach((d, i) => {
        if (i < CODE_LENGTH) {
          newCode[i] = d;
        }
      });
      setCode(newCode);
      setError(false);
      const nextIndex = Math.min(digits.length, CODE_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const digit = text.replace(/\D/g, '');
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    setError(false);

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length < CODE_LENGTH) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 1500);
  };

  return (
    <View style={styles.screen}>
      <TopAppBar
        showBack
        onBackPress={() => navigation.goBack()}
        title="Lumy"
        brandTitle
        centerTitle
      />
      <View style={styles.content}>
        <Text style={styles.title}>Verificar E-mail</Text>
        <Text style={styles.description}>
          Enviamos um código de 4 dígitos para o seu e-mail institucional.
        </Text>

        <View style={styles.codeRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {inputRefs.current[index] = ref;}}
              style={[
                styles.codeInput,
                error && styles.codeInputError,
                digit ? styles.codeInputFilled : null,
              ]}
              value={digit}
              onChangeText={text => handleChangeText(text, index)}
              onKeyPress={({nativeEvent}) =>
                handleKeyPress(nativeEvent.key, index)
              }
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              caretHidden
            />
          ))}
        </View>

        {error && (
          <Text style={styles.errorText}>
            Código inválido. Tente novamente.
          </Text>
        )}

        <Button
          title="Verificar"
          onPress={handleVerify}
          loading={loading}
          disabled={code.some(d => !d)}
          variant="secondary"
        />

        <Text style={styles.resendText}>
          Não recebeu?{' '}
          <Text style={styles.resendLink} onPress={() => {}}>
            Reenviar
          </Text>
        </Text>
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
  title: {
    ...typography.headlineMd,
    color: colors.onSurface,
    textAlign: 'center',
  },
  description: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 300,
  },
  codeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  codeInput: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    backgroundColor: colors.surface,
  },
  codeInputFilled: {
    borderColor: colors.primary,
  },
  codeInputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.bodySm,
    color: colors.error,
    textAlign: 'center',
  },
  resendText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  resendLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});
