---
description: Criar novo endpoint CRUD seguindo o harness
argument-hint: [MÉTODO] [recurso] — ex: POST posts
allowed-tools: Read, Write, Edit, Bash(npx:*), Bash(npm:*), Glob, Grep
model: sonnet
---

# Criar novo endpoint

## Contexto obrigatório

Leia ANTES de qualquer coisa:
@.claude/harness-rules.md
@.claude/conventions.md
@prisma/schema.prisma

## Argumentos

$ARGUMENTS

Se os argumentos não especificarem claramente:

- Método HTTP e recurso
- Campos de entrada (com regras)
- Autenticação necessária

**Pergunte antes de assumir.**

## Passos

1. Verificar se o recurso já tem service em `lib/services/`
2. Criar/atualizar `types/$RECURSO.types.ts` (schema Zod + tipos)
3. Criar/atualizar `lib/services/$RECURSO.service.ts` (função do service)
4. Criar `app/api/$RECURSO/route.ts` (route handler)
5. Criar `tests/unit/services/$RECURSO.service.test.ts`
6. Criar `tests/e2e/api/$RECURSO.test.ts`

## Regras invioláveis

- Input validado com Zod (`.safeParse()`)
- Serviço em `/lib/services` (nunca Prisma direto no handler)
- Resposta via `successResponse`/`errorResponse`
- `try/catch` com mapeamento de erros
- Status correto (201 create, 200 read, 204 delete)
- JSDoc em funções públicas
- Imports absolutos `@/`
- Sem `any`

## Validação final

Antes de retornar, rode o checklist mental em @.claude/validation-checklist.md §18.
Liste os arquivos criados/modificados ao final.
