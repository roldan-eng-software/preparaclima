import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@/store";
import { concluirOnboarding } from "@/store/profileSlice";
import { MOBILIDADE_OPCOES, RISCOS_OPCOES } from "@/types/profile";

export default function Revisao() {
  const dispatch = useAppDispatch();
  const perfil = useAppSelector((s) => s.profile);

  const rotulosRiscos = RISCOS_OPCOES.filter((o) =>
    perfil.riscos.includes(o.valor)
  ).map((o) => o.rotulo);
  const rotulosMobilidade = MOBILIDADE_OPCOES.filter((o) =>
    perfil.mobilidade.includes(o.valor)
  ).map((o) => o.rotulo);

  function finalizar() {
    dispatch(concluirOnboarding());
    router.replace("/(tabs)");
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text variant="headlineSmall">Revise seu perfil de risco</Text>
      <Card style={estilos.card}>
        <Card.Title title="Riscos" />
        <Card.Content>
          <Text>{rotulosRiscos.join(", ") || "Nenhum selecionado"}</Text>
        </Card.Content>
      </Card>
      <Card style={estilos.card}>
        <Card.Title title="Localização" />
        <Card.Content>
          <Text>
            {perfil.localizacao?.modo === "gps" &&
              `GPS: ${perfil.localizacao.latitude?.toFixed(4)}, ${perfil.localizacao.longitude?.toFixed(4)}`}
            {perfil.localizacao?.modo === "manual" &&
              `${perfil.localizacao.cidade} / ${perfil.localizacao.estado}`}
            {!perfil.localizacao && "Não informada"}
          </Text>
        </Card.Content>
      </Card>
      <Card style={estilos.card}>
        <Card.Title title="Domicílio" />
        <Card.Content>
          <Text>
            {perfil.pessoasDomicilio}{" "}
            {perfil.pessoasDomicilio === 1 ? "pessoa" : "pessoas"}
            {rotulosMobilidade.length > 0 &&
              ` • ${rotulosMobilidade.join(", ")}`}
          </Text>
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={finalizar}>
        Começar a usar o ClimaSafe
      </Button>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 12, justifyContent: "center" },
  card: { marginBottom: 4 },
});
