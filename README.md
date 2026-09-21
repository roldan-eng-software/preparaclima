# PreparaClima — Alerta Climático + Preparação (Brasil-first MVP)

App mobile (iOS/Android) em Expo que personaliza alertas climáticos pelo
perfil de risco do usuário. Onboarding (quiz, localização, domicílio) e
dashboard de alertas. Especificação: [docs/ClimaSafe_PRD.md](docs/ClimaSafe_PRD.md) ·
Visão: [docs/project-overview.md](docs/project-overview.md) ·
Arquitetura: [docs/architecture.md](docs/architecture.md).

> Status: MVP parcial. Dashboard usa dados de demonstração; integrações
> OpenWeather/INMET, checklist, mapa, feed, notificações e contatos ainda
> não implementados.

## Pré-requisitos

- Node 20.19+ e npm
- App Expo Go (só para telas sem código nativo) ou development build
  (`react-native-paper` e `expo-notifications` exigem dev build)

## Como rodar

```bash
npm install
npx expo start --clear
```

Pressione `a` (Android), `i` (iOS) ou `w` (web).

### Servidor (esqueleto Fastify)

```bash
cd server
npm install
npm run dev   # GET /saude e GET /alertas em :3333
```

## Verificações

```bash
npm run lint        # expo lint
npm run typecheck   # tsc --noEmit
npx expo-doctor     # 18/18 em 2026-09-21
```

Pre-commit (Husky): Prettier nos arquivos staged + `typecheck`.

## Estrutura

```
src/app/            # Rotas Expo Router: (tabs)/, onboarding/
src/components/     # UI (themed-*, ui/*)
src/constants/      # theme.ts (Colors, CoresAlerta verde→vermelho)
src/hooks/          # use-color-scheme, use-theme-color
src/store/          # Redux profile (riscos, localização, domicílio)
src/types/          # PerfilRisco e opções PT-BR
src/assets/images/  # ícone, splash, favicon
server/             # API Fastify (esqueleto)
docs/               # project-overview, architecture, ClimaSafe_PRD
```

Fluxo: primeiro acesso cai em `/onboarding/quiz`; ao concluir, o perfil
persiste em AsyncStorage e o app abre o dashboard em `/(tabs)`.

## Comandos úteis

```bash
npx expo install <pkg>   # sempre usar para deps Expo (versões compatíveis)
npx expo install --fix   # corrige versões incompatíveis
```

Regras do projeto: [AGENTS.md](AGENTS.md).
