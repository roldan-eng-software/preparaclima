---
description: Criar middleware (auth, rate limit, validação, etc.)
argument-hint: [nome] [responsabilidade]
allowed-tools: Read, Write, Edit, Glob, Grep
model: sonnet
---

# Criar middleware

## Contexto obrigatório

@.claude/harness-rules.md
@.claude/conventions.md

## Argumentos

$ARGUMENTS

## Passos

1. Criar `lib/middleware/$NOME.ts`
2. Função pura, sem estado global
3. Erros como `Error('CODE')` — nunca retornar `false`
4. Verificar assinatura de token (não apenas presença)
5. JSDoc completo
6. Tipos de payload em `types/` se necessário
7. Testes unitários cobrindo todos os cenários de erro

## Validação

Rode @.claude/validation-checklist.md §6 antes de finalizar.
