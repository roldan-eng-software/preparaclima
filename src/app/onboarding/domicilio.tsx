import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Chip, Text } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  alternarMobilidade,
  definirPessoasDomicilio,
} from "@/store/profileSlice";
import { MOBILIDADE_OPCOES } from "@/types/profile";

export default function Domicilio() {
  const dispatch = useAppDispatch();
  const pessoas = useAppSelector((s) => s.profile.pessoasDomicilio);
  const mobilidade = useAppSelector((s) => s.profile.mobilidade);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text variant="headlineSmall">Quem mora com você?</Text>
      <View style={estilos.contador}>
        <Button
          mode="outlined"
          onPress={() => dispatch(definirPessoasDomicilio(pessoas - 1))}
        >
          −
        </Button>
        <Text variant="headlineMedium">{pessoas}</Text>
        <Button
          mode="outlined"
          onPress={() => dispatch(definirPessoasDomicilio(pessoas + 1))}
        >
          +
        </Button>
      </View>
      <Text variant="titleMedium">Necessidades de mobilidade</Text>
      <View style={estilos.lista}>
        {MOBILIDADE_OPCOES.map((opcao) => (
          <Chip
            key={opcao.valor}
            selected={mobilidade.includes(opcao.valor)}
            onPress={() => dispatch(alternarMobilidade(opcao.valor))}
            style={estilos.chip}
          >
            {opcao.rotulo}
          </Chip>
        ))}
      </View>
      <Button
        mode="contained"
        onPress={() => router.push("/onboarding/revisao")}
      >
        Revisar perfil
      </Button>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 12, justifyContent: "center" },
  contador: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginVertical: 8,
  },
  lista: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 8 },
  chip: { marginBottom: 4 },
});
