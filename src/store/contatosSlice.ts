import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ContatoPessoal } from "@/types/contato";

const CHAVE_CONTATOS = "@preparaclima:contatos";
export const MAX_CONTATOS_PESSOAIS = 10;

const initialState: ContatoPessoal[] = [];

export async function carregarContatos(): Promise<ContatoPessoal[] | null> {
  try {
    const bruto = await AsyncStorage.getItem(CHAVE_CONTATOS);
    if (!bruto) return null;
    const valor = JSON.parse(bruto);
    if (!Array.isArray(valor)) return null;
    return valor.filter(
      (c): c is ContatoPessoal =>
        typeof c === "object" &&
        c !== null &&
        typeof (c as ContatoPessoal).id === "string" &&
        typeof (c as ContatoPessoal).nome === "string" &&
        typeof (c as ContatoPessoal).telefone === "string"
    );
  } catch {
    return null;
  }
}

let timer: ReturnType<typeof setTimeout> | null = null;

export function persistirContatos(getState: () => ContatoPessoal[]) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    AsyncStorage.setItem(CHAVE_CONTATOS, JSON.stringify(getState())).catch(
      () => {}
    );
  }, 300);
}

function novoId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

const contatosSlice = createSlice({
  name: "contatos",
  initialState,
  reducers: {
    hidratarContatos(_state, action: PayloadAction<ContatoPessoal[]>) {
      return [...action.payload];
    },
    adicionarContato(
      state,
      action: PayloadAction<{ nome: string; telefone: string }>
    ) {
      if (state.length >= MAX_CONTATOS_PESSOAIS) return;
      state.push({ id: novoId(), ...action.payload });
    },
    editarContato(
      state,
      action: PayloadAction<{ id: string; nome: string; telefone: string }>
    ) {
      const contato = state.find((c) => c.id === action.payload.id);
      if (contato) {
        contato.nome = action.payload.nome;
        contato.telefone = action.payload.telefone;
      }
    },
    removerContato(state, action: PayloadAction<string>) {
      return state.filter((c) => c.id !== action.payload);
    },
  },
});

export const {
  hidratarContatos,
  adicionarContato,
  editarContato,
  removerContato,
} = contatosSlice.actions;
export default contatosSlice.reducer;
