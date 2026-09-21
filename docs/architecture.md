# PreparaClima — Arquitetura e Decisões Técnicas

> Última atualização: 2026-09-21

## Visão geral

Monorepo com dois pacotes independentes: app Expo (`src/`, raiz do
`package.json`) e API Fastify (`server/`, `package.json` próprio).
Sem backend real, banco, auth ou testes. Produto e roadmap:
[project-overview.md](project-overview.md), [ClimaSafe_PRD.md](ClimaSafe_PRD.md).

## App — estrutura `src/`

```
src/app/            # Expo Router (cada arquivo = rota)
  _layout.tsx       # Provider Redux + ThemeProvider + GuardRotas + avisos
  (tabs)/           # index (Início), plano, contatos, avisos, _layout
  onboarding/       # quiz, localizacao, domicilio, revisao, _layout
  privacidade.tsx   # tela LGPD mínima + apagar-tudo
src/components/     # themed-*, aviso-offline, haptic-tab, external-link, ui/
src/constants/theme.ts  # Colors light/dark + CoresAlerta + Fonts
src/hooks/          # use-color-scheme(.web), use-theme-color, use-rede
src/store/          # index + profileSlice + painelSlice + progressoSlice
  # + contatosSlice (@preparaclima:contatos) + avisosSlice (@preparaclima:avisos)
src/services/       # clima.ts, alertas.ts, avisos.ts (background + regras)
src/types/          # profile, clima, alerta, contato, avisos
src/lib/            # planos.ts (catálogo 6 riscos × 3 fases PT-BR)
src/assets/images/  # ícone, splash, favicon, logos do template
src/lib/            # vazio (reservado)
```

Alias `@/* → ./src/*` (`tsconfig.json`). Router usa `src/app` como raiz
com `typedRoutes: true` e `reactCompiler: true` (`app.json`).

## Estado — Redux `profile`

`src/store/profileSlice.ts`: `riscos[]`, `localizacao` (gps/manual),
`pessoasDomicilio` (1–20), `mobilidade[]`, `onboardingConcluido`.
Actions: `alternarRisco` (`multiplos` é exclusivo), `definirLocalizacao`,
`definirPessoasDomicilio`, `alternarMobilidade` (`nenhuma` limpa),
`concluirOnboarding`, `hidratarPerfil`, `reiniciarOnboarding`.
`src/store/index.ts`: `configureStore` + `subscribe` com debounce de
300ms gravando em AsyncStorage (`@preparaclima:perfil`, com migração
da chave legada `@climasafe:perfil`); leitura via
`carregarPerfilPersistido()`. Hooks tipados `useAppDispatch/Selector`.

## Navegação e guarda

`src/app/_layout.tsx`: hidrata o perfil (só aplica se `onboardingConcluido`),
`GuardRotas` usa `useSegments()` — incompleto fora de `onboarding` vai para
`/onboarding/quiz`; concluído dentro vai para `/(tabs)`. Sem auth, sem
deep-linking custom além do scheme `preparaclima`.

## Tema e UI

React Native Paper para telas novas; componentes do template usam
`ThemedText/ThemedView` + `useThemeColor`. `CoresAlerta` define os 4 níveis
do PRD: verde `#22C55E`, amarelo `#EAB308`, laranja `#F97316`,
vermelho `#DC2626`, com rótulos PT-BR. Sem i18n (strings PT-BR no código,
conforme PRD Brasil-first).

## Dependências (Expo SDK 54, RN 0.81, React 19)

Instaladas via `npx expo install`: `@reduxjs/toolkit`, `react-redux`,
`react-native-paper`, `expo-notifications` (não configurado: sem handler,
sem permissões, sem `app.json` plugin), `expo-location` (só onboarding),
`@react-native-async-storage/async-storage`. Paper/notifications têm código
nativo → exigem development build, não rodam no Expo Go.

## Servidor `server/`

Fastify 5 + Pino, ESM (`tsx` dev, `tsc` build), `GET /saude`, `GET /alertas`
vazio, porta `3333` (`PORT`), `.env.example` com `DATABASE_URL`/`REDIS_URL`
não utilizados. `tsconfig.json` próprio; raiz o exclui do typecheck/app.

## Tooling e qualidade

`npm run lint` (`expo lint`), `npm run typecheck` (`tsc --noEmit`),
`npx expo-doctor` (18/18 em 2026-09-21). Pre-commit Husky: `lint-staged`
(Prettier `--ignore-unknown --write`) + `typecheck`; sem script `test`.
CNG: sem `ios/`/`android` (gerados, nunca editar à mão). `reset-project`
do template não se aplica mais (estrutura já é `src/`).
