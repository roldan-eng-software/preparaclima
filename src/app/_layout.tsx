import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { carregarPerfilPersistido, store } from "@/store";
import { hidratarPerfil } from "@/store/profileSlice";

export const unstable_settings = {
  anchor: "(tabs)",
};

function GuardRotas({ children }: { children: React.ReactNode }) {
  const segmentos = useSegments();
  const router = useRouter();
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const emOnboarding = segmentos[0] === "onboarding";
    const concluido = store.getState().profile.onboardingConcluido;
    if (!concluido && !emOnboarding) router.replace("/onboarding/quiz");
    if (concluido && emOnboarding) router.replace("/(tabs)");
    setPronto(true);
  }, [segmentos, router]);

  if (!pronto) return null;
  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    carregarPerfilPersistido().then((perfil) => {
      if (perfil?.onboardingConcluido) {
        store.dispatch(hidratarPerfil(perfil));
      }
      setHidratado(true);
    });
  }, []);

  if (!hidratado) return null;

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GuardRotas>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
        </GuardRotas>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
