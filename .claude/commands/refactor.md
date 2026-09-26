---
description: Refatorar código mantendo comportamento 100% idêntico
argument-hint: [arquivo(s)] [motivo]
allowed-tools: Read, Write, Edit, Bash(npx tsc:*), Bash(npx eslint:*), Bash(npx vitest:*), Bash(npx jest:*)
model: sonnet
---

# Refactor

## Contexto obrigatório

@.claude/harness-rules.md
@.claude/conventions.md

## Argumentos

$ARGUMENTS

## Passos

1. **NÃO gere código ainda.** Explique o que vai mudar e por quê.
2. Mostre o diff proposto.
3. Aguarde aprovação (se o usuário pedir).
4. Aplique o refactor.
5. Rode `npx tsc --noEmit`, `npx eslint .`, testes.
6. Confirme comportamento externo idêntico.

## Restrições padrão

- Não alterar assinatura pública (a menos que autorizado)
- Não alterar testes (a menos que necessário)
- Não introduzir dependências

## Validação

- `tsc --noEmit` sem erros
- `eslint` sem warnings
- Testes existentes passam sem alteração
- Cobertura não caiu
