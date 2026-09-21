export type RiscoClimatico =
  "enchente" | "deslizamento" | "seca" | "vendaval" | "geada" | "multiplos";

export type Mobilidade = "criancas" | "idosos" | "pcd" | "nenhuma";

export interface Localizacao {
  modo: "gps" | "manual";
  latitude?: number;
  longitude?: number;
  cidade?: string;
  estado?: string;
}

export interface PerfilRisco {
  riscos: RiscoClimatico[];
  localizacao: Localizacao | null;
  pessoasDomicilio: number;
  mobilidade: Mobilidade[];
  onboardingConcluido: boolean;
}

export const RISCOS_OPCOES: {
  valor: RiscoClimatico;
  rotulo: string;
  icone: string;
}[] = [
  { valor: "enchente", rotulo: "Enchentes", icone: "waves" },
  { valor: "deslizamento", rotulo: "Deslizamentos", icone: "terrain" },
  { valor: "seca", rotulo: "Secas / Estiagem", icone: "water-off" },
  {
    valor: "vendaval",
    rotulo: "Vendavais / Tempestades",
    icone: "weather-lightning-rainy",
  },
  { valor: "geada", rotulo: "Geadas / Frio extremo", icone: "snowflake" },
  {
    valor: "multiplos",
    rotulo: "Múltiplos riscos",
    icone: "alert-circle-outline",
  },
];

export const MOBILIDADE_OPCOES: { valor: Mobilidade; rotulo: string }[] = [
  { valor: "criancas", rotulo: "Crianças" },
  { valor: "idosos", rotulo: "Idosos" },
  { valor: "pcd", rotulo: "Pessoa com deficiência" },
  { valor: "nenhuma", rotulo: "Nenhuma necessidade especial" },
];
