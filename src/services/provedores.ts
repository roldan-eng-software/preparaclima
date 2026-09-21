import type { NivelAlerta } from "@/constants/theme";
import type { Localizacao } from "@/types/profile";
import type {
  AlertaOficial,
  FonteAlerta,
  ResultadoAlertas,
} from "@/types/alerta";

export interface ProvedorAlertas {
  fonte: FonteAlerta;
  disponivel: () => boolean;
  buscar: (localizacao: Localizacao) => Promise<ResultadoAlertas>;
}

export function mapearSeveridadeInmet(severidade: string): NivelAlerta {
  const s = severidade.toLowerCase();
  if (s.includes("vermelho") || s.includes("perigo") || s.includes("extremo"))
    return "vermelho";
  if (s.includes("laranja") || s.includes("perigo potencial")) return "laranja";
  return "amarelo";
}

function consultaPorLocalizacao(localizacao: Localizacao): string {
  return localizacao.modo === "gps"
    ? `lat=${localizacao.latitude}&lon=${localizacao.longitude}`
    : `q=${encodeURIComponent(`${localizacao.cidade},${localizacao.estado},BR`)}`;
}

const provedorOpenWeather: ProvedorAlertas = {
  fonte: "openweather",
  disponivel: () => !!process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY,
  buscar: async (localizacao) => {
    const chave = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY as string;
    try {
      const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${consultaPorLocalizacao(localizacao)}&appid=${chave}&lang=pt_br`
      );
      if (!resposta.ok) {
        return {
          ok: false,
          erro: "servico-indisponivel",
          mensagem: "Alertas indisponíveis no momento. Tente de novo.",
        };
      }
      const dados = await resposta.json();
      const brutos: unknown[] = Array.isArray(dados.alerts) ? dados.alerts : [];
      return {
        ok: true,
        alertas: brutos.map((a, i) => {
          const alerta = a as Record<string, unknown>;
          return {
            id: `openweather-${String(alerta.event ?? i)}`,
            nivel: "amarelo" as const,
            titulo: String(alerta.event ?? "Alerta meteorológico"),
            descricao: String(alerta.description ?? ""),
            recomendacao:
              "Acompanhe as atualizações e siga seu plano de preparação.",
            validade:
              typeof alerta.end === "number"
                ? new Date(alerta.end * 1000).toISOString()
                : null,
            orgao: String(alerta.sender_name ?? "OpenWeather"),
            fonte: "openweather" as const,
          };
        }),
      };
    } catch {
      return {
        ok: false,
        erro: "sem-rede",
        mensagem: "Sem conexão. Mostrando os últimos alertas salvos.",
      };
    }
  },
};

const provedorInmet: ProvedorAlertas = {
  fonte: "inmet",
  disponivel: () => !!process.env.EXPO_PUBLIC_INMET_HABILITADO,
  buscar: async () => ({
    ok: false,
    erro: "servico-indisponivel",
    mensagem:
      "INMET em homologação: endpoint oficial ainda não confirmado. Usando fontes alternativas.",
  }),
};

// Notas de descoberta (2026-09-21, sem rede direta ao INMET neste ambiente):
// - Portal institucional confirma "Avisos Meteorológicos" e feed "Alert-AS RSS"
//   (https://portal.inmet.gov.br), mas RSS não carrega coordenadas nem
//   severidade normalizada — inadequado como fonte primária no mobile.
// - Candidatos a endpoint JSON: apitempo.inmet.gov.br (inacessível daqui) e
//   alert-as.inmet.gov.br. Confirmar com rede real antes de implementar:
//   formato, severidade (amarelo/laranja/vermelho), área (município/UF/região)
//   e validade. Quando confirmado, implementar buscar() aqui com
//   mapearSeveridadeInmet() e o INMET passa a ter precedência automática.

const provedores: ProvedorAlertas[] = [provedorInmet, provedorOpenWeather];

export function provedorAtivo(): FonteAlerta | null {
  for (const p of provedores) {
    if (p.disponivel()) return p.fonte;
  }
  return null;
}

export async function buscarAlertasMultiFonte(
  localizacao: Localizacao
): Promise<{
  alertas: AlertaOficial[];
  fontes: FonteAlerta[];
  erros: string[];
}> {
  const alertas: AlertaOficial[] = [];
  const fontes: FonteAlerta[] = [];
  const erros: string[] = [];
  for (const provedor of provedores) {
    if (!provedor.disponivel()) continue;
    const resultado = await provedor.buscar(localizacao);
    if (resultado.ok) {
      fontes.push(provedor.fonte);
      const vistos = new Set(alertas.map((a) => `${a.titulo}|${a.validade}`));
      for (const alerta of resultado.alertas) {
        const chave = `${alerta.titulo}|${alerta.validade}`;
        if (!vistos.has(chave)) {
          vistos.add(chave);
          alertas.push(alerta);
        }
      }
      if (provedor.fonte === "inmet") break;
    } else if (resultado.erro !== "sem-rede") {
      erros.push(`${provedor.fonte}: ${resultado.mensagem}`);
    }
  }
  return { alertas, fontes, erros };
}
