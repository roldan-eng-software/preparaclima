# PreparaClima — Expo / React Native

App mobile Brasil-first (PT-BR) de alerta climático + preparação pessoal.
Onboarding de perfil de risco → Painel (Início) → Plano → Contatos → Avisos.
Sem backend, sem conta, sem nuvem: perfil, checklist, contatos e prefs ficam
só no aparelho (AsyncStorage). Especificação: `docs/prd/climasafe-mvp.md`,
visão: `docs/project-overview.md`, arquitetura: `docs/architecture.md`.

Status: MVP implementado (Specs 01–09). Sem `EXPO_PUBLIC_OPENWEATHER_API_KEY`
o painel exibe demonstração sinalizada; INMET está em homologação (stub).

## Stack real (não adivinhe — confira `package.json`)

- `expo ~54.0.36`, `react-native 0.81.5`, `react 19.1.0`, `expo-router ~6.0.24`
- Redux Toolkit + react-redux, React Native Paper, AsyncStorage
- `expo-location`, `expo-notifications`, `expo-background-task` + `expo-task-manager`,
  `@react-native-community/netinfo`
- Alias `@/* → ./src/*` (`tsconfig.json`); `typedRoutes: true`, `reactCompiler: true`,
  `newArchEnabled: true` (`app.json`). Gerenciador: **npm** (`package-lock.json`
  presente — NÃO usar `bunx`; não há `bun.lock`).

## Expo muda todo SDK — não confie na memória

Antes de tocar em API Expo/EAS/RN:

1. Confirme o major de `expo` em `package.json`.
2. Consulte a doc versionada (`versions/v<major>.0.0`) em `docs.expo.dev`.
3. Para o restante, consulte `llms.txt` em `docs.expo.dev` e siga os links.
   Nunca responda de memória.

## Commands

```bash
npm install
npx expo start --clear            # dev; `a` Android, `i` iOS, `w` web
npx expo install <package>        # SEMPRE para deps Expo (resolve versão do SDK)
npm run lint                      # expo lint
npm run typecheck                 # tsc --noEmit
npx expo-doctor                   # dependências/config
npx expo install --fix            # corrige versões incompatíveis
```

Rode **lint + typecheck** antes de declarar qualquer tarefa pronta.
Pre-commit (Husky + lint-staged): Prettier nos staged + `typecheck`. Sem suite de testes.

Servidor `server/` é esqueleto Fastify fora do recorte (`GET /saude`, `GET /alertas`
em :3333) — não mexa nele salvo pedido explícito.

## Rotas (Expo Router em `src/app/`)

Cada arquivo em `src/app/` é uma tela; `_layout.tsx` define navegadores.
Não-route code fica fora de `src/app/`.

```text
src/app/_layout.tsx          # Provider Redux + Paper + hidratação + GuardRotas + avisos
src/app/(tabs)/_layout.tsx   # 4 tabs: Início, Plano, Contatos, Avisos
src/app/(tabs)/index.tsx     # Dashboard: alerta principal + Agora + Próximas horas + perfil
src/app/(tabs)/plano.tsx     # checklist por risco
src/app/(tabs)/contatos.tsx  # pessoais + públicos
src/app/(tabs)/avisos.tsx    # preferências de notificação
src/app/onboarding/          # quiz → localizacao → domicilio → revisao (+ _layout)
src/app/localizacao.tsx      # editar localização pós-onboarding
src/app/privacidade.tsx      # o que fica local + apagar-tudo (2 passos, digitar APAGAR)
```

