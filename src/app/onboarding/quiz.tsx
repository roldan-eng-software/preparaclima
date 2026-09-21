import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Chip, Text } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@/store";
import { alternarRisco } from "@/store/profileSlice";
import { RISCOS_OPCOES } from "@/types/profile";

export default function QuizRisco() {
  const dispatch = useAppDispatch();
  const riscos = useAppSelector((s) => s.profile.riscos);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text variant="headlineSmall">Qual é seu principal risco climático?</Text>
      <Text variant="bodyMedium" style={estilos.subtitulo}>
        Escolha uma ou mais opções para personalizar seus alertas.
      </Text>
      <View style={estilos.lista}>
        {RISCOS_OPCOES.map((opcao) => (
          <Chip
            key={opcao.valor}
            selected={riscos.includes(opcao.valor)}
            onPress={() => dispatch(alternarRisco(opcao.valor))}
            style={estilos.chip}
          >
            {opcao.rotulo}
          </Chip>
        ))}
      </View>
      <Button
        mode="contained"
        disabled={riscos.length === 0}
        onPress={() => router.push("/onboarding/localizacao")}
      >
        Continuar
      </Button>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 12, justifyContent: "center" },
  subtitulo: { opacity: 0.7 },
  lista: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 12 },
  chip: { marginBottom: 4 },
});
