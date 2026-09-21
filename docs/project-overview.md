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
- **Dashboard mock** (`src/app/(tabs)/index.tsx`): card de alerta
  (cores em `CoresAlerta`), bloco "Agora" com dados de demonstração e
  resumo do perfil. Botão "Ativar Plano de Emergência" é placeholder.
- **Servidor esqueleto** (`server/`): Fastify com `GET /saude` e
  `GET /alertas` (vazio). Sem banco, auth ou integrações.

## O que falta (PRD 1.2–1.7)

Integração OpenWeather/INMET, checklist de preparação interativo
(Antes/Durante/Depois), mapa de recursos locais, feed comunitário,
notificações push (`expo-notifications` instalado, não configurado),
contatos de emergência, PDF offline e LGPD.

## Stack real

Expo SDK 54 + Router v6, React 19, Redux Toolkit + react-redux,
React Native Paper, AsyncStorage. Servidor: Fastify + Pino.
Arquitetura e comandos: [architecture.md](architecture.md), [../README.md](../README.md).
