import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { CoresAlerta } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { RISCOS_OPCOES } from "@/types/profile";

export default function Dashboard() {
  const perfil = useAppSelector((s) => s.profile);
  const alerta = CoresAlerta.amarelo;
  const rotulosRiscos = RISCOS_OPCOES.filter((o) =>
    perfil.riscos.includes(o.valor)
  ).map((o) => o.rotulo);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Card style={[estilos.alerta, { backgroundColor: alerta.fundo }]}>
        <Card.Content>
          <Text variant="titleLarge" style={{ color: alerta.texto }}>
            🟡 {alerta.rotulo.toUpperCase()}
          </Text>
          <Text style={{ color: alerta.texto }}>
            Chuva moderada prevista para sua região nas próximas 6 horas. Fique
            atento.
          </Text>
          <Text style={[estilos.mock, { color: alerta.texto }]}>
            Dados de demonstração — integração OpenWeather/INMET pendente.
          </Text>
        </Card.Content>
      </Card>

      <Card>
        <Card.Title title="Agora (mock)" />
        <Card.Content>
          <Text>🌡️ 24°C • 🌧️ 12mm • 💨 18 km/h</Text>
          <Text style={estilos.mock}>
            Próximo alerta crítico: nenhum nas próximas 24h.
          </Text>
        </Card.Content>
      </Card>

      <Card>
        <Card.Title title="Seu perfil" />
        <Card.Content>
          <Text>Riscos: {rotulosRiscos.join(", ") || "—"}</Text>
          <Text>
            Local:{" "}
            {perfil.localizacao?.modo === "manual"
              ? `${perfil.localizacao.cidade}/${perfil.localizacao.estado}`
              : perfil.localizacao?.modo === "gps"
                ? "GPS ativo"
                : "—"}
            {" • "}
            {perfil.pessoasDomicilio}{" "}
            {perfil.pessoasDomicilio === 1 ? "pessoa" : "pessoas"}
          </Text>
        </Card.Content>
      </Card>

      <View style={estilos.acoes}>
        <Button mode="contained" onPress={() => router.push("/modal")}>
          Ativar Plano de Emergência
        </Button>
        <Text style={estilos.mock}>
          Checklist interativo (PRD 1.3) ainda não implementado.
        </Text>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, gap: 12 },
  alerta: { borderRadius: 12 },
  mock: { opacity: 0.7, marginTop: 8, fontSize: 12 },
  acoes: { gap: 8, marginTop: 4 },
});
