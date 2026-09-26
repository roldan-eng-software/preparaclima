---
description: Code review completo contra o harness
argument-hint: [arquivo(s) ou PR]
allowed-tools: Read, Grep, Glob, Bash(npx tsc:*), Bash(npx eslint:*), Bash(git diff:*), Bash(gh pr diff:*)
model: sonnet
---

# Code review

## Alvo

$ARGUMENTS

## Contexto dinâmico

- Diff: !`git diff HEAD`
- Branch atual: !`git branch --show-current`

## Processo

1. Rode @.claude/validation-checklist.md do início ao fim.
2. Para cada item que falhar, cite:
   - Arquivo e linha
   - Regra violada (com link para o arquivo do harness)
   - Correção sugerida
3. Classifique cada achado:
   - 🔴 bloqueador
   - 🟡 importante
   - 🟢 sugestão
4. Veredito final:
   - ✅ pronto
   - 🟡 pronto com ressalvas
   - 🔴 não pronto

## Não faça

- Sugerir refactor fora do escopo do PR
- Reclamar de estilo já coberto por prettier/eslint
- Aprovar com bloqueador aberto
