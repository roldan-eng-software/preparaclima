---
description: Implementar feature com transação Prisma (múltiplas tabelas)
argument-hint: [descrição da feature]
allowed-tools: Read, Write, Edit, Glob, Grep
model: sonnet
---

# Feature com transação

## Contexto obrigatório

@.claude/harness-rules.md (seção 6)
@prisma/schema.prisma

## Argumentos

$ARGUMENTS

## Requisitos

- `prisma.$transaction(async (tx) => {...})`
- Usar `tx` dentro da transação (nunca `prisma`)
- `Error('CODE')` para rollback explícito
- Nenhuma chamada HTTP externa dentro da transação
- Transação < 5s

## Passos

1. Implementar função no service
2. Teste unitário cobrindo: sucesso, rollback, erro no meio
3. Teste E2E da rota (se aplicável)

## Validação

Rode @.claude/validation-checklist.md §4 e §9 antes de finalizar.
