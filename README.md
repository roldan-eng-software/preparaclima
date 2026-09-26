# PreparaClima — Alerta Climático + Preparação (Brasil-first MVP)

App mobile (iOS/Android) em Expo que personaliza alertas climáticos pelo
perfil de risco do usuário: onboarding (quiz, localização, domicílio),
painel com clima e alertas reais, checklist de preparação, contatos de
emergência e avisos. Especificação: [docs/prd/climasafe-mvp.md](docs/prd/climasafe-mvp.md) ·
Visão: [docs/project-overview.md](docs/project-overview.md) ·
Arquitetura: [docs/architecture.md](docs/architecture.md).

> Status: MVP implementado (Specs 01–09). Sem chave OpenWeather, o painel
> exibe demonstração sinalizada; INMET como fonte de alertas é trabalho
> futuro.

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
src/app/            # Rotas: (tabs)/ (Início, Plano, Contatos, Avisos), onboarding/, privacidade
src/components/     # UI (themed-*, ui/*, aviso-offline)
src/constants/      # theme.ts (Colors, CoresAlerta verde→vermelho)
src/hooks/          # use-color-scheme, use-theme-color, use-rede
src/store/          # profile, painel, progresso, contatos, avisos (persistidos)
src/services/       # clima, alertas, avisos (regras + background)
src/lib/            # planos.ts (catálogo 6 riscos × 3 fases)
src/types/          # profile, clima, alerta, contato, avisos
src/utils/          # format.ts (data/hora pt-BR)
src/assets/images/  # ícone, splash, favicon
server/             # API Fastify (esqueleto, fora do recorte)
docs/               # project-overview, architecture, prd/, ClimaSafe_PRD
```

Fluxo: primeiro acesso cai em `/onboarding/quiz`; ao concluir, o perfil
persiste em AsyncStorage e o app abre o dashboard em `/(tabs)`.

## Comandos úteis

```bash
npx expo install <pkg>   # sempre usar para deps Expo (versões compatíveis)
npx expo install --fix   # corrige versões incompatíveis
```

Regras do projeto: [CLAUDE.md](CLAUDE.md).
