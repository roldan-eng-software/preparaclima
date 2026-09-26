---
description: Debugar bug com investigação estruturada antes da correção
argument-hint: [sintoma ou descrição]
allowed-tools: Read, Grep, Glob, Bash(npx tsc:*), Bash(npx vitest:*), Bash(npx jest:*)
model: sonnet
---

# Debug de bug

## Contexto obrigatório

@.claude/harness-rules.md

## Sintoma

$ARGUMENTS

## Passos obrigatórios (não pule)

1. **NÃO proponha correção ainda.** Primeiro investigue.
2. Liste 3 hipóteses ordenadas por probabilidade.
3. Para cada hipótese, diga como confirmar/refutar.
4. Confirme a causa raiz com evidência (log, teste, inspeção).
5. **Só então** proponha a correção mínima.

## Requisitos da correção

- Mudança mínima (não refatorar de brinde)
- Teste que reproduz o bug **antes** da correção
- Teste passa **depois** da correção
- Sem regressão nos testes existentes

## Validação

Rode @.claude/validation-checklist.md completo ao final.
