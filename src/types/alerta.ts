import type { NivelAlerta } from "@/constants/theme";

export type FonteAlerta = "inmet" | "defesa-civil" | "openweather";

export interface AlertaOficial {
  id: string;
  nivel: NivelAlerta;
  titulo: string;
  descricao: string;
  recomendacao: string;
  validade: string | null;
  orgao: string;
  fonte: FonteAlerta;
  provisorio?: boolean;
}

export type ErroAlertas = "sem-chave" | "sem-rede" | "servico-indisponivel";

export type ResultadoAlertas =
  | { ok: true; alertas: AlertaOficial[] }
  | { ok: false; erro: ErroAlertas; mensagem: string };

export const ORDEM_NIVEL: Record<NivelAlerta, number> = {
  verde: 0,
  amarelo: 1,
  laranja: 2,
  vermelho: 3,
};

export function nivelMaisGrave(alertas: AlertaOficial[]): NivelAlerta {
  return alertas.reduce<NivelAlerta>(
    (atual, a) => (ORDEM_NIVEL[a.nivel] > ORDEM_NIVEL[atual] ? a.nivel : atual),
    "verde"
  );
}
