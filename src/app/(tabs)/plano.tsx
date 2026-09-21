import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  Chip,
  Dialog,
  Portal,
  ProgressBar,
  Text,
} from "react-native-paper";

import { FASES_ROTULOS, buscarPlano, type FasePlano } from "@/lib/planos";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  alternarItem,
  percentualPlano,
  recomecarPlano,
} from "@/store/progressoSlice";

const FASES: FasePlano[] = ["antes", "durante", "depois"];

export default function Plano() {
  const dispatch = useAppDispatch();
  const perfil = useAppSelector((s) => s.profile);
  const progresso = useAppSelector((s) => s.progresso);
  const riscosDisponiveis = perfil.riscos.filter((r) => r !== "multiplos");
  const [riscoAtivo, setRiscoAtivo] = useState<string | null>(null);
  const [confirmar, setConfirmar] = useState(false);

  const riscoEfetivo =
    riscoAtivo ?? perfil.riscos[0] ?? riscosDisponiveis[0] ?? "multiplos";
  const plano = buscarPlano(
    riscoEfetivo === "multiplos" && riscosDisponiveis.length > 0 && !riscoAtivo
      ? riscosDisponiveis[0]
      : riscoEfetivo
  );
  const total = FASES.reduce((n, f) => n + plano.fases[f].length, 0);
  const percentual = percentualPlano(progresso, plano.risco, total);
  const concluidos = progresso[plano.risco]?.concluidos ?? [];

  if (perfil.riscos.length === 0) {
    return (
      <ScrollView contentContainerStyle={estilos.container}>
        <Text variant="headlineSmall">Plano de preparação</Text>
        <Text variant="bodyMedium" style={estilos.subtitulo}>
          Complete seu perfil de risco para ver seu plano personalizado.
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={estilos.lista}>
      <Text variant="headlineSmall">Plano de preparação</Text>
      {perfil.riscos.length > 1 && (
        <View style={estilos.troca}>
          {perfil.riscos.map((r) => (
            <Chip
              key={r}
              selected={(riscoAtivo ?? perfil.riscos[0]) === r}
              onPress={() => setRiscoAtivo(r)}
            >
              {buscarPlano(r).titulo}
            </Chip>
          ))}
        </View>
      )}
      <Card>
        <Card.Content style={{ gap: 8 }}>
          <Text variant="titleMedium">
            {plano.titulo} — {percentual}% preparado
          </Text>
          <ProgressBar progress={percentual / 100} />
          {percentual === 100 && (
            <Text variant="bodyMedium">
              Parabéns! Seu plano está completo. Revise a cada 6 meses.
            </Text>
          )}
          <Button mode="text" onPress={() => setConfirmar(true)}>
            Recomeçar plano
          </Button>
        </Card.Content>
      </Card>
      {FASES.map((fase) => (
        <View key={fase} style={{ gap: 8 }}>
          <Text variant="titleMedium">
            {FASES_ROTULOS[fase].icone} {FASES_ROTULOS[fase].titulo}
          </Text>
          {plano.fases[fase].map((item) => {
            const feito = concluidos.includes(item.id);
            return (
              <Card
                key={item.id}
                onPress={() =>
                  dispatch(
                    alternarItem({ risco: plano.risco, itemId: item.id })
                  )
                }
              >
                <Card.Content style={estilos.item}>
                  <Checkbox status={feito ? "checked" : "unchecked"} />
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text
                      variant="titleSmall"
                      style={feito ? estilos.riscado : undefined}
                    >
                      {item.titulo}
                    </Text>
                    <Text variant="bodySmall">{item.descricao}</Text>
                    {item.revisao && (
                      <Text variant="bodySmall" style={estilos.meta}>
                        ⏰ {item.revisao}
                      </Text>
                    )}
                  </View>
                </Card.Content>
              </Card>
            );
          })}
        </View>
      ))}
      <Portal>
        <Dialog visible={confirmar} onDismiss={() => setConfirmar(false)}>
          <Dialog.Title>Recomeçar plano?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Isso apaga o progresso de {plano.titulo}. Tem certeza?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirmar(false)}>Cancelar</Button>
            <Button
              onPress={() => {
                dispatch(recomecarPlano(plano.risco));
                setConfirmar(false);
              }}
            >
              Recomeçar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 12, justifyContent: "center" },
  subtitulo: { opacity: 0.7 },
  lista: { flexGrow: 1, padding: 16, gap: 16 },
  troca: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  item: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  riscado: { textDecorationLine: "line-through", opacity: 0.6 },
  meta: { opacity: 0.7 },
});
