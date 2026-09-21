import { useNetInfo } from "@react-native-community/netinfo";

export function useRede() {
  const rede = useNetInfo();
  return { offline: rede.isConnected === false };
}
