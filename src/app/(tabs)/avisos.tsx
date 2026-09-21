import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Chip, Switch, Text } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  alternarResumoDiario,
  definirSilencio,
  definirTipos,
} from "@/store/avisosSlice";
import {
  notificarResumoDiario,
  pedirPermissaoAvisos,
  registrarTarefaAvisos,
} from "@/services/avisos";
import { RISCOS_OPCOES, type RiscoClimatico } from "@/types/profile";

const HORAS = Array.from({ length: 24 }, (_, h) => h);

export default function Avisos() {
  const dispatch = useAppDispatch();
  const avisos = useAppSelector((s) => s.avisos);
  const riscosPerfil = useAppSelector((s) => s.profile.riscos);
  const [estadoPerm, setEstadoPerm] = useState<string | null>(null);

  const tipos = avisos.tipos.length > 0 ? avisos.tipos : riscosPerfil;

  function alternarTipo(tipo: RiscoClimatico) {
    const base = avisos.tipos.length > 0 ? avisos.tipos : riscosPerfil;
    dispatch(
      definirTipos(
        base.includes(tipo) ? base.filter((t) => t !== tipo) : [...base, tipo]
      )
    );
  }

  async function ativar() {
    const ok = await pedirPermissaoAvisos();
    setEstadoPerm(
      ok
        ? "Avisos ativados neste aparelho."
        : "Permissão negada. Ative nas configurações do sistema para receber alertas."
    );
    if (ok) {
      if (avisos.tipos.length === 0 && riscosPerfil.length > 0) {
        dispatch(definirTipos(riscosPerfil));
      }
      await registrarTarefaAvisos();
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.lista}>
      <Text variant="headlineSmall">Avisos</Text>
      <Text variant="bodyMedium" style={estilos.meta}>
        Receba alertas da sua região sem spam. Alerta vermelho sempre avisa,
        mesmo no horário silencioso.
      </Text>
      <Button mode="contained" onPress={ativar}>
        Ativar avisos neste aparelho
      </Button>
      {!!estadoPerm && <Text variant="bodySmall">{estadoPerm}</Text>}

      <Card>
        <Card.Title title="Tipos de interesse" />
        <Card.Content>
          <View style={estilos.linha}>
            {RISCOS_OPCOES.filter((o) => o.valor !== "multiplos").map((o) => (
              <Chip
                key={o.valor}
                selected={tipos.includes(o.valor)}
                onPress={() => alternarTipo(o.valor)}
              >
                {o.rotulo}
              </Chip>
            ))}
          </View>
          <Text variant="bodySmall" style={estilos.meta}>
            Vazio = segue os riscos do seu perfil.
          </Text>
        </Card.Content>
      </Card>

      <Card>
        <Card.Title title="Horário silencioso" />
        <Card.Content style={{ gap: 8 }}>
          <Text variant="bodyMedium">
            Das {avisos.silencioInicio}h às {avisos.silencioFim}h (só o vermelho
            fura o silêncio)
          </Text>
          <Text variant="bodySmall" style={estilos.meta}>
            Início:
          </Text>
          <View style={estilos.linha}>
            {[20, 21, 22, 23].map((h) => (
              <Chip
                key={h}
                selected={avisos.silencioInicio === h}
                onPress={() =>
                  dispatch(
                    definirSilencio({ inicio: h, fim: avisos.silencioFim })
                  )
                }
              >
                {h}h
              </Chip>
            ))}
          </View>
          <Text variant="bodySmall" style={estilos.meta}>
            Fim:
          </Text>
          <View style={estilos.linha}>
            {[6, 7, 8, 9].map((h) => (
              <Chip
                key={h}
                selected={avisos.silencioFim === h}
                onPress={() =>
                  dispatch(
                    definirSilencio({ inicio: avisos.silencioInicio, fim: h })
                  )
                }
              >
                {h}h
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card>
        <Card.Title
          title="Resumo diário"
          subtitle="Uma notificação por dia com o panorama (desligado por padrão)"
          right={() => (
            <Switch
              value={avisos.resumoDiario}
              onValueChange={() => {
                dispatch(alternarResumoDiario());
              }}
            />
          )}
        />
        {avisos.resumoDiario && (
          <Card.Actions>
            <Button
              onPress={() => {
                notificarResumoDiario(true).catch(() => {});
              }}
            >
              Testar agora
            </Button>
          </Card.Actions>
        )}
      </Card>
      <Text variant="bodySmall" style={estilos.meta}>
        Em normalidade: no máximo 1 aviso por nível ao dia. Toque no aviso para
        abrir o painel.
      </Text>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  lista: { flexGrow: 1, padding: 16, gap: 12 },
  meta: { opacity: 0.7 },
  linha: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
});

export { HORAS };
