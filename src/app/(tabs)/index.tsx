import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";

import { CoresAlerta } from "@/constants/theme";
import { AvisoOffline } from "@/components/aviso-offline";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  atualizarPainel,
  cacheAplicado,
  carregarPainelCache,
} from "@/store/painelSlice";
import { nivelMaisGrave } from "@/types/alerta";
import { RISCOS_OPCOES } from "@/types/profile";
import { formatarDataHora } from "@/utils/format";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const perfil = useAppSelector((s) => s.profile);
  const painel = useAppSelector((s) => s.painel);

  const carregar = useCallback(() => {
    dispatch(atualizarPainel());
  }, [dispatch]);

  useEffect(() => {
    carregarPainelCache().then((pacote) => {
      if (pacote) dispatch(cacheAplicado(pacote));
    });
    carregar();
  }, [carregar, dispatch]);

  const rotulosRiscos = RISCOS_OPCOES.filter((o) =>
    perfil.riscos.includes(o.valor)
  ).map((o) => o.rotulo);

  const nivel =
    painel.alertas.length > 0 ? nivelMaisGrave(painel.alertas) : "verde";
  const principal = painel.alertas.find((a) => a.nivel === nivel) ?? null;
  const cores = CoresAlerta[nivel];
  const desatualizado = painel.clima.estado === "erro" && painel.clima.comCache;

  return (
    <ScrollView
      contentContainerStyle={estilos.container}
      refreshControl={
        <RefreshControl refreshing={painel.atualizando} onRefresh={carregar} />
      }
    >
      <AvisoOffline />
      <Card style={[estilos.alerta, { backgroundColor: cores.fundo }]}>
        <Card.Content>
          <Text variant="titleLarge" style={{ color: cores.texto }}>
            {nivel === "verde"
              ? "🟢"
              : nivel === "amarelo"
                ? "🟡"
                : nivel === "laranja"
                  ? "🟠"
                  : "🔴"}{" "}
            {cores.rotulo.toUpperCase()}
          </Text>
          {painel.fonteIndisponivel ? (
            <Text style={{ color: cores.texto }}>
              Fonte de alertas ainda não configurada. Integração INMET prevista
              — o clima atual abaixo já é real quando há chave.
            </Text>
          ) : principal ? (
            <>
              <Text style={{ color: cores.texto }}>{principal.titulo}</Text>
              <Text style={{ color: cores.texto }}>{principal.descricao}</Text>
              <Text style={{ color: cores.texto }}>
                Recomendação: {principal.recomendacao}
              </Text>
              <Text style={{ color: cores.texto }}>
                Válido até {formatarDataHora(principal.validade)} •{" "}
                {principal.orgao}
              </Text>
            </>
          ) : painel.alertasErro ? (
            <Text style={{ color: cores.texto }}>{painel.alertasErro}</Text>
          ) : painel.atualizando ? (
            <Text style={{ color: cores.texto }}>
              Buscando alertas da sua região…
            </Text>
          ) : (
            <Text style={{ color: cores.texto }}>
              Nenhum alerta vigente para sua região. Tudo tranquilo por aqui.
            </Text>
          )}
        </Card.Content>
      </Card>

      {painel.alertas.length > 1 && (
        <Card>
          <Card.Title title={`Outros alertas (${painel.alertas.length - 1})`} />
          <Card.Content style={{ gap: 8 }}>
            {painel.alertas
              .filter((a) => a !== principal)
              .map((a) => (
                <View key={a.id}>
                  <Text variant="titleSmall">
                    {CoresAlerta[a.nivel].rotulo} — {a.titulo}
                  </Text>
                  <Text variant="bodySmall">
                    Válido até {formatarDataHora(a.validade)} • {a.orgao}
                  </Text>
                </View>
              ))}
          </Card.Content>
        </Card>
      )}

      <Card>
        <Card.Title
          title="Agora"
          right={(props) => (
            <IconButton
              {...props}
              icon="refresh"
              accessibilityLabel="Atualizar clima e alertas"
              loading={painel.atualizando}
              disabled={painel.atualizando}
              onPress={carregar}
            />
          )}
        />
        <Card.Content>
          {painel.clima.estado === "carregando" && painel.leitura === null ? (
            <Text>Buscando o clima da sua região…</Text>
          ) : painel.clima.estado === "vazio" ? (
            <>
              <Text>Não foi possível carregar o clima.</Text>
              <Button mode="outlined" onPress={carregar} style={estilos.tentar}>
                Tentar de novo
              </Button>
            </>
          ) : painel.leitura ? (
            <>
              <Text>
                🌡️ {painel.leitura.temperaturaC}°C • 🌧️{" "}
                {painel.leitura.precipitacaoMm}mm • 💨 {painel.leitura.ventoKmh}{" "}
                km/h
              </Text>
              <Text style={estilos.meta}>
                {painel.leitura.origem} • atualizado em{" "}
                {formatarDataHora(painel.leitura.observadaEm)}
                {painel.clima.estado === "atualizado" &&
                painel.clima.demonstracao
                  ? " • demonstração (sem chave)"
                  : ""}
                {desatualizado ? " • desatualizado" : ""}
              </Text>
              {painel.clima.estado === "erro" && (
                <Text style={estilos.meta}>{painel.clima.mensagem}</Text>
              )}
            </>
          ) : null}
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
        <Button mode="contained" onPress={() => router.push("/plano")}>
          Ativar Plano de Emergência
        </Button>
        <Button mode="text" onPress={() => router.push("/privacidade")}>
          Privacidade e meus dados
        </Button>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flexGrow: 1, padding: 34, gap: 20 },
  alerta: { borderRadius: 12 },
  meta: { opacity: 0.5, marginTop: 8, fontSize: 12 },
  tentar: { marginTop: 10, alignSelf: "flex-start" },
  acoes: { gap: 8, marginTop: 8 },
});
