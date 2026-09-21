import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { NivelAlerta } from "@/constants/theme";
import type { RiscoClimatico } from "@/types/profile";
import { AVISOS_PADRAO, type PreferenciasAvisos } from "@/types/avisos";

const CHAVE_AVISOS = "@preparaclima:avisos";

export async function carregarAvisos(): Promise<PreferenciasAvisos | null> {
  try {
    const bruto = await AsyncStorage.getItem(CHAVE_AVISOS);
    if (!bruto) return null;
    const valor = JSON.parse(bruto);
    if (typeof valor !== "object" || valor === null) return null;
    return { ...AVISOS_PADRAO, ...valor } as PreferenciasAvisos;
  } catch {
    return null;
  }
}

let timer: ReturnType<typeof setTimeout> | null = null;

export function persistirAvisos(getState: () => PreferenciasAvisos) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    AsyncStorage.setItem(CHAVE_AVISOS, JSON.stringify(getState())).catch(
      () => {}
    );
  }, 300);
}

export function mesmoDia(aIso: string, bIso: string): boolean {
  const a = new Date(aIso);
  const b = new Date(bIso);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function emSilencioso(
  agora: Date,
  inicio: number,
  fim: number
): boolean {
  const hora = agora.getHours();
  if (inicio <= fim) return hora >= inicio && hora < fim;
  return hora >= inicio || hora < fim;
}

const avisosSlice = createSlice({
  name: "avisos",
  initialState: AVISOS_PADRAO,
  reducers: {
    hidratarAvisos(_state, action: PayloadAction<PreferenciasAvisos>) {
      return { ...AVISOS_PADRAO, ...action.payload };
    },
    definirTipos(state, action: PayloadAction<RiscoClimatico[]>) {
      state.tipos = action.payload;
    },
    definirSilencio(
      state,
      action: PayloadAction<{ inicio: number; fim: number }>
    ) {
      state.silencioInicio = action.payload.inicio;
      state.silencioFim = action.payload.fim;
    },
    alternarResumoDiario(state) {
      state.resumoDiario = !state.resumoDiario;
    },
    registrarAvisoNivel(
      state,
      action: PayloadAction<{ nivel: NivelAlerta; quando: string }>
    ) {
      state.ultimoAvisoPorNivel[action.payload.nivel] = action.payload.quando;
    },
    registrarAvisoId(
      state,
      action: PayloadAction<{ id: string; quando: string }>
    ) {
      state.avisados[action.payload.id] = action.payload.quando;
    },
    registrarResumo(state, action: PayloadAction<string>) {
      state.ultimoResumo = action.payload;
    },
  },
});

export const {
  hidratarAvisos,
  definirTipos,
  definirSilencio,
  alternarResumoDiario,
  registrarAvisoNivel,
  registrarAvisoId,
  registrarResumo,
} = avisosSlice.actions;
export default avisosSlice.reducer;
