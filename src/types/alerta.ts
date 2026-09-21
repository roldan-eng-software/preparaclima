import type { NivelAlerta } from "@/constants/theme";

export interface AlertaOficial {
  id: string;
  nivel: NivelAlerta;
  titulo: string;
  descricao: string;
  recomendacao: string;
  validade: string | null;
  orgao: string;
}

export type ErroAlertas = "sem-chave" | "sem-rede" | "servico-indisponivel";

export type ResultadoAlertas =
  | { ok: true; alertas: AlertaOficial[] }
  | { ok: false; erro: ErroAlertas; mensagem: string };
