---
description: Validar que o harness está íntegro e sincronizado
allowed-tools: Read, Glob, Bash(cat:*), Bash(ls:*)
model: haiku
---

# Harness check

## Verificações

1. `.claude/` existe com:
   - [ ] `harness-rules.md`
   - [ ] `conventions.md`
   - [ ] `validation-checklist.md`
   - [ ] `prompt-templates.md`
   - [ ] `schema.prisma`
   - [ ] `commands/` (não vazio)
2. `CLAUDE.md` raiz existe e importa:
   - [ ] `@.specify/memory/constitution.md`
   - [ ] `@.claude/harness-rules.md`
   - [ ] `@.claude/conventions.md`
   - [ ] `@.claude/validation-checklist.md`
3. `.specify/memory/constitution.md` existe.
4. `prisma/schema.prisma` idêntico a `.claude/schema.prisma`.
5. `CLAUDE.md` aninhados existem em `app/` e `lib/`.

## Saída

Relatório ✅/❌ por item.
Se algo falhar, diga como corrigir.
