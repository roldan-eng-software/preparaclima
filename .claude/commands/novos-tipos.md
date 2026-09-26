---
description: Criar schemas Zod e tipos TypeScript para um recurso
argument-hint: [recurso]
allowed-tools: Read, Write, Edit, Glob
model: sonnet
---

# Criar schemas Zod + tipos

## Contexto obrigatório

@.claude/harness-rules.md (seção 3)
@.claude/conventions.md (seção 5)

## Argumentos

$ARGUMENTS

## Passos

1. Criar `types/$RECURSO.types.ts`
2. Schema de create (`${recurso}Schema`)
3. Schema de update (`.partial()` do create)
4. Schema de params (`${recurso}IdSchema`)
5. Tipos derivados via `z.infer<>`
6. Tipo de response separado se diferir do model Prisma

## Regras

- Sem prefixo `I` em interfaces
- Sem `any`
- Sufixos corretos (`Input`, `Output`, `Response`)
- `import type` onde aplicável

## Validação

Rode @.claude/validation-checklist.md §7 antes de finalizar.
