import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Localizacao,
  Mobilidade,
  PerfilRisco,
  RiscoClimatico,
} from "@/types/profile";

const initialState: PerfilRisco = {
  riscos: [],
  localizacao: null,
  pessoasDomicilio: 1,
  mobilidade: [],
  onboardingConcluido: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    alternarRisco(state, action: PayloadAction<RiscoClimatico>) {
      const risco = action.payload;
      if (risco === "multiplos") {
        state.riscos = state.riscos.includes("multiplos") ? [] : ["multiplos"];
        return;
      }
      state.riscos = state.riscos.filter((r) => r !== "multiplos");
      state.riscos = state.riscos.includes(risco)
        ? state.riscos.filter((r) => r !== risco)
        : [...state.riscos, risco];
    },
    definirLocalizacao(state, action: PayloadAction<Localizacao>) {
      state.localizacao = action.payload;
    },
    definirPessoasDomicilio(state, action: PayloadAction<number>) {
      state.pessoasDomicilio = Math.max(1, Math.min(20, action.payload));
    },
    alternarMobilidade(state, action: PayloadAction<Mobilidade>) {
      const valor = action.payload;
      if (valor === "nenhuma") {
        state.mobilidade = [];
        return;
      }
      state.mobilidade = state.mobilidade.includes(valor)
        ? state.mobilidade.filter((m) => m !== valor)
        : [...state.mobilidade, valor];
    },
    concluirOnboarding(state) {
      state.onboardingConcluido = true;
    },
    hidratarPerfil(state, action: PayloadAction<PerfilRisco>) {
      return { ...action.payload };
    },
    reiniciarOnboarding(state) {
      return { ...initialState, onboardingConcluido: false };
    },
  },
});

export const {
  alternarRisco,
  definirLocalizacao,
  definirPessoasDomicilio,
  alternarMobilidade,
  concluirOnboarding,
  hidratarPerfil,
  reiniciarOnboarding,
} = profileSlice.actions;
export default profileSlice.reducer;
