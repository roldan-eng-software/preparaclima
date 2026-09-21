# PreparaClima — Visão do Produto

> Última atualização: 2026-09-21

App mobile (iOS/Android, Expo) de alerta climático com foco em
**preparação pessoal e comunitária**, estratégia **Brasil-first** (PT-BR).
Especificação completa: [ClimaSafe_PRD.md](ClimaSafe_PRD.md).

## O que existe hoje (MVP parcial)

- **Onboarding de perfil de risco** (`src/app/onboarding/`): quiz de riscos
  (enchente, deslizamento, seca, vendaval, geada, múltiplos), localização
  GPS (`expo-location`) ou manual (cidade/UF), pessoas no domicílio (1–20)
  e mobilidade (crianças, idosos, PCD). Guard em `src/app/_layout.tsx`
  redireciona para `/onboarding/quiz` até concluir; perfil persiste em
  AsyncStorage (`@preparaclima:perfil`).
- **Dashboard real** (`src/app/(tabs)/index.tsx` + `src/store/painelSlice.ts`):
  card principal com o alerta mais grave (verde/amarelo/laranja/vermelho,
  lista dos demais vigentes), bloco "Agora" com temperatura, chuva e vento
  reais (OpenWeather, com chave em `EXPO_PUBLIC_OPENWEATHER_API_KEY`) e
  resumo do perfil. Sem chave, exibe demonstração sinalizada; sem rede,
  mostra o último cache com selo de desatualizado; fonte de alertas
  indisponível nunca finge verde.
- **Servidor esqueleto** (`server/`): Fastify com `GET /saude` e
  `GET /alertas` (vazio). Sem banco, auth ou integrações.

## O que falta (Specs 05–09 do PRD MVP)

Checklist de preparação interativo (Antes/Durante/Depois) com progresso,
contatos de emergência, notificações essenciais, tela de privacidade com
apagar dados, e INMET como fonte de alertas (hoje via OpenWeather).

## Stack real

Expo SDK 54 + Router v6, React 19, Redux Toolkit + react-redux,
React Native Paper, AsyncStorage. Servidor: Fastify + Pino.
Arquitetura e comandos: [architecture.md](architecture.md), [../README.md](../README.md).
