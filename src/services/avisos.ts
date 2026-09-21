import * as BackgroundTask from "expo-background-task";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { Platform } from "react-native";

import { store } from "@/store";
import {
  emSilencioso,
  mesmoDia,
  registrarAvisoId,
  registrarAvisoNivel,
  registrarResumo,
} from "@/store/avisosSlice";
import { obterAlertasVigentes } from "@/services/alertas";
import type { AlertaOficial } from "@/types/alerta";

export const TAREFA_AVISOS = "preparaclima-checar-alertas";
const CANAL_ID = "alertas-clima";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function prepararCanais() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(CANAL_ID, {
      name: "Alertas climáticos",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
}

export async function pedirPermissaoAvisos(): Promise<boolean> {
  await prepararCanais();
  const atual = await Notifications.getPermissionsAsync();
  if (atual.granted) return true;
  const pedido = await Notifications.requestPermissionsAsync();
  return pedido.granted;
}

async function notificar(alerta: AlertaOficial) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title:
        alerta.nivel === "vermelho"
          ? `🔴 ALERTA CRÍTICO — ${alerta.titulo}`
          : `⚠️ ${alerta.titulo}`,
      body: alerta.recomendacao,
      data: { url: "/(tabs)" },
    },
    trigger: null,
  });
}

function deveNotificar(
  alerta: AlertaOficial,
  tipos: string[],
  agora: Date,
  prefs: {
    silencioInicio: number;
    silencioFim: number;
    ultimoAvisoPorNivel: Partial<Record<string, string>>;
    avisados: Record<string, string>;
  }
): boolean {
  if (tipos.length > 0) {
    const texto = `${alerta.titulo} ${alerta.descricao}`.toLowerCase();
    const casa = tipos.some((t) => {
      const raiz = t === "vendaval" ? "vendav" : t.slice(0, 5);
      return texto.includes(raiz);
    });
    if (!casa) return false;
  }
  const ultimoNivel = prefs.ultimoAvisoPorNivel[alerta.nivel];
  if (
    alerta.nivel !== "vermelho" &&
    ultimoNivel &&
    mesmoDia(ultimoNivel, agora.toISOString())
  ) {
    return false;
  }
  const avisadoEm = prefs.avisados[alerta.id];
  if (avisadoEm && mesmoDia(avisadoEm, agora.toISOString())) return false;
  if (
    alerta.nivel !== "vermelho" &&
    emSilencioso(agora, prefs.silencioInicio, prefs.silencioFim)
  ) {
    return false;
  }
  return true;
}

export async function avaliarENotificar(
  alertas: AlertaOficial[]
): Promise<boolean> {
  try {
    const perm = await Notifications.getPermissionsAsync();
    if (!perm.granted) return false;
  } catch {
    return false;
  }
  const prefs = store.getState().avisos;
  const agora = new Date();
  let houve = false;
  for (const alerta of alertas) {
    if (
      deveNotificar(alerta, prefs.tipos, agora, {
        silencioInicio: prefs.silencioInicio,
        silencioFim: prefs.silencioFim,
        ultimoAvisoPorNivel: prefs.ultimoAvisoPorNivel,
        avisados: prefs.avisados,
      })
    ) {
      await notificar(alerta);
      const quando = agora.toISOString();
      store.dispatch(registrarAvisoNivel({ nivel: alerta.nivel, quando }));
      store.dispatch(registrarAvisoId({ id: alerta.id, quando }));
      houve = true;
    }
  }
  return houve;
}

export async function checarAlertasENotificar(): Promise<boolean> {
  const estado = store.getState();
  const { localizacao } = estado.profile;
  if (!localizacao || !estado.profile.onboardingConcluido) return false;
  try {
    const resultado = await obterAlertasVigentes(localizacao);
    if (!resultado.ok) return false;
    return avaliarENotificar(resultado.alertas);
  } catch {
    return false;
  }
}

export async function notificarResumoDiario(forcar = false): Promise<boolean> {
  const estado = store.getState();
  const prefs = estado.avisos;
  if (!prefs.resumoDiario) return false;
  const agora = new Date();
  if (
    !forcar &&
    prefs.ultimoResumo &&
    mesmoDia(prefs.ultimoResumo, agora.toISOString())
  ) {
    return false;
  }
  try {
    const resultado = await obterAlertasVigentes(estado.profile.localizacao);
    const corpo = !resultado.ok
      ? "Não foi possível atualizar os alertas hoje. Abra o app para ver o clima atual."
      : resultado.alertas.length === 0
        ? "Nenhum alerta vigente para sua região. Dia tranquilo! Abra o app para ver os detalhes."
        : `${resultado.alertas.length} alerta(s) vigente(s). O mais importante: ${resultado.alertas[0].titulo}. Abra o app para ver o plano.`;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "☀️ Resumo diário PreparaClima",
        body: corpo,
        data: { url: "/(tabs)" },
      },
      trigger: null,
    });
    store.dispatch(registrarResumo(agora.toISOString()));
    return true;
  } catch {
    return false;
  }
}

TaskManager.defineTask(TAREFA_AVISOS, async () => {
  try {
    await checarAlertasENotificar();
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch {
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export async function registrarTarefaAvisos() {
  try {
    const registrada = await TaskManager.isTaskRegisteredAsync(TAREFA_AVISOS);
    if (!registrada) {
      await BackgroundTask.registerTaskAsync(TAREFA_AVISOS, {
        minimumInterval: 60,
      });
    }
  } catch {
    // Background indisponível (Expo Go iOS, simulador): avisos ao abrir o app seguem valendo.
  }
}
