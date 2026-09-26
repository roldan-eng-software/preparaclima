# Validation Checklist — Gate de Qualidade

> **Este arquivo é o portão final.** Nenhum código é considerado pronto sem passar por TODOS os itens aplicáveis.
> Use como: (1) checklist mental do agente antes de retornar código, (2) template de PR, (3) guia de code review.
> Referências: `harness-rules.md` (técnico), `conventions.md` (nomenclatura), `constitution.md` (princípios).

---

## Como usar

- **Agente (Claude Code):** rode este checklist antes de declarar qualquer tarefa concluída.
- **Dev humano:** cole a seção **Template de PR** no corpo do Pull Request.
- **Revisor:** use as seções por camada para validar.

Marque `[x]` apenas quando o item estiver **verificado**, não quando "parece ok".

---

## 1. Verificações Automáticas (devem passar 100%)

Rode **antes** de qualquer review humano. Se falhar, não abra PR.

```bash
# Tipagem
npx tsc --noEmit

# Lint
npx eslint . --max-warnings 0

# Formatação
npx prettier --check .

# Testes com cobertura
npx vitest run --coverage
# ou
npx jest --coverage

# Build de produção
npx next build

□ tsc --noEmit sem erros
□ eslint sem warnings
□ prettier --check sem diffs
□ Cobertura de testes ≥ 80%
□ next build sem erros
2. Estrutura e Organização
□ Arquivos criados estão nas pastas corretas (app/api, lib/services, lib/external, lib/middleware, lib/utils, types, tests)
□ Nenhuma pasta nova criada fora da estrutura definida sem justificativa
□ Nomes de arquivos seguem conventions.md §2
□ Nenhum arquivo duplicado (ex.: post.service.ts e posts.service.ts)
□ Imports usam @/ (sem ../../)
□ Ordem de imports respeitada (node → externos → @/ → relativos)
3. Rotas de API (app/api/**/route.ts)
Estrutura da rota
□ Arquivo é route.ts (não index.ts, não handler.ts)
□ Exporta funções nomeadas do HTTP (GET, POST, PUT, PATCH, DELETE) — sem default export
□ Cada método é async e tipado com NextRequest / NextResponse
□ Método HTTP correto para a ação (GET não cria, POST não deleta, etc.)
Validação de entrada
□ Body, query params e route params validados com Zod
□ Schema exportado em types/<resource>.types.ts
□ Uso de .safeParse() (nunca .parse() em handler)
□ Erro de validação retorna VALIDATION_ERROR com parsed.error.flatten().fieldErrors
□ Nenhum acesso a req.json() sem validação
Lógica
□ Nenhuma query Prisma dentro do route handler
□ Lógica delegada a lib/services/<resource>.service.ts
□ Autenticação/autorização via lib/middleware/auth.ts quando aplicável
□ Transações para operações com múltiplas escritas (via service)
Resposta
□ Retorno via successResponse() ou errorResponse()
□ NextResponse.json(response, { status }) com status correto
□ Status codes: 201 create, 200 read/update, 204 delete sem body, 400/401/403/404/409/500 conforme caso
□ Envelope ApiResponse<T> completo (success, data/error, timestamp, requestId)
Erros
□ try/catch envolve todo o handler
□ Erros de domínio mapeados (Error('POST_NOT_FOUND') → 404)
□ Erro inesperado logado com logger.error('EVENT_NAME', { error })
□ Stack trace não vaza na resposta ao cliente
□ Nenhum catch {} vazio
4. Serviços (lib/services/*.service.ts)
□ Todas as queries Prisma do recurso estão aqui
□ Cada função pública tem JSDoc com @param, @returns, @throws
□ Retornos tipados (inferidos do Prisma ou explícitos)
□ select ou include explícitos (nunca retornar colunas desnecessárias)
□ getById lança Error('NOT_FOUND') em vez de retornar null
□ Transações (prisma.$transaction) para operações correlacionadas
□ Nenhuma chamada HTTP externa dentro de $transaction
□ Nenhum console.log (usar logger quando precisar)
□ Nenhum any no tipo de retorno
5. Integrações Externas (lib/external/*.ts)
□ Env vars verificadas no topo (if (!KEY) throw new Error(...))
□ Retry com backoff exponencial (withRetry, 3 tentativas)
□ Timeout explícito (AbortSignal.timeout(10_000))
□ Erros logados com contexto (status, body truncado)
□ Erros tipados com código próprio (Error('STRIPE_ERROR_500'))
□ Cache aplicado quando a resposta é estável
□ Segredos não expostos no client (NEXT_PUBLIC_* só para valores públicos)
□ Nenhum segredo hardcoded no código
6. Middleware (lib/middleware/*.ts)
□ Funções puras (sem estado global)
□ Lançam Error('UNAUTHORIZED') / Error('FORBIDDEN') (não retornam false)
□ Verificação de assinatura de token (não apenas presença)
□ Role verificada quando necessário (requireRole)
□ JSDoc em funções exportadas
7. Tipos (types/*.types.ts)
□ Tipos exportados para todos os inputs (CreatePostInput, UpdatePostInput)
□ Schemas Zod acompanham os tipos (createPostSchema → CreatePostInput)
□ Sufixos corretos (Input, Output, Props, Schema, Args, Options)
□ Sem prefixo I em interfaces
□ Sem any (usar unknown se necessário)
□ import type para tipos puros
8. Prisma / Banco
□ schema.prisma atualizado (models, relações, índices)
□ createdAt e updatedAt presentes em models de negócio
□ @@map("snake_case_plural") em todos os models
□ Índices adicionados para FKs e campos de busca frequente
□ Migration gerada: npx prisma migrate dev --name <descricao>
□ npx prisma generate executado após mudanças
□ .claude/schema.prisma sincronizado com o atual
□ Nenhuma migration editada manualmente após aplicada
□ Nenhum db push usado fora do ambiente local
9. Testes
Cobertura
□ Serviços têm testes unitários (tests/unit/services/*.test.ts)
□ Route handlers têm testes E2E (tests/e2e/api/*.test.ts)
□ Cobertura ≥ 80% (medida por vitest --coverage / jest --coverage)
Casos cobertos (por função)
□ Caminho de sucesso
□ Input inválido (validação Zod)
□ Erro de domínio (NOT_FOUND, CONFLICT, etc.)
□ Erro inesperado (500)
□ Autorização (401/403) quando aplicável
Qualidade
□ prisma mockado em testes unitários (sem banco real)
□ Testes independentes (sem ordem implícita)
□ Nomes descritivos: it('retorna 404 quando post não existe', ...)
□ Nenhum .only ou .skip esquecido
□ Nenhum setTimeout / sleep real (usar fake timers)
10. Segurança
□ Inputs validados (Zod) — sem confiar em dados externos
□ Queries parametrizadas (Prisma cuida, mas evitar $queryRaw sem necessidade)
□ Sem segredos no código, logs ou respostas
□ Autenticação verificada em rotas protegidas
□ Autorização (role) verificada em ações sensíveis
□ Rate limit aplicado em rotas sensíveis (/auth/login, /auth/reset)
□ CORS configurado corretamente (não * em produção)
□ Headers sensíveis não retornados (Authorization, Set-Cookie em responses incorretas)
□ Dados sensíveis (senha, token) nunca logados nem serializados
11. Logging e Observabilidade
□ Logs estruturados em JSON (via logger)
□ Eventos em SCREAMING_SNAKE_CASE (CREATE_POST_FAILED)
□ Contexto útil sem PII
□ Nenhum console.log de debug esquecido
□ Erros críticos logados com severidade correta (logger.error)
□ Nenhuma informação sensível em console.*
12. Documentação
□ JSDoc em funções públicas novas ou alteradas
□ docs/ARCHITECTURE.md atualizado se a arquitetura mudou
□ docs/HARNESS.md atualizado se os padrões mudaram
□ .env.example atualizado com novas env vars
□ README.md atualizado se setup mudou
□ Comentários TODO têm autor e data
□ Nenhum comentário obsoleto ou mentiroso
13. Convenções (conventions.md)
□ Nomes de arquivos seguem §2
□ Nomes de funções seguem §3 (verbo + substantivo)
□ Variáveis descritivas, booleanos com is/has/can (§4)
□ Tipos sem prefixo I (§5)
□ Rotas REST no plural, sem verbos (§6)
□ Models Prisma com @@map (§7)
□ Commit no padrão Conventional Commits (§11)
□ Branch no padrão tipo/descricao (§12)
14. Performance
□ Nenhuma query N+1 (usar include ou select corretos)
□ Paginação em endpoints de listagem (take + cursor/skip)
□ Índices existentes para filtros e ordenações frequentes
□ Cache aplicado onde faz sentido (Next.js revalidate, in-memory)
□ Nenhuma chamada externa dentro de transação
□ Sem await sequencial quando Promise.all é possível
15. Git e PR
□ Branch criada a partir de main atualizada
□ Commits atômicos (um propósito por commit)
□ Mensagens no padrão Conventional Commits
□ Nenhum arquivo não relacionado no diff (ex.: .env, node_modules)
□ Nenhum console.log / debugger esquecido
□ Nenhuma alteração em package-lock.json / pnpm-lock.yaml sem motivo
□ PR com descrição clara do que mudou e por quê
□ PR referencia issue/task correspondente
16. Template de PR
Cole este bloco no corpo do Pull Request:

## Descrição
<!-- O que muda e por quê -->

## Tipo de mudança
- [ ] feat
- [ ] fix
- [ ] refactor
- [ ] test
- [ ] docs
- [ ] chore

## Checklist

### Automático
- [ ] `tsc --noEmit` passa
- [ ] `eslint` sem warnings
- [ ] `prettier --check` passa
- [ ] Cobertura ≥ 80%
- [ ] `next build` passa

### Estrutura
- [ ] Arquivos nas pastas corretas
- [ ] Imports absolutos `@/`
- [ ] Nomenclatura conforme `conventions.md`

### Código
- [ ] Validação Zod presente
- [ ] Serviços usados (sem Prisma em handlers)
- [ ] Resposta padronizada (`successResponse`/`errorResponse`)
- [ ] `try/catch` com mapeamento de erros
- [ ] Logging estruturado
- [ ] Transações onde necessário
- [ ] Retry + timeout em APIs externas

### Testes
- [ ] Unitários de serviços
- [ ] E2E de rotas
- [ ] Casos de erro cobertos
- [ ] Sem `.only` / `.skip`

### Banco
- [ ] Migration gerada e aplicada
- [ ] `schema.prisma` sincronizado em `.claude/`
- [ ] Índices adicionados

### Segurança
- [ ] Sem segredos hardcoded
- [ ] Autenticação/autorização verificadas
- [ ] Sem PII em logs

### Docs
- [ ] JSDoc em funções públicas
- [ ] `.env.example` atualizado
- [ ] `ARCHITECTURE.md` / `HARNESS.md` atualizados se aplicável

## Screenshots / Exemplos
<!-- Se aplicável: responses de API, logs, prints -->

## Issue relacionada
Closes #<numero>

17. Bloqueadores (não abrir PR se)
❌ tsc, eslint, prettier ou build falhando

❌ Cobertura < 80%

❌ Falta validação Zod em rota nova

❌ Prisma acessado diretamente em route handler

❌ Resposta fora do envelope ApiResponse

❌ Segredo hardcoded

❌ Migration ausente após mudança em schema.prisma

❌ Teste faltando para service ou rota nova

❌ any em código novo

❌ catch {} vazio

18. Checklist Mental do Agente (antes de retornar código)
O agente (Claude Code) deve rodar este resumo mental antes de declarar tarefa concluída:

Arquivo está na pasta correta?

Nome segue conventions.md?

Input validado com Zod?

Service usado (sem Prisma direto)?

Transação se múltiplas escritas?

Resposta via successResponse/errorResponse?

try/catch com mapeamento de erro?

Logging estruturado em erros?

Tipos sem any, import type onde aplicável?

JSDoc em funções públicas?

Testes unitário e/ou E2E inclusos?

Nenhum segredo, nenhum console.log, nenhum TODO sem autor?

Se qualquer resposta for "não", não finalize — corrija antes de retornar.

Última atualização: [DATA]
Versão: 1.0
```
