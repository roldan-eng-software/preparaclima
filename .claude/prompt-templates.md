# Prompt Templates — Kit de Tarefas Comuns

> **Como usar:** copie o bloco de prompt da tarefa desejada, substitua os `<placeholders>`, e cole no Claude Code.
> Cada template já instrui o agente a consultar `harness-rules.md`, `conventions.md` e `validation-checklist.md`.
> Templates são pontos de partida — adapte quando o caso real exigir.

---

## Índice

- [Prompt Templates — Kit de Tarefas Comuns](#prompt-templates--kit-de-tarefas-comuns)
  - [Índice](#índice)
  - [1. Novo Endpoint CRUD](#1-novo-endpoint-crud)
  - [2. Novo Service](#2-novo-service)
  - [3. Nova Integração com API Externa](#3-nova-integração-com-api-externa)
  - [4. Novo Middleware](#4-novo-middleware)
  - [5. Novo Schema Zod + Tipos](#5-novo-schema-zod--tipos)
  - [6. Nova Migration Prisma](#6-nova-migration-prisma)
  - [7. Feature com Transação](#7-feature-com-transação)
  - [8. Refactor](#8-refactor)
  - [9. Debug de Bug](#9-debug-de-bug)
  - [10. Testes](#10-testes)
  - [11. Code Review / Análise](#11-code-review--análise)
  - [12. Documentação](#12-documentação)
  - [13. Comando de Diagnóstico (read-only)](#13-comando-de-diagnóstico-read-only)
  - [Apêndice A — Modificadores universais](#apêndice-a--modificadores-universais)
  - [Apêndice B — Como o agente usa estes templates](#apêndice-b--como-o-agente-usa-estes-templates)
  - [Apêndice C — Combinações frequentes](#apêndice-c--combinações-frequentes)

---

## 1. Novo Endpoint CRUD

**Quando usar:** criar uma nova rota REST completa (`GET`, `POST`, `PUT`, `DELETE`).

**Prompt:**

Crie o endpoint <MÉTODO> /api/<RECURSO> seguindo RIGOROSAMENTE o harness.

Contexto
Recurso: <nome do recurso, ex: posts>

Método: <GET | POST | PUT | PATCH | DELETE>

Descrição: <o que a rota faz>

Antes de gerar código
Leia @.claude/harness-rules.md (seções 3, 4, 5, 8)

Leia @.claude/conventions.md (seções 2, 3, 6)

Consulte o schema atual em @.specify/memory/constitution.md e prisma/schema.prisma

Requisitos
Schema Zod de entrada: <lista de campos com regras>

Serviço a usar (ou criar): <lib/services/<recurso>.service.ts>

Autenticação: <public | requireAuth | requireRole('ADMIN')>

Status de sucesso: <200 | 201 | 204>

Saída esperada
types/<recurso>.types.ts (schema Zod + tipos inferidos)

lib/services/<recurso>.service.ts (função do service)

app/api/<recurso>/route.ts (route handler)

tests/unit/services/<recurso>.service.test.ts

tests/e2e/api/<recurso>.test.ts

Validação obrigatória
Antes de finalizar, rode o checklist mental em @.claude/validation-checklist.md §18.
Se algum item falhar, corrija antes de retornar.

**Exemplo preenchido:**

Crie o endpoint POST /api/posts seguindo RIGOROSAMENTE o harness.

Contexto
Recurso: posts

Método: POST

Descrição: criar novo post vinculado ao usuário autenticado

Requisitos
Schema Zod: title (min 3, max 200), content (min 10), published (bool opcional, default false)

Serviço: createPost em lib/services/post.service.ts

Autenticação: requireAuth

Status de sucesso: 201

Saída esperada
types/post.types.ts

lib/services/post.service.ts (createPost)

app/api/posts/route.ts (POST)

tests/unit/services/post.service.test.ts

tests/e2e/api/posts.test.ts

---

## 2. Novo Service

**Quando usar:** adicionar função de negócio/query sem criar rota nova.

**Prompt:**

Adicione a função <NOME_DA_FUNÇÃO> em lib/services/<RECURSO>.service.ts seguindo o harness.

Contexto
Service: <lib/services/xxx.service.ts>

Função: <nome>

Descrição: <o que faz>

Assinatura esperada: <parâmetros e retorno>

Antes de gerar código
Leia @.claude/harness-rules.md (seção 5 — Services, seção 6 — Transações)

Leia @.claude/conventions.md (seção 3 — Funções)

Requisitos técnicos
JSDoc completo (@param, @returns, @throws)

Tipos Prisma inferidos ou explícitos (nunca any)

select/include explícito

Erros de domínio como Error('<CODE>')

Transação ($transaction) se afetar múltiplas tabelas

Teste unitário em tests/unit/services/

Validação
Nenhuma query fora deste service

Nenhum console.log (usar logger se precisar)

Rodar checklist @.claude/validation-checklist.md §4

**Exemplo preenchido:**

Adicione a função publishPost em lib/services/post.service.ts.

Contexto
Função: publishPost

Descrição: marca post como publicado e cria notificação para o autor

Assinatura: (postId: string) => Promise<Post>

Requisitos técnicos
Transação obrigatória (afeta posts + notifications)

Lançar Error('POST_NOT_FOUND') se não existir

Teste unitário cobrindo sucesso, not found e erro de transação

---

## 3. Nova Integração com API Externa

**Quando usar:** consumir uma nova API de terceiros.

**Prompt:**

Crie a integração com a API <NOME> em lib/external/<nome>.ts seguindo o harness.

Contexto
API: <nome da API>

Base URL: <url>

Autenticação: <API Key | Bearer | OAuth2 | nenhuma>

Env vars necessárias: <lista>

Rate limit: <X req/min, se souber>

Endpoints a implementar
<MÉTODO> <path> — <descrição> — retorno esperado: <tipo>

<MÉTODO> <path> — <descrição>

Antes de gerar código
Leia @.claude/harness-rules.md (seção 7 — APIs Externas)

Confirme que withRetry existe em lib/utils/retry.ts

Requisitos técnicos
Verificar env vars no topo do arquivo (throw se faltar)

Retry com backoff exponencial (3 tentativas, baseDelay 1000ms)

Timeout de 10s via AbortSignal.timeout(10_000)

Erros tipados: Error('<NOME>ERROR<status>')

Logging estruturado com logger.error (sem PII)

Cache quando a resposta for estável

Saída esperada
lib/external/<nome>.ts

Tipos de resposta em types/<nome>.types.ts

tests/unit/external/<nome>.test.ts (com fetch mockado)

Proibições
Nunca chamar dentro de prisma.$transaction

Nunca expor chave com NEXT_PUBLIC_

Nunca hardcodar tokens

**Exemplo preenchido:**

Crie a integração com a API Stripe em lib/external/stripe.ts.

Contexto
Base URL: https://api.stripe.com/v1

Autenticação: Bearer (STRIPE_SECRET_KEY)

Env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET

Endpoints
POST /customers — criar cliente — retorno: StripeCustomer

GET /prices?active=true — listar preços — retorno: StripePrice[]

Requisitos
Cache de 5 min para GET /prices

Teste cobrindo sucesso, timeout e erro 4xx/5xx

---

## 4. Novo Middleware

**Quando usar:** adicionar verificação transversal (auth, rate limit, logging, etc.).

**Prompt:**

Crie o middleware <NOME> em lib/middleware/<nome>.ts seguindo o harness.

Contexto
Middleware: <nome>

Responsabilidade: <o que valida/verifica>

Entrada: <NextRequest | objeto específico>

Saída em sucesso: <payload | void>

Erros possíveis: <UNAUTHORIZED | FORBIDDEN | RATE_LIMITED | ...>

Antes de gerar código
Leia @.claude/harness-rules.md (seção 10 — Auth)

Leia @.claude/conventions.md (seção 3 — Funções)

Requisitos técnicos
Função pura (sem estado global)

Erros como Error('<CODE>') — não retornar false

Verificar assinatura (não apenas presença)

JSDoc completo

Testes unitários cobrindo todos os cenários de erro

Saída esperada
lib/middleware/<nome>.ts

types/<nome>.types.ts (payloads)

tests/unit/middleware/<nome>.test.ts

**Exemplo preenchido:**

Crie o middleware requireRole em lib/middleware/auth.ts.

Contexto
Responsabilidade: validar que o payload do usuário tem a role exigida

Entrada: (payload: AuthPayload, role: Role)

Saída: void (lança se não autorizado)

Erros: FORBIDDEN

Requisitos
ADMIN passa sempre

Testes para ADMIN, USER, GUEST, role inválida

---

## 5. Novo Schema Zod + Tipos

**Quando usar:** definir contrato de entrada/saída antes de implementar lógica.

**Prompt:**

Crie os schemas Zod e tipos TypeScript para o recurso <RECURSO> em types/<recurso>.types.ts.

Contexto
Recurso: <nome>

Campos de entrada (Create): <lista com regras>

Campos de entrada (Update): <quais são parciais>

Campos de entrada (IDs/params): <formato>

Tipo de saída: <campos retornados ao cliente>

Antes de gerar código
Leia @.claude/harness-rules.md (seção 3 — Validação Zod)

Leia @.claude/conventions.md (seção 5 — Tipos)

Requisitos técnicos
<recurso>Schema para create

update<Recurso>Schema como .partial() do create

<recurso>IdSchema para params

z.infer<typeof schema> para tipos derivados

Um tipo <Recurso>Response separado se a saída diferir do model Prisma

Saída esperada
types/<recurso>.types.ts

Nenhum tipo com prefixo I

Nenhum any

**Exemplo preenchido:**

Crie schemas Zod e tipos para o recurso Post em types/post.types.ts.

Campos de entrada (Create)
title: string, min 3, max 200

content: string, min 10

published: boolean, opcional, default false

tags: array de string, max 10, opcional

Campos (Update)
Todos opcionais

Params
id: string cuid

Tipo de saída (PostResponse)
id, title, content, published, tags, createdAt, updatedAt, author { id, name }

---

## 6. Nova Migration Prisma

**Quando usar:** alterar `schema.prisma` e aplicar no banco.

**Prompt:**

Atualize o schema Prisma para <DESCRIÇÃO DA MUDANÇA> e prepare a migration.

Contexto
Mudança: <adicionar model | adicionar campo | alterar relação | adicionar índice>

Model(s) afetado(s): <nomes>

Impacto em dados existentes: <nenhum | backfill necessário | breaking>

Antes de gerar código
Leia o schema atual em prisma/schema.prisma

Leia @.claude/harness-rules.md (seção 13 — Migrations)

Requisitos técnicos
Manter @@map("snake_case_plural") em todos os models

createdAt + updatedAt em models de negócio

Índices explícitos para FKs e campos de busca

Nome da migration descritivo em snake_case

Passos a executar
Editar prisma/schema.prisma

Rodar: npx prisma migrate dev --name <descricao>

Rodar: npx prisma generate

Copiar schema atualizado para .claude/schema.prisma

Atualizar tipos derivados se necessário

Saída esperada
prisma/schema.prisma atualizado

prisma/migrations/<timestamp>_<nome>/migration.sql

.claude/schema.prisma sincronizado

**Exemplo preenchido:**

Adicione o model Comment ao schema Prisma.

Contexto
Mudança: novo model

Campos: id, content, postId (FK Post), authorId (FK User), createdAt, updatedAt

Relações: Post 1-N Comment, User 1-N Comment

Passos
@@map("comments"), índices em postId e authorId

Migration: add_comments_model

---

## 7. Feature com Transação

**Quando usar:** operação de negócio que afeta múltiplas tabelas atomicamente.

**Prompt:**

Implemente <FEATURE> com transação Prisma em lib/services/<recurso>.service.ts.

Contexto
Feature: <descrição>

Tabelas envolvidas: <lista>

Invariantes: <o que deve ser sempre verdade ao final>

Rollback esperado em: <casos de falha>

Antes de gerar código
Leia @.claude/harness-rules.md (seção 6 — Transações)

Confirme que todas as operações cabem em <5s

Requisitos técnicos
prisma.$transaction(async (tx) => {...})

Usar tx dentro da transação (nunca prisma)

Lançar Error('<CODE>') para rollback explícito

Nenhuma chamada HTTP externa dentro da transação

Teste unitário cobrindo: sucesso, rollback, erro no meio

Saída esperada
Função no service

Teste unitário com prisma mockado (verificar que rollback acontece)

Teste E2E da rota que a expõe (se aplicável)

**Exemplo preenchido:**

Implemente publicar post com notificação em lib/services/post.service.ts.

Contexto
Tabelas: posts, notifications

Invariante: post.published = true E notification existe

Rollback se: notification falhar

Requisitos
Nome: publishPostWithNotification

Retorno: Post atualizado

Erro POST_NOT_FOUND se id inválido

---

## 8. Refactor

**Quando usar:** melhorar código existente sem mudar comportamento.

**Prompt:**

Refatore <ARQUIVO/TRECHO> mantendo comportamento 100% idêntico.

Contexto
Alvo: <arquivo(s)>

Motivo: <duplicação | coesão | performance | legibilidade | aderência ao harness>

Comportamento atual (não pode mudar): <descreva>

Restrições
Não alterar assinatura pública (ou: posso alterar, veja abaixo)

Não alterar testes (ou: ajustar se necessário, veja abaixo)

Não introduzir novas dependências

Antes de gerar código
Leia @.claude/harness-rules.md inteiro

Rode os testes atuais para garantir baseline verde

Passos
Explique o que vai mudar e por quê (sem código)

Mostre o diff proposto

Aplique o refactor

Rode tsc + eslint + testes

Confirme que comportamento externo é idêntico

Validação
tsc --noEmit sem erros

eslint sem warnings

Testes existentes passam sem alteração

Cobertura não caiu

**Exemplo preenchido:**

Refatore lib/services/post.service.ts para eliminar duplicação de include.

Contexto
Motivo: 5 funções repetem o mesmo include: { user: { select: {...} } }

Comportamento atual: idêntico

Restrições
Manter assinaturas das funções

Manter testes passando sem mudança

Passos
Extrair constante postWithAuthor e reutilizar

---

## 9. Debug de Bug

**Quando usar:** investigar e corrigir um bug com causa desconhecida.

**Prompt:**

Debugar o seguinte problema seguindo o harness.

Sintoma
O que acontece: <descrição>

O que deveria acontecer: <esperado>

Reprodução: <passos ou curl>

Ambiente: <dev | staging | prod>

Evidências
Logs: <colar>

Erro: <colar stack trace>

Arquivos suspeitos: <lista>

Passos obrigatórios (não pule)
NÃO proponha correção ainda. Primeiro investigue.

Liste 3 hipóteses ordenadas por probabilidade.

Para cada hipótese, diga como confirmar/refutar.

Confirme a causa raiz com evidência (log, teste, inspeção).

Só então proponha a correção mínima.

Requisitos da correção
Mudança mínima (não refatorar de brinde)

Teste que reproduz o bug ANTES da correção

Teste passa DEPOIS da correção

Sem regressão nos testes existentes

Validação
Rode @.claude/validation-checklist.md completo

**Exemplo preenchido:**

Debugar: POST /api/posts retorna 500 quando title tem emoji.

Sintoma
Esperado: 201 criando post normalmente

Atual: 500 INTERNAL_ERROR

Evidências
Log: CREATE_POST_FAILED { error: "invalid byte sequence for encoding UTF8" }

Passos
Investigar encoding do body, schema Zod, e collation do Postgres

Reproduzir com teste antes de corrigir

---

## 10. Testes

**Quando usar:** adicionar ou completar testes.

**Prompt:**

Escreva testes para <ALVO> seguindo o harness.

Contexto
Alvo: <arquivo | função | rota>

Tipo: <unit | e2e | ambos>

Cobertura atual do alvo: <X%>

Meta: <≥80% | casos específicos>

Casos obrigatórios
□ Caminho de sucesso
□ Input inválido (validação Zod)
□ Erro de domínio (<NOT_FOUND | CONFLICT | ...>)
□ Erro inesperado (500)
□ Autorização (401/403) se aplicável
Requisitos técnicos
Prisma mockado (sem banco real em unit)

fetch mockado (sem rede em unit)

Sem .only, sem .skip, sem sleeps reais

Nomes descritivos: it('retorna 404 quando post não existe')

Independentes (sem ordem implícita)

Antes de gerar código
Leia @.claude/harness-rules.md (seção 12 — Testes)

Veja exemplos em tests/ existentes para seguir o padrão

Saída esperada
tests/<tipo>/<caminho>/<arquivo>.test.ts

Cobertura do alvo ≥ meta

**Exemplo preenchido:**

Escreva testes unitários para createPost em lib/services/post.service.ts.

Casos
☑ Sucesso: cria post com userId e retorna com author
☑ Erro: prisma.create lança → propaga
☑ Verifica que select/include correto foi usado
Requisitos
Mock de @/lib/db (prisma)

Sem banco real

---

## 11. Code Review / Análise

**Quando usar:** revisar código antes de merge, ou auditar PR de outro dev.

**Prompt:**

Faça review do seguinte código contra o harness.

Alvo
Arquivo(s): <lista>

Diff/PR: <link ou colar>

Processo
Rode @.claude/validation-checklist.md do início ao fim

Para cada item que falhar, cite: arquivo, linha, regra violada, correção sugerida

Classifique cada achado: 🔴 bloqueador | 🟡 importante | 🟢 sugestão

No final, dê um veredito: ✅ pronto | 🟡 pronto com ressalvas | 🔴 não pronto

Não faça
Sugerir refactor fora do escopo do PR

Reclamar de estilo já coberto por prettier/eslint

Aprovar com bloqueador aberto

**Exemplo preenchido:**

Faça review de app/api/posts/route.ts e lib/services/post.service.ts.

Processo
Checklist completo

Foco especial em: validação Zod, tratamento de erro, transações

---

## 12. Documentação

**Quando usar:** atualizar docs arquiteturais, README, JSDoc, etc.

**Prompt:**

Atualize a documentação referente a <MUDANÇA>.

Contexto
Mudança: <o que mudou no código>

Arquivos de doc afetados: <ARCHITECTURE.md | HARNESS.md | README.md | JSDoc>

Antes de gerar
Identifique todas as referências desatualizadas no projeto

Verifique se a mudança afeta também .claude/ ou .specify/

Requisitos
Manter tom objetivo e técnico

Atualizar exemplos de código se necessário

Verificar links internos

Não duplicar conteúdo entre arquivos

Saída
Diff das atualizações

Lista de arquivos revisados (mesmo os que não precisaram mudar)

**Exemplo preenchido:**

Atualize docs após adicionar model Comment.

Mudança
Novo model Comment em prisma/schema.prisma

Novo endpoint /api/comments

Arquivos
docs/ARCHITECTURE.md (adicionar diagrama de relações)

.claude/schema.prisma (sincronizar)

README.md (adicionar exemplo curl)

---

## 13. Comando de Diagnóstico (read-only)

**Quando usar:** entender o estado do projeto antes de uma mudança grande. **Não gera código** — só relatório.

**Prompt:**

Faça um diagnóstico READ-ONLY do projeto. NÃO altere nenhum arquivo.

Objetivo
<entender X | planejar Y | auditar Z>

Passos
Liste a estrutura de pastas (excluir node_modules, .next, .git)

Liste todos os endpoints em app/api/

Liste todos os services em lib/services/

Liste todos os models em prisma/schema.prisma

Liste integrações externas em lib/external/

Rode tsc --noEmit e reporte erros

Rode testes e reporte cobertura

Aponte divergências entre .claude/schema.prisma e prisma/schema.prisma

Aponte arquivos que violam harness-rules ou conventions

Saída
Relatório em markdown, sem blocos de código a menos que seja exemplos de violação

Seção final: "Recomendações priorizadas" com 🔴🟡🟢

Proibido
Editar arquivos

Rodar migrations

Fazer commits

**Exemplo preenchido:**

Diagnóstico read-only para planejar adição de feature de comentários.

Objetivo
Entender o estado atual antes de gerar spec/plan

Saída
Relatório com: models existentes, rotas, services, cobertura, e o que falta

---

## Apêndice A — Modificadores universais

Adicione ao final de qualquer prompt acima quando fizer sentido:

Regras adicionais
NÃO gere código ainda. Me mostre o plano primeiro e aguarde aprovação.

Regras adicionais
Se algo não estiver claro, PERGUNTE antes de assumir.

Se faltar informação no contexto acima, não invente.

Regras adicionais
Gere TAMBÉM os testes antes de finalizar.

Rode tsc + eslint + testes antes de retornar.

Regras adicionais
Ao final, liste TODOS os arquivos criados/modificados com um resumo de uma linha.

---

## Apêndice B — Como o agente usa estes templates

Quando o usuário cola um destes templates, o agente DEVE:

1. Consultar os arquivos referenciados no template (`@.claude/...`, `prisma/schema.prisma`, etc.)
2. Executar os passos na ordem declarada
3. Aplicar as regras de `harness-rules.md` e `conventions.md`
4. Validar contra `validation-checklist.md` antes de finalizar
5. Nunca pular a seção "Antes de gerar código"

---

## Apêndice C — Combinações frequentes

- **Nova feature completa:** `1 (endpoints)` + `5 (tipos)` + `2 (services)` + `6 (migration)` + `10 (testes)`
- **Nova integração:** `5 (tipos)` + `3 (external)` + `10 (testes)`
- **Bug em produção:** `13 (diagnóstico)` → `9 (debug)` → `10 (testes)`
- **Auditoria de PR:** `11 (review)` + `13 (diagnóstico)` se o escopo for grande
- **Antes de release:** `13 (diagnóstico)` + `11 (review)` em arquivos críticos

---

_Última atualização: [DATA]_
_Versão: 1.0_
