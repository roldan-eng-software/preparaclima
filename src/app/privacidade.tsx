import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Dialog,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

import { store } from "@/store";
import { reiniciarOnboarding } from "@/store/profileSlice";
import { hidratarProgresso } from "@/store/progressoSlice";
import { hidratarContatos } from "@/store/contatosSlice";
import { hidratarAvisos } from "@/store/avisosSlice";
import { AVISOS_PADRAO } from "@/types/avisos";

const CHAVES_LOCAIS = [
  "@preparaclima:perfil",
  "@preparaclima:painel",
  "@preparaclima:progresso",
  "@preparaclima:contatos",
  "@preparaclima:avisos",
  "@climasafe:perfil",
];

export default function Privacidade() {
  const [passo, setPasso] = useState<0 | 1 | 2>(0);
  const [confirmacao, setConfirmacao] = useState("");

  async function apagarTudo() {
    try {
      await AsyncStorage.multiRemove(CHAVES_LOCAIS);
    } catch {
      // segue mesmo se alguma chave falhar: o estado em memória é zerado abaixo
    }
    store.dispatch(reiniciarOnboarding());
    store.dispatch(hidratarProgresso({}));
    store.dispatch(hidratarContatos([]));
    store.dispatch(hidratarAvisos(AVISOS_PADRAO));
    setPasso(0);
    setConfirmacao("");
    router.replace("/onboarding/quiz");
  }

  return (
    <ScrollView contentContainerStyle={estilos.lista}>
      <Text variant="headlineSmall">Privacidade</Text>
      <Card>
        <Card.Title title="O que fica no seu aparelho" />
        <Card.Content>
          <Text variant="bodyMedium">
            Seu perfil de risco, checklist, contatos e preferências de avisos
            ficam salvos só neste aparelho. Nada disso vai para nossos
            servidores — neste MVP nem temos conta nem nuvem.
          </Text>
        </Card.Content>
      </Card>
      <Card>
        <Card.Title title="O que é consultado na internet" />
        <Card.Content>
          <Text variant="bodyMedium">
            Para mostrar o clima e os alertas, o app envia sua localização
            (cidade ou coordenadas) apenas para o serviço de meteorologia, e só
            na hora da consulta. Nenhum dado da sua família é enviado.
          </Text>
        </Card.Content>
      </Card>
      <Card>
        <Card.Title title="Apagar todos os meus dados" />
        <Card.Content style={{ gap: 8 }}>
          <Text variant="bodyMedium">
            Apaga perfil, checklist, contatos e preferências deste aparelho e
            volta para o início, como se fosse o primeiro uso.
          </Text>
          <Button mode="outlined" onPress={() => setPasso(1)}>
            Apagar todos os dados
          </Button>
        </Card.Content>
      </Card>
      <Portal>
        <Dialog visible={passo === 1} onDismiss={() => setPasso(0)}>
          <Dialog.Title>Apagar tudo mesmo?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Essa ação não tem volta. Seu perfil, progresso, contatos e
              preferências serão removidos deste aparelho.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setPasso(0)}>Cancelar</Button>
            <Button onPress={() => setPasso(2)}>Continuar</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={passo === 2} onDismiss={() => setPasso(0)}>
          <Dialog.Title>Confirme digitando APAGAR</Dialog.Title>
          <Dialog.Content style={{ gap: 8 }}>
            <Text variant="bodyMedium">
              Para confirmar, digite APAGAR no campo abaixo.
            </Text>
            <TextInput
              label="APAGAR"
              value={confirmacao}
              onChangeText={setConfirmacao}
              autoCapitalize="characters"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setPasso(0)}>Cancelar</Button>
            <Button
              disabled={confirmacao.trim().toUpperCase() !== "APAGAR"}
              onPress={apagarTudo}
            >
              Apagar tudo
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  lista: { flexGrow: 1, padding: 16, gap: 12 },
});
