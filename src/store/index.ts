import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import profileReducer from "./profileSlice";

const CHAVE_PERFIL = "@preparaclima:perfil";
const CHAVE_PERFIL_LEGADA = "@climasafe:perfil";

export const store = configureStore({
  reducer: { profile: profileReducer },
});

function perfilValido(valor: unknown): boolean {
  if (typeof valor !== "object" || valor === null) return false;
  const perfil = valor as Record<string, unknown>;
  return (
    Array.isArray(perfil.riscos) &&
    typeof perfil.pessoasDomicilio === "number" &&
    Array.isArray(perfil.mobilidade) &&
    typeof perfil.onboardingConcluido === "boolean" &&
    (perfil.localizacao === null || typeof perfil.localizacao === "object")
  );
}

export async function carregarPerfilPersistido() {
  try {
    let bruto = await AsyncStorage.getItem(CHAVE_PERFIL);
    if (!bruto) {
      bruto = await AsyncStorage.getItem(CHAVE_PERFIL_LEGADA);
      if (bruto) {
        await AsyncStorage.setItem(CHAVE_PERFIL, bruto);
        await AsyncStorage.removeItem(CHAVE_PERFIL_LEGADA);
      }
    }
    if (!bruto) return null;
    const perfil = JSON.parse(bruto);
    return perfilValido(perfil) ? perfil : null;
  } catch {
    return null;
  }
}

let timer: ReturnType<typeof setTimeout> | null = null;
store.subscribe(() => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    AsyncStorage.setItem(
      CHAVE_PERFIL,
      JSON.stringify(store.getState().profile)
    ).catch(() => {});
  }, 300);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
