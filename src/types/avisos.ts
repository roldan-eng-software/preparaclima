import type { NivelAlerta } from "@/constants/theme";
import type { RiscoClimatico } from "@/types/profile";

export interface PreferenciasAvisos {
  tipos: RiscoClimatico[];
  silencioInicio: number;
  silencioFim: number;
  resumoDiario: boolean;
  ultimoAvisoPorNivel: Partial<Record<NivelAlerta, string>>;
  avisados: Record<string, string>;
  ultimoResumo: string | null;
}

export const AVISOS_PADRAO: PreferenciasAvisos = {
  tipos: [],
  silencioInicio: 22,
  silencioFim: 8,
  resumoDiario: false,
  ultimoAvisoPorNivel: {},
  avisados: {},
  ultimoResumo: null,
};
