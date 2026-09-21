import { StyleSheet } from "react-native";
import { Banner } from "react-native-paper";

import { useRede } from "@/hooks/use-rede";

export function AvisoOffline() {
  const { offline } = useRede();
  if (!offline) return null;
  return (
    <Banner visible icon="wifi-off" style={estilos.banner}>
      Você está sem conexão. Mostrando os últimos dados salvos — podem estar
      desatualizados.
    </Banner>
  );
}

const estilos = StyleSheet.create({
  banner: { borderRadius: 12 },
});
