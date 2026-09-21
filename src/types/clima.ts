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
