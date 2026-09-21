import type { Localizacao } from "@/types/profile";
import type { ResultadoAlertas } from "@/types/alerta";

export async function obterAlertasVigentes(
  localizacao: Localizacao | null
): Promise<ResultadoAlertas> {
  if (!localizacao) {
    return {
      ok: false,
      erro: "servico-indisponivel",
      mensagem: "Informe sua localização no perfil.",
    };
  }
  const chave = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  if (!chave) {
    return {
      ok: false,
      erro: "sem-chave",
      mensagem:
        "Fonte de alertas ainda não configurada. Integração INMET prevista.",
    };
  }
  try {
    const consulta =
      localizacao.modo === "gps"
        ? `lat=${localizacao.latitude}&lon=${localizacao.longitude}`
        : `q=${encodeURIComponent(`${localizacao.cidade},${localizacao.estado},BR`)}`;
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${consulta}&appid=${chave}&lang=pt_br`
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
          id: String(alerta.event ?? `alerta-${i}`),
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
}
