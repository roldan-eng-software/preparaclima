import type { Localizacao } from "@/types/profile";
import type { ResultadoAlertas } from "@/types/alerta";
import { buscarAlertasMultiFonte, provedorAtivo } from "./provedores";

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
  if (!provedorAtivo()) {
    return {
      ok: false,
      erro: "sem-chave",
      mensagem:
        "Fonte de alertas ainda não configurada. Configure a chave OpenWeather ou habilite o INMET.",
    };
  }
  try {
    const { alertas, erros } = await buscarAlertasMultiFonte(localizacao);
    if (alertas.length > 0) return { ok: true, alertas };
    if (erros.length > 0) {
      return { ok: false, erro: "servico-indisponivel", mensagem: erros[0] };
    }
    return { ok: true, alertas: [] };
  } catch {
    return {
      ok: false,
      erro: "sem-rede",
      mensagem: "Sem conexão. Mostrando os últimos alertas salvos.",
    };
  }
}

export { provedorAtivo };
