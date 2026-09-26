---
description: Atualizar schema Prisma e gerar migration
argument-hint: [descrição da mudança]
allowed-tools: Read, Write, Edit, Bash(npx prisma:*), Bash(npx tsc:*)
model: sonnet
---

# Nova migration Prisma

## Contexto obrigatório

@prisma/schema.prisma
@.claude/harness-rules.md (seção 13)

## Argumentos

$ARGUMENTS

Se a mudança for breaking ou exigir backfill, **avise antes de prosseguir**.

## Passos

1. Editar `prisma/schema.prisma`
   - Manter `@@map("snake_case_plural")`
   - `createdAt` + `updatedAt` em models de negócio
   - Índices explícitos para FKs e campos de busca
2. Rodar: `npx prisma migrate dev --name $DESCRICAO`
3. Rodar: `npx prisma generate`
4. Copiar schema atualizado para `.claude/schema.prisma`
5. Atualizar tipos derivados se necessário
6. Rodar `npx tsc --noEmit` para verificar erros

## Proibições

- Nunca editar migration já aplicada
- Nunca usar `db push` fora de local

## Saída

Liste migration gerada, arquivos modificados e confirmação do tsc.
