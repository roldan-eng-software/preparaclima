import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="quiz" />
      <Stack.Screen name="localizacao" />
      <Stack.Screen name="domicilio" />
      <Stack.Screen name="revisao" />
    </Stack>
  );
}
