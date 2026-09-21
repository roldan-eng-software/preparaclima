import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function Plano() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text variant="headlineSmall">Plano de preparação</Text>
      <Text variant="bodyMedium" style={estilos.subtitulo}>
        Em breve: checklist Antes, Durante e Depois para o seu risco.
      </Text>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 12, justifyContent: "center" },
  subtitulo: { opacity: 0.7 },
});
