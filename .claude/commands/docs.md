---
description: Atualizar documentação após mudanças no código
argument-hint: [mudança]
allowed-tools: Read, Write, Edit, Glob, Grep
model: sonnet
---

# Atualizar documentação

## Contexto

$ARGUMENTS

## Passos

1. Identifique todas as referências desatualizadas no projeto.
2. Verifique se a mudança afeta `.claude/`, `.specify/` ou `docs/`.
3. Atualize:
   - `docs/ARCHITECTURE.md` se arquitetura mudou
   - `docs/HARNESS.md` se padrões mudaram
   - `.env.example` se novas env vars
   - `README.md` se setup mudou
   - JSDoc de funções afetadas
4. Verifique links internos quebrados.

## Regras

- Tom objetivo e técnico
- Não duplicar conteúdo entre arquivos
- Exemplos de código atualizados

## Saída

- Diff das atualizações
- Lista de arquivos revisados (mesmo os que não precisaram mudar)
