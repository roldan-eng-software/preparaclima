import type { Localizacao } from "@/types/profile";
import type {
  PrevisaoHora,
  ResultadoClima,
  ResultadoPrevisao,
} from "@/types/clima";

function leituraDemonstracao(origem: string): ResultadoClima {
  return {
    ok: true,
    demonstracao: true,
    leitura: {
      temperaturaC: 24,
      precipitacaoMm: 12,
      ventoKmh: 18,
      observadaEm: new Date().toISOString(),
      origem,
    },
  };
}

export async function obterClimaAtual(
  localizacao: Localizacao | null
): Promise<ResultadoClima> {
  if (!localizacao) {
    return {
      ok: false,
      erro: "servico-indisponivel",
      mensagem: "Informe sua localização no perfil.",
    };
  }
  const chave = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  const origem =
    localizacao.modo === "manual"
      ? `${localizacao.cidade}/${localizacao.estado}`
      : `GPS ${localizacao.latitude?.toFixed(2)}, ${localizacao.longitude?.toFixed(2)}`;
  if (!chave) return leituraDemonstracao(origem);
  try {
    const consulta =
      localizacao.modo === "gps"
        ? `lat=${localizacao.latitude}&lon=${localizacao.longitude}`
        : `q=${encodeURIComponent(`${localizacao.cidade},${localizacao.estado},BR`)}`;
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${consulta}&appid=${chave}&units=metric&lang=pt_br`
    );
    if (resposta.status === 404) {
      return {
        ok: false,
        erro: "local-nao-encontrado",
        mensagem: "Cidade não encontrada. Revise sua localização.",
      };
    }
    if (!resposta.ok) {
      return {
        ok: false,
        erro: "servico-indisponivel",
        mensagem: "Serviço de clima indisponível. Tente de novo.",
      };
    }
    const dados = await resposta.json();
    return {
      ok: true,
      demonstracao: false,
      leitura: {
        temperaturaC: Math.round(dados.main?.temp ?? 0),
        precipitacaoMm: dados.rain?.["1h"] ?? 0,
        ventoKmh: Math.round((dados.wind?.speed ?? 0) * 3.6),
        observadaEm: new Date(
          (dados.dt ?? Date.now() / 1000) * 1000
        ).toISOString(),
        origem,
      },
    };
  } catch {
    return {
      ok: false,
      erro: "sem-rede",
      mensagem: "Sem conexão. Mostrando os últimos dados salvos.",
    };
  }
}

function consulta(localizacao: Localizacao): string {
  return localizacao.modo === "gps"
    ? `lat=${localizacao.latitude}&lon=${localizacao.longitude}`
    : `q=${encodeURIComponent(`${localizacao.cidade},${localizacao.estado},BR`)}`;
}

function previsaoDemonstracao(): ResultadoPrevisao {
  const agora = Date.now();
  return {
    ok: true,
    demonstracao: true,
    previsao: [3, 6].map((horas) => ({
      dataHora: new Date(agora + horas * 3600_000).toISOString(),
      temperaturaC: 24 - horas,
      descricao: "chuva leve",
      probChuva: 40,
      ventoKmh: 18,
    })),
  };
}

export async function obterPrevisao(
  localizacao: Localizacao | null
): Promise<ResultadoPrevisao> {
  if (!localizacao) {
    return {
      ok: false,
      erro: "servico-indisponivel",
      mensagem: "Informe sua localização no perfil.",
    };
  }
  const chave = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  if (!chave) return previsaoDemonstracao();
  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${consulta(localizacao)}&appid=${chave}&units=metric&lang=pt_br&cnt=8`
    );
    if (resposta.status === 404) {
      return {
        ok: false,
        erro: "local-nao-encontrado",
        mensagem: "Cidade não encontrada. Revise sua localização.",
      };
    }
    if (!resposta.ok) {
      return {
        ok: false,
        erro: "servico-indisponivel",
        mensagem: "Previsão indisponível no momento. Tente de novo.",
      };
    }
    const dados = await resposta.json();
    const lista: unknown[] = Array.isArray(dados.list) ? dados.list : [];
    const previsao: PrevisaoHora[] = lista.slice(0, 2).map((item) => {
      const bloco = item as Record<
        string,
        Record<string, unknown> | unknown[] | number | string
      >;
      const main = (bloco.main ?? {}) as Record<string, unknown>;
      const vento = (bloco.wind ?? {}) as Record<string, unknown>;
      const tempo = (
        Array.isArray(bloco.weather) ? bloco.weather[0] : {}
      ) as Record<string, unknown>;
      const dt = typeof bloco.dt === "number" ? bloco.dt : Date.now() / 1000;
      return {
        dataHora: new Date(dt * 1000).toISOString(),
        temperaturaC: Math.round(Number(main.temp ?? 0)),
        descricao: String(tempo.description ?? "—"),
        probChuva: Math.round(Number(bloco.pop ?? 0) * 100),
        ventoKmh: Math.round(Number(vento.speed ?? 0) * 3.6),
      };
    });
    return { ok: true, demonstracao: false, previsao };
  } catch {
    return {
      ok: false,
      erro: "sem-rede",
      mensagem: "Sem conexão. Mostrando a última previsão salva.",
    };
  }
}
