import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const CHAVE_PROGRESSO = "@preparaclima:progresso";

export interface ProgressoPlano {
  concluidos: string[];
  atualizadoEm: string;
}

type ProgressoState = Record<string, ProgressoPlano>;

const initialState: ProgressoState = {};

export async function carregarProgresso(): Promise<ProgressoState | null> {
  try {
    const bruto = await AsyncStorage.getItem(CHAVE_PROGRESSO);
    if (!bruto) return null;
    const valor = JSON.parse(bruto);
    if (typeof valor !== "object" || valor === null) return null;
    return valor as ProgressoState;
  } catch {
    return null;
  }
}

let timer: ReturnType<typeof setTimeout> | null = null;

export function persistirProgresso(getState: () => ProgressoState) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    AsyncStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(getState())).catch(
      () => {}
    );
  }, 300);
}

const progressoSlice = createSlice({
  name: "progresso",
  initialState,
  reducers: {
    hidratarProgresso(_state, action: PayloadAction<ProgressoState>) {
      return { ...action.payload };
    },
    alternarItem(
      state,
      action: PayloadAction<{ risco: string; itemId: string }>
    ) {
      const { risco, itemId } = action.payload;
      const atual = state[risco] ?? { concluidos: [], atualizadoEm: "" };
      const concluidos = atual.concluidos.includes(itemId)
        ? atual.concluidos.filter((id) => id !== itemId)
        : [...atual.concluidos, itemId];
      state[risco] = { concluidos, atualizadoEm: new Date().toISOString() };
    },
    recomecarPlano(state, action: PayloadAction<string>) {
      delete state[action.payload];
    },
  },
});

export const { hidratarProgresso, alternarItem, recomecarPlano } =
  progressoSlice.actions;
export default progressoSlice.reducer;

export function percentualPlano(
  progresso: ProgressoState,
  risco: string,
  total: number
): number {
  if (total <= 0) return 0;
  const concluidos = progresso[risco]?.concluidos.length ?? 0;
  return Math.min(100, Math.round((concluidos / total) * 100));
}
