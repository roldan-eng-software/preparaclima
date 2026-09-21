import { useState } from "react";
import { Linking, ScrollView, Share, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Dialog,
  IconButton,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  MAX_CONTATOS_PESSOAIS,
  adicionarContato,
  editarContato,
  removerContato,
} from "@/store/contatosSlice";
import {
  CONTATOS_NACIONAIS,
  normalizarTelefone,
  validarTelefone,
  type ContatoPessoal,
} from "@/types/contato";

export default function Contatos() {
  const dispatch = useAppDispatch();
  const pessoais = useAppSelector((s) => s.contatos);
  const localizacao = useAppSelector((s) => s.profile.localizacao);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");
  const [editando, setEditando] = useState<ContatoPessoal | null>(null);
  const [excluir, setExcluir] = useState<ContatoPessoal | null>(null);

  function textoLocalizacao(): string {
    if (!localizacao) return "Localização não informada no perfil.";
    if (localizacao.modo === "manual")
      return `Estou em ${localizacao.cidade}/${localizacao.estado} e preciso de ajuda! (via PreparaClima)`;
    return `Preciso de ajuda! Minha localização: https://maps.google.com/?q=${localizacao.latitude},${localizacao.longitude} (via PreparaClima)`;
  }

  function ligar(numero: string) {
    Linking.openURL(`tel:${normalizarTelefone(numero)}`).catch(() => {});
  }

  function whatsapp(numero: string) {
    const fone = normalizarTelefone(numero);
    Linking.openURL(
      `https://wa.me/${fone}?text=${encodeURIComponent(textoLocalizacao())}`
    ).catch(() => {});
  }

  function sms(numero: string) {
    Linking.openURL(
      `sms:${normalizarTelefone(numero)}?body=${encodeURIComponent(textoLocalizacao())}`
    ).catch(() => {});
  }

  function compartilharLocalizacao() {
    Share.share({ message: textoLocalizacao() }).catch(() => {});
  }

  function limparFormulario() {
    setNome("");
    setTelefone("");
    setErro("");
    setEditando(null);
  }

  function salvar() {
    if (!nome.trim()) {
      setErro("Informe o nome do contato.");
      return;
    }
    if (!validarTelefone(telefone)) {
      setErro("Telefone inválido. Use DDD + número (10 ou 11 dígitos).");
      return;
    }
    if (!editando && pessoais.length >= MAX_CONTATOS_PESSOAIS) {
      setErro(`Limite de ${MAX_CONTATOS_PESSOAIS} contatos pessoais.`);
      return;
    }
    if (editando) {
      dispatch(
        editarContato({
          id: editando.id,
          nome: nome.trim(),
          telefone: telefone.trim(),
        })
      );
    } else {
      dispatch(
        adicionarContato({ nome: nome.trim(), telefone: telefone.trim() })
      );
    }
    limparFormulario();
  }

  function comecarEdicao(c: ContatoPessoal) {
    setEditando(c);
    setNome(c.nome);
    setTelefone(c.telefone);
    setErro("");
  }

  return (
    <ScrollView contentContainerStyle={estilos.lista}>
      <Text variant="headlineSmall">Contatos de emergência</Text>
      <Button mode="outlined" onPress={compartilharLocalizacao}>
        Compartilhar minha localização
      </Button>

      <Text variant="titleMedium">
        Família e vizinhos ({pessoais.length}/{MAX_CONTATOS_PESSOAIS})
      </Text>
      {pessoais.length === 0 && (
        <Text variant="bodyMedium" style={estilos.meta}>
          Nenhum contato pessoal ainda. Adicione abaixo quem deve ser avisado na
          emergência.
        </Text>
      )}
      {pessoais.map((c) => (
        <Card key={c.id}>
          <Card.Title
            title={c.nome}
            subtitle={c.telefone}
            right={(props) => (
              <View style={estilos.acoesLinha}>
                <IconButton
                  {...props}
                  icon="phone"
                  onPress={() => ligar(c.telefone)}
                />
                <IconButton
                  {...props}
                  icon="message-text"
                  onPress={() => whatsapp(c.telefone)}
                />
              </View>
            )}
          />
          <Card.Actions>
            <Button onPress={() => comecarEdicao(c)}>Editar</Button>
            <Button onPress={() => setExcluir(c)}>Excluir</Button>
            <Button onPress={() => sms(c.telefone)}>SMS</Button>
          </Card.Actions>
        </Card>
      ))}

      <Card>
        <Card.Title title={editando ? "Editar contato" : "Novo contato"} />
        <Card.Content style={{ gap: 8 }}>
          <TextInput
            label="Nome (ex.: Maria, vizinho)"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            label="Telefone com DDD"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
            placeholder="(11) 99999-0000"
          />
          {!!erro && <Text style={estilos.erro}>{erro}</Text>}
          <View style={estilos.acoesLinha}>
            <Button mode="contained" onPress={salvar}>
              {editando ? "Salvar" : "Adicionar"}
            </Button>
            {editando && <Button onPress={limparFormulario}>Cancelar</Button>}
          </View>
        </Card.Content>
      </Card>

      <Text variant="titleMedium">Públicos — sempre à mão</Text>
      {localizacao?.modo === "manual" && (
        <Card>
          <Card.Title
            title={`Defesa Civil de ${localizacao.cidade}/${localizacao.estado}`}
            subtitle="Procure o número local e salve como contato pessoal"
          />
        </Card>
      )}
      {CONTATOS_NACIONAIS.map((c) => (
        <Card key={c.id} onPress={() => ligar(c.numero)}>
          <Card.Title
            title={`${c.nome} — ${c.numero}`}
            subtitle="Toque para ligar"
            right={(props) => (
              <IconButton
                {...props}
                icon="phone"
                onPress={() => ligar(c.numero)}
              />
            )}
          />
        </Card>
      ))}
      <Portal>
        <Dialog visible={excluir !== null} onDismiss={() => setExcluir(null)}>
          <Dialog.Title>Excluir contato?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Remover {excluir?.nome} da lista de emergência?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setExcluir(null)}>Cancelar</Button>
            <Button
              onPress={() => {
                if (excluir) dispatch(removerContato(excluir.id));
                setExcluir(null);
              }}
            >
              Excluir
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  lista: { flexGrow: 1, padding: 16, gap: 12 },
  meta: { opacity: 0.7 },
  erro: { color: "#DC2626" },
  acoesLinha: { flexDirection: "row", alignItems: "center", gap: 4 },
});
