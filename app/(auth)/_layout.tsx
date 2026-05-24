import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="cadastro" />
      <Stack.Screen name="recuperar-senha" />
      <Stack.Screen name="verificar-codigo" />
    </Stack>
  );
}
