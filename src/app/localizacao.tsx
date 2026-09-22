import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@/store";
import { definirLocalizacao } from "@/store/profileSlice";

export default function EditarLocalizacao() {
  const dispatch = useAppDispatch();
  const atual = useAppSelector((s) => s.profile.localizacao);
  const [cidade, setCidade] = useState(
    atual?.modo === "manual" ? (atual.cidade ?? "") : ""
  );
  const [estado, setEstado] = useState(
    atual?.modo === "manual" ? (atual.estado ?? "") : ""
  );
  const [erro, setErro] = useState("");

  async function usarGps() {
    setErro("");
    try {
      const permissao = await Location.requestForegroundPermissionsAsync();
      if (permissao.status !== "granted") {
        setErro(
          "Permissão de localização negada. Informe a cidade manualmente."
        );
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
      router.back();
    } catch {
      setErro(
        "Não foi possível obter sua localização. Tente de novo ou informe a cidade manualmente."
      );
    }
  }

  function usarManual() {
    const uf = estado.trim().toUpperCase();
    if (!cidade.trim() || uf.length !== 2) {
      setErro("Informe a cidade e a UF com 2 letras (ex.: São Carlos/SP).");
      return;
    }
    dispatch(
      definirLocalizacao({
        modo: "manual",
        cidade: cidade.trim(),
        estado: uf,
      })
    );
    router.back();
  }

  return (
    <View style={estilos.container}>
      <Text variant="headlineSmall">Editar localização</Text>
      <Text variant="bodyMedium" style={estilos.subtitulo}>
        O painel passa a mostrar o clima e os alertas da nova região.
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
      <View style={estilos.acoes}>
        <Button mode="contained" onPress={usarManual}>
          Salvar
        </Button>
        <Button mode="outlined" onPress={() => router.back()}>
          Cancelar
        </Button>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12, justifyContent: "center" },
  subtitulo: { opacity: 0.7 },
  erro: { color: "#DC2626" },
  acoes: { flexDirection: "row", gap: 8 },
});
