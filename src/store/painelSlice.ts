import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { obterAlertasVigentes } from "@/services/alertas";
import { avaliarENotificar } from "@/services/avisos";
import { obterClimaAtual, obterPrevisao } from "@/services/clima";
import type { AlertaOficial } from "@/types/alerta";
import type { LeituraClima, PrevisaoHora } from "@/types/clima";
import type { RootState } from "./index";

const CHAVE_PAINEIL = "@preparaclima:painel";

export type EstadoPainel =
  | { estado: "carregando" }
  | { estado: "atualizado"; demonstracao: boolean }
  | { estado: "erro"; mensagem: string; comCache: boolean }
  | { estado: "vazio" };

interface PainelState {
  clima: EstadoPainel;
  leitura: LeituraClima | null;
  previsao: PrevisaoHora[];
  previsaoDemonstracao: boolean;
  alertas: AlertaOficial[];
  alertasErro: string | null;
  fonteIndisponivel: boolean;
  atualizando: boolean;
}

const initialState: PainelState = {
  clima: { estado: "carregando" },
  leitura: null,
  previsao: [],
  previsaoDemonstracao: false,
  alertas: [],
  alertasErro: null,
  fonteIndisponivel: false,
  atualizando: false,
};

export const atualizarPainel = createAsyncThunk(
  "painel/atualizar",
  async (_, { getState, rejectWithValue }) => {
    const { profile } = getState() as RootState;
    const [clima, alertas, previsao] = await Promise.all([
      obterClimaAtual(profile.localizacao),
      obterAlertasVigentes(profile.localizacao),
      obterPrevisao(profile.localizacao),
    ]);
    if (!clima.ok && !alertas.ok && !previsao.ok) {
      return rejectWithValue({ clima, alertas, previsao });
    }
    const pacote = {
      leitura: clima.ok ? clima.leitura : null,
      demonstracao: clima.ok ? clima.demonstracao : false,
      previsao: previsao.ok ? previsao.previsao : [],
      previsaoDemonstracao: previsao.ok ? previsao.demonstracao : false,
      alertas: alertas.ok ? alertas.alertas : [],
      salvaEm: new Date().toISOString(),
    };
    await AsyncStorage.setItem(CHAVE_PAINEIL, JSON.stringify(pacote));
    if (alertas.ok && alertas.alertas.length > 0) {
      avaliarENotificar(alertas.alertas).catch(() => {});
    }
    return { clima, alertas, previsao, pacote };
  }
);

export async function carregarPainelCache() {
  try {
    const bruto = await AsyncStorage.getItem(CHAVE_PAINEIL);
    if (!bruto) return null;
    const pacote = JSON.parse(bruto);
    if (!pacote || typeof pacote !== "object") return null;
    return pacote as {
      leitura: LeituraClima | null;
      demonstracao: boolean;
      previsao: PrevisaoHora[];
      previsaoDemonstracao: boolean;
      alertas: AlertaOficial[];
      salvaEm: string;
    };
  } catch {
    return null;
  }
}

const painelSlice = createSlice({
  name: "painel",
  initialState,
  reducers: {
    cacheAplicado(
      state,
      action: {
        payload: {
          leitura: LeituraClima | null;
          demonstracao: boolean;
          previsao: PrevisaoHora[];
          previsaoDemonstracao: boolean;
          alertas: AlertaOficial[];
        };
        type: string;
      }
    ) {
      const pacote = action.payload;
      if (pacote.leitura) {
        state.leitura = pacote.leitura;
        state.clima = {
          estado: "atualizado",
          demonstracao: pacote.demonstracao,
        };
      }
      state.previsao = pacote.previsao ?? [];
      state.previsaoDemonstracao = pacote.previsaoDemonstracao ?? false;
      state.alertas = pacote.alertas;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(atualizarPainel.pending, (state) => {
        state.atualizando = true;
      })
      .addCase(atualizarPainel.fulfilled, (state, action) => {
        state.atualizando = false;
        const { clima, alertas, previsao } = action.payload;
        if (clima.ok) {
          state.leitura = clima.leitura;
          state.clima = {
            estado: "atualizado",
            demonstracao: clima.demonstracao,
          };
        } else {
          state.clima = {
            estado: "erro",
            mensagem: clima.mensagem,
            comCache: state.leitura !== null,
          };
        }
        if (alertas.ok) {
          state.alertas = alertas.alertas;
          state.alertasErro = null;
          state.fonteIndisponivel = false;
        } else {
          state.alertasErro = alertas.mensagem;
          state.fonteIndisponivel = alertas.erro === "sem-chave";
        }
        if (!clima.ok && state.leitura === null) {
          state.clima = { estado: "vazio" };
        }
        if (previsao.ok) {
          state.previsao = previsao.previsao;
          state.previsaoDemonstracao = previsao.demonstracao;
        }
      })
      .addCase(atualizarPainel.rejected, (state, action) => {
        state.atualizando = false;
        const payload = action.payload as
          | { clima: { mensagem: string }; alertas: { mensagem: string } }
          | undefined;
        if (state.leitura === null) {
          state.clima = { estado: "vazio" };
        } else {
          state.clima = {
            estado: "erro",
            mensagem: payload?.clima.mensagem ?? "Sem conexão.",
            comCache: true,
          };
        }
        state.alertasErro =
          payload?.alertas.mensagem ?? "Alertas indisponíveis.";
      });
  },
});

export const { cacheAplicado } = painelSlice.actions;

export default painelSlice.reducer;
