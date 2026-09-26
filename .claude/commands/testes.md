---
description: Escrever testes unitários e/ou E2E para um alvo
argument-hint: [arquivo | função | rota]
allowed-tools: Read, Write, Edit, Bash(npx vitest:*), Bash(npx jest:*)
model: sonnet
---

# Escrever testes

## Contexto obrigatório

@.claude/harness-rules.md (seção 12)
Veja exemplos em `tests/` existentes

## Alvo

$ARGUMENTS

## Casos obrigatórios

- [ ] Caminho de sucesso
- [ ] Input inválido (validação Zod)
- [ ] Erro de domínio (`NOT_FOUND`, `CONFLICT`, etc.)
- [ ] Erro inesperado (500)
- [ ] Autorização (401/403) se aplicável

## Regras

- Prisma mockado (sem banco real em unit)
- `fetch` mockado (sem rede em unit)
- Sem `.only`, sem `.skip`, sem sleeps reais
- Nomes descritivos: `it('retorna 404 quando post não existe', ...)`
- Independentes (sem ordem implícita)

## Validação

Rode os testes e reporte cobertura do alvo.
Meta: ≥ 80%.
