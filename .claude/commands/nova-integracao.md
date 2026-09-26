---
description: Criar integração com API externa (retry + timeout + cache)
argument-hint: [nome-da-api]
allowed-tools: Read, Write, Edit, Glob, Grep
model: sonnet
---

# Integração com API externa

## Contexto obrigatório

@.claude/harness-rules.md
Verifique `lib/utils/retry.ts` (deve existir)

## Argumentos

$ARGUMENTS

Se a URL base, autenticação ou endpoints não estiverem claros, **pergunte**.

## Passos

1. Criar `lib/external/$API.ts`
2. Verificar env vars no topo (`if (!KEY) throw new Error(...)`)
3. Usar `withRetry` com backoff exponencial (3 tentativas, base 1000ms)
4. `AbortSignal.timeout(10_000)` em toda chamada
5. Erros tipados: `Error('${API}_ERROR_${status}')`
6. Logging estruturado (sem PII)
7. Cache quando resposta for estável
8. Tipos de resposta em `types/$API.types.ts`
9. Testes com `fetch` mockado em `tests/unit/external/`

## Proibições

- Nunca chamar dentro de `prisma.$transaction`
- Nunca expor chave com `NEXT_PUBLIC_`
- Nunca hardcodar tokens

## Validação

Rode @.claude/validation-checklist.md §5 antes de finalizar.