`GuardRotas` (`_layout.tsx`, via `useSegments`): incompleto fora de `onboarding`
→ `/onboarding/quiz`; concluído dentro de `onboarding` → `/(tabs)`.
Importe `Link`, `router`, `useLocalSearchParams` de `expo-router`.
Docs do Router: [router/introduction.md](https://docs.expo.dev/router/introduction.md)

## Estado (Redux em `src/store/`) + persistência

5 slices, todos persistidos em AsyncStorage com debounce de 300ms (`store.subscribe`
em `index.ts` + persisters por slice):

| Slice            | Conteúdo                                                                                               | Chave                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `profileSlice`   | `riscos[]`, `localizacao` (gps/manual), `pessoasDomicilio` 1–20, `mobilidade[]`, `onboardingConcluido` | `@preparaclima:perfil` (migra legado `@climasafe:perfil`) |
| `painelSlice`    | leitura clima + previsão + alertas + estados; thunk `atualizarPainel()`                                | `@preparaclima:painel` (cache)                            |
| `progressoSlice` | checklist concluído por risco                                                                          | `@preparaclima:progresso`                                 |
| `contatosSlice`  | pessoais (máx 10, CRUD)                                                                                | `@preparaclima:contatos`                                  |
| `avisosSlice`    | tipos, silêncio 22h–8h, resumo diário, dedupe                                                          | `@preparaclima:avisos`                                    |

Regras: `multiplos` é exclusivo em `alternarRisco`; `nenhuma` limpa mobilidade.
Hidratação no `_layout.tsx` (perfil só aplica se `onboardingConcluido`).
Hooks tipados `useAppDispatch` / `useAppSelector`. Apagar-tudo limpa as 6 chaves
(inclui legado) e re-hidrata com estados iniciais.

## Serviços (`src/services/`) — regras de honestidade

- `clima.ts`: OpenWeather `weather` + `forecast` (`cnt=8`, exibe 2 itens).
  Sem chave → **demonstração sinalizada** (`demonstracao: true`, texto "demonstração
  (sem chave)"). Sem rede → `sem-rede` + cache com selo "desatualizado".
  404 cidade → `local-nao-encontrado`.
- `alertas.ts` + `provedores.ts`: multi-fonte `[INMET, OpenWeather]` com dedupe
  por `titulo|validade`; INMET tem precedência e para o loop. Hoje INMET é stub
  (gate `EXPO_PUBLIC_INMET_HABILITADO`, retorna `servico-indisponivel`); notas de
  descoberta em `provedores.ts:89-97` — endpoint JSON ainda não confirmado.
  `mapearSeveridadeInmet()` existe para quando o endpoint for confirmado.
  Na prática `/weather` não retorna `alerts` → lista vazia é normal.
- `alertaProvisorioPorCondicao()`: estima severidade pelo clima (condicaoId,
  chuva ≥10/25/50mm, vento ≥60/90/120 km/h) quando não há alerta oficial.
  Sempre marcado `provisorio: true`, órgão "PreparaClima (estimativa)".
- **Nunca finja verde**: `fonteIndisponivel` / `alertasErro` / cobertura limitada
  têm texto explícito no Dashboard. Provisório sempre rotulado "estimativa automática".
- `avisos.ts`: permissão + canal Android `alertas-clima` (HIGH), background task
  `preparaclima-checar-alertas` (mín. 60min) + checagem ao atualizar painel.
  Vermelho fura o silencioso; demais: máx 1/dia por nível + 1/dia por id.
  Toque no aviso abre `/(tabs)` via `data.url`.
- `src/lib/planos.ts`: catálogo offline 6 riscos (`enchente`, `deslizamento`,
  `seca`, `vendaval`, `geada`, `multiplos`) × 3 fases (antes/durante/depois),
  12 itens cada, PT-BR simples.
- Env: `EXPO_PUBLIC_OPENWEATHER_API_KEY` (clima+previsão+alertas),
  `EXPO_PUBLIC_INMET_HABILITADO` (liga stub INMET). Sem `.env` → modo demo.

## UI, tema e convenções

- React Native Paper nas telas novas; componentes do template usam
  `ThemedText/ThemedView` + `useThemeColor`. `CoresAlerta` em
  `src/constants/theme.ts`: verde `#22C55E` Normal, amarelo `#EAB308` Atenção,
  laranja `#F97316` Alerta, vermelho `#DC2626` Alerta crítico.
- Strings PT-BR no código (Brasil-first, sem i18n). Formatação pt-BR em
  `src/utils/format.ts` (`formatarDataHora`, `formatarHora`).
- Offline: `use-rede.ts` + `aviso-offline.tsx` (banner no painel).
- Contatos: validação DDD+numero (10–11 dígitos), nacionais fixos
  193/192/190/199 toque-para-ligar, WhatsApp/SMS com texto de localização.
- Mobile-first, cross-platform; padding de ScrollViews varia por tela
  (16–34) — siga a tela vizinha ao editar.

## Build, EAS e nativo

- Sem `ios/`/`android/` (Continuous Native Generation) — nunca crie/edite à mão;
  configure nativo em `app.json` + config plugins.
- Paper/notifications/location têm código nativo → exigem **development build**
  (`npx expo run:ios|android` ou `eas build --profile development`); não rodam
  pleno no Expo Go. Docs EAS: [eas/index.md](https://docs.expo.dev/eas/index.md)
- EAS CLI: `npx eas-cli@latest <command>` (sem `bunx` neste repo).

## Rules

- Prefira módulos Expo recomendados a libs de terceiros; cheque as skills
  disponíveis antes de adicionar dependências.
  Docs: [versions/latest](https://docs.expo.dev/versions/latest/index.md)
- `npx expo install` sempre; nunca `npm add` para pacotes Expo/RN.
- Não adicione backend/banco/auth/i18n sem pedido — fora do recorte MVP.
