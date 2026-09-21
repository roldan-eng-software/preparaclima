export interface ContatoPessoal {
  id: string;
  nome: string;
  telefone: string;
}

export interface ContatoPublico {
  id: string;
  nome: string;
  numero: string;
  abrangencia: "local" | "nacional";
}

export const CONTATOS_NACIONAIS: ContatoPublico[] = [
  {
    id: "bombeiros",
    nome: "Bombeiros",
    numero: "193",
    abrangencia: "nacional",
  },
  { id: "samu", nome: "SAMU", numero: "192", abrangencia: "nacional" },
  {
    id: "policia",
    nome: "Polícia Militar",
    numero: "190",
    abrangencia: "nacional",
  },
  {
    id: "defesa-civil",
    nome: "Defesa Civil",
    numero: "199",
    abrangencia: "nacional",
  },
];

export function validarTelefone(telefone: string): boolean {
  const digitos = telefone.replace(/\D/g, "");
  return digitos.length >= 10 && digitos.length <= 11;
}

export function normalizarTelefone(telefone: string): string {
  return telefone.replace(/\D/g, "");
}
