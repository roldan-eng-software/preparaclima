import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { useAppDispatch } from "@/store";
import { definirLocalizacao } from "@/store/profileSlice";

export default function Localizacao() {
  const dispatch = useAppDispatch();
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [erro, setErro] = useState("");

  async function usarGps() {
    setErro("");
    const permissao = await Location.requestForegroundPermissionsAsync();
    if (permissao.status !== "granted") {
      setErro("Permissão de localização negada. Informe a cidade manualmente.");
      return;
    }
    const posicao = await Location.getCurrentPositionAsync({});
    dispatch(
      definirLocalizacao({
        modo: "gps",
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
      })
    );
    router.push("/onboarding/domicilio");
  }

  function usarManual() {
    if (!cidade.trim() || !estado.trim()) {
      setErro("Informe cidade e estado.");
      return;
    }
    dispatch(
      definirLocalizacao({
        modo: "manual",
        cidade: cidade.trim(),
        estado: estado.trim(),
      })
    );
    router.push("/onboarding/domicilio");
  }

  return (
    <View style={estilos.container}>
      <Text variant="headlineSmall">Onde você mora?</Text>
      <Text variant="bodyMedium" style={estilos.subtitulo}>
        Usamos sua localização para enviar alertas da sua região.
      </Text>
      <Button mode="contained" onPress={usarGps}>
        Usar minha localização (GPS)
      </Button>
      <Text variant="bodyMedium" style={estilos.subtitulo}>
        Ou informe manualmente:
      </Text>
      <TextInput label="Cidade" value={cidade} onChangeText={setCidade} />
      <TextInput
        label="Estado (UF)"
        value={estado}
        onChangeText={setEstado}
        maxLength={2}
      />
      {!!erro && <Text style={estilos.erro}>{erro}</Text>}
      <Button mode="outlined" onPress={usarManual}>
        Continuar com cidade manual
      </Button>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12, justifyContent: "center" },
  subtitulo: { opacity: 0.7 },
  erro: { color: "#DC2626" },
});
