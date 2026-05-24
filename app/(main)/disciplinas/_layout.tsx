import { Stack } from 'expo-router';

export default function DisciplinasLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]/mural" />
      <Stack.Screen name="[id]/atividades" />
      <Stack.Screen name="[id]/notas" />
      <Stack.Screen name="[id]/pessoas" />
    </Stack>
  );
}
