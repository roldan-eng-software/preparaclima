---
description: Diagnóstico READ-ONLY do estado do projeto (não altera nada)
argument-hint: [objetivo]
allowed-tools: Read, Grep, Glob, Bash(npx tsc:*), Bash(npx vitest:*), Bash(npx jest:*), Bash(find:*), Bash(ls:*)
model: sonnet
---

# Diagnóstico read-only

## Objetivo

$ARGUMENTS

## Passos

1. Liste estrutura de pastas (excluir `node_modules`, `.next`, `.git`).
2. Liste endpoints em `app/api/`.
3. Liste services em `lib/services/`.
4. Liste models em `prisma/schema.prisma`.
5. Liste integrações em `lib/external/`.
6. Rode `npx tsc --noEmit` e reporte erros.
7. Rode testes e reporte cobertura.
8. Compare `.claude/schema.prisma` com `prisma/schema.prisma`.
9. Aponte violações de `harness-rules` e `conventions`.

## Saída

- Relatório em markdown
- Seção final: "Recomendações priorizadas" com 🔴🟡🟢

## Proibido

- Editar arquivos
- Rodar migrations
- Fazer commits
