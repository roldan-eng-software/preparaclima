import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { carregarPerfilPersistido, store, useAppSelector } from "@/store";
import { hidratarPerfil } from "@/store/profileSlice";
import { carregarProgresso, hidratarProgresso } from "@/store/progressoSlice";
import { carregarContatos, hidratarContatos } from "@/store/contatosSlice";
import { carregarAvisos, hidratarAvisos } from "@/store/avisosSlice";
import { registrarTarefaAvisos } from "@/services/avisos";

export const unstable_settings = {
  anchor: "(tabs)",
};

function GuardRotas({ children }: { children: React.ReactNode }) {
  const segmentos = useSegments();
  const router = useRouter();
  const concluido = useAppSelector((s) => s.profile.onboardingConcluido);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const emOnboarding = segmentos[0] === "onboarding";
    if (!concluido && !emOnboarding) router.replace("/onboarding/quiz");
    if (concluido && emOnboarding) router.replace("/(tabs)");
    setPronto(true);
  }, [segmentos, router, concluido]);

  if (!pronto) return null;
  return <>{children}</>;
}

function useObservadorAvisos() {
  const router = useRouter();
  useEffect(() => {
    try {
      const ultima = Notifications.getLastNotificationResponse();
      const url = ultima?.notification.request.content.data?.url;
      if (typeof url === "string") router.replace(url as "/(tabs)");
    } catch {
      // Notifications indisponível (web): segue o fluxo normal.
    }
    const inscricao = Notifications.addNotificationResponseReceivedListener(
      (resposta) => {
        const url = resposta.notification.request.content.data?.url;
        if (typeof url === "string") router.replace(url as "/(tabs)");
      }
    );
    return () => inscricao.remove();
  }, [router]);
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    carregarPerfilPersistido().then((perfil) => {
      if (perfil?.onboardingConcluido) {
        store.dispatch(hidratarPerfil(perfil));
      }
      carregarProgresso().then((progresso) => {
        if (progresso) store.dispatch(hidratarProgresso(progresso));
        carregarContatos().then((contatos) => {
          if (contatos) store.dispatch(hidratarContatos(contatos));
          carregarAvisos().then((avisos) => {
            if (avisos) store.dispatch(hidratarAvisos(avisos));
            registrarTarefaAvisos().catch(() => {});
            setHidratado(true);
          });
        });
      });
    });
  }, []);

  if (!hidratado) return null;

  return (
    <Provider store={store}>
      <AppInterno colorScheme={colorScheme} />
    </Provider>
  );
}

function AppInterno({
  colorScheme,
}: {
  colorScheme: "light" | "dark" | null | undefined;
}) {
  useObservadorAvisos();
  return (
    <PaperProvider
      theme={colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GuardRotas>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen
              name="privacidade"
              options={{ title: "Privacidade" }}
            />
          </Stack>
        </GuardRotas>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
