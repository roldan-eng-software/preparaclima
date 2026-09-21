import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function Contatos() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text variant="headlineSmall">Contatos de emergência</Text>
      <Text variant="bodyMedium" style={estilos.subtitulo}>
        Em breve: família, vizinhos, Defesa Civil e Bombeiros a um toque.
      </Text>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 12, justifyContent: "center" },
  subtitulo: { opacity: 0.7 },
});
