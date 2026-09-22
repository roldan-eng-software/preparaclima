export interface LeituraClima {
  temperaturaC: number;
  precipitacaoMm: number;
  ventoKmh: number;
  observadaEm: string;
  origem: string;
}

export type ErroClima =
  "sem-chave" | "sem-rede" | "local-nao-encontrado" | "servico-indisponivel";

export type ResultadoClima =
  | { ok: true; leitura: LeituraClima; demonstracao: boolean }
  | { ok: false; erro: ErroClima; mensagem: string };

export interface PrevisaoHora {
  dataHora: string;
  temperaturaC: number;
  descricao: string;
  probChuva: number;
  ventoKmh: number;
}

export type ResultadoPrevisao =
  | { ok: true; previsao: PrevisaoHora[]; demonstracao: boolean }
  | { ok: false; erro: ErroClima; mensagem: string };
