import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import profileReducer from "./profileSlice";

const CHAVE_PERFIL = "@climasafe:perfil";

export const store = configureStore({
  reducer: { profile: profileReducer },
});

export async function carregarPerfilPersistido() {
  try {
    const bruto = await AsyncStorage.getItem(CHAVE_PERFIL);
    return bruto ? JSON.parse(bruto) : null;
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
