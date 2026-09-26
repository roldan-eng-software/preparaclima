---
description: Adicionar função a um service existente (ou criar novo)
argument-hint: [service] [nome-da-função]
allowed-tools: Read, Write, Edit, Glob, Grep
model: sonnet
---

# Adicionar função ao service

## Contexto obrigatório

@.claude/harness-rules.md
@.claude/conventions.md

## Argumentos

$ARGUMENTS

Se a assinatura (parâmetros/retorno) não estiver clara, **pergunte**.

## Passos

1. Localizar o service em `lib/services/`
2. Adicionar a função seguindo o padrão:
   - JSDoc completo (`@param`, `@returns`, `@throws`)
   - Tipos Prisma inferidos ou explícitos
   - `select`/`include` explícito
   - Erros de domínio como `Error('CODE')`
3. Se afetar múltiplas tabelas → usar `prisma.$transaction`
4. Criar teste unitário em `tests/unit/services/`

## Regras

- Nunca acessar `prisma` fora deste service
- Nunca `console.log` (usar `logger` se precisar)
- Nunca retornar `null` de `getById` — lançar `Error('NOT_FOUND')`
- Nenhuma chamada HTTP externa dentro de transação

## Validação

Rode @.claude/validation-checklist.md §4 antes de finalizar.
