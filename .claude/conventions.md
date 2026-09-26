# Conventions — Nomenclatura e Estilo

> **Este arquivo define COMO nomear e formatar.** Regras de execução técnica ficam em `harness-rules.md`.
> Se houver conflito, `harness-rules.md` prevalece para o "o quê", este arquivo prevalece para o "como nomear".

---

## 1. Princípios Gerais

- **Consistência > preferência pessoal.** Se o padrão existe, siga.
- **Clareza > brevidade.** `getUserById` é melhor que `getU`.
- **Inglês no código, português na documentação para o time.** Nomes de variáveis, funções, tipos, arquivos e rotas em inglês. Comentários JSDoc e docs internos podem ser em português.
- **Sem abreviações obscuras.** `usr`, `pst`, `cfg` são proibidos. Use `user`, `post`, `config`.
- **Sem prefixos húngaros.** Nada de `strName`, `arrItems`, `objUser`.

---

## 2. Nomenclatura de Arquivos e Pastas

### Regra geral: **kebab-case** para pastas, **camelCase ou kebab-case** para arquivos conforme o tipo.

| Tipo                     | Padrão                          | Exemplo                                     |
| ------------------------ | ------------------------------- | ------------------------------------------- |
| Pastas                   | `kebab-case`                    | `password-reset/`, `user-settings/`         |
| Route handlers (Next.js) | `route.ts` (obrigatório)        | `app/api/posts/route.ts`                    |
| Serviços                 | `<resource>.service.ts`         | `post.service.ts`, `auth.service.ts`        |
| Integrações externas     | `<api-name>.ts`                 | `stripe.ts`, `openai.ts`                    |
| Middlewares              | `<funcao>.ts`                   | `auth.ts`, `validation.ts`, `rate-limit.ts` |
| Utilitários              | `<funcao>.ts`                   | `response.ts`, `logger.ts`, `retry.ts`      |
| Tipos                    | `<resource>.types.ts`           | `post.types.ts`, `auth.types.ts`            |
| Testes unitários         | `<arquivo>.test.ts`             | `post.service.test.ts`                      |
| Testes E2E               | `<rota>.test.ts`                | `posts.test.ts`                             |
| Componentes React        | `PascalCase.tsx`                | `PostCard.tsx`, `UserForm.tsx`              |
| Hooks React              | `use<Algo>.ts`                  | `useAuth.ts`, `usePost.ts`                  |
| Schemas Zod              | dentro de `<resource>.types.ts` | `createPostSchema`                          |
| Arquivos de config       | `kebab-case`                    | `next.config.mjs`, `tailwind.config.ts`     |
| Docs                     | `SCREAMING_SNAKE_CASE.md`       | `ARCHITECTURE.md`, `HARNESS.md`             |

### ❌ Proibido

- `PostService.ts` (PascalCase em serviço)
- `post_service.ts` (snake_case em arquivo TS)
- `postservice.ts` (tudo junto)
- `post.service.test.spec.ts` (sufixos redundantes)

---

## 3. Nomenclatura de Funções

### Verbos + Substantivo

Sempre comece com um verbo que descreva a ação.

| Ação                | Verbo                       | Exemplo                                       |
| ------------------- | --------------------------- | --------------------------------------------- |
| Buscar um           | `get`                       | `getUser`, `getPostById`                      |
| Buscar vários       | `list` ou `get`             | `listPosts`, `getUsers`                       |
| Buscar com filtro   | `find`                      | `findPostsByAuthor`                           |
| Criar               | `create`                    | `createPost`, `createUser`                    |
| Atualizar           | `update`                    | `updatePost`, `updateUserRole`                |
| Atualizar parcial   | `patch`                     | `patchPostStatus`                             |
| Deletar             | `delete` ou `remove`        | `deletePost`, `removeTag`                     |
| Validar             | `validate`                  | `validateRequest`, `validateToken`            |
| Verificar (boolean) | `is` / `has` / `can`        | `isAuthenticated`, `hasPermission`, `canEdit` |
| Transformar         | `parse`, `serialize`, `map` | `parseJWT`, `serializeUser`                   |
| Processar           | `handle`                    | `handlePostCreation`                          |
| Executar efeito     | `send`, `notify`, `emit`    | `sendWelcomeEmail`, `notifyUser`              |

### Regras

- ✅ `camelCase`
- ✅ Começa com verbo (exceto handlers de framework: `GET`, `POST` em Next.js são exceção obrigatória)
- ❌ Nunca `getUserData` se `getUser` já basta (evitar redundância)
- ❌ Nunca `doStuff`, `processData`, `handleClick` genéricos

### Prefixos proibidos

- `handle*` só para handlers de eventos/framework. Não use `handleUserCreation` para uma função de serviço — use `createUser`.
- Prefixo `_` (underscore) só para variáveis intencionalmente não usadas.

---

## 4. Nomenclatura de Variáveis

### Regras

- ✅ `camelCase`
- ✅ Descritivo: `userId`, não `uid`. `postList`, não `pl`.
- ✅ Booleanos com `is` / `has` / `can` / `should`: `isValid`, `hasPermission`, `canDelete`, `shouldRetry`
- ✅ Arrays no plural: `posts`, `userIds`, `tags`
- ✅ Constantes em `SCREAMING_SNAKE_CASE`: `MAX_RETRIES`, `API_TIMEOUT_MS`
- ✅ Env vars em `SCREAMING_SNAKE_CASE`: `DATABASE_URL`, `STRIPE_SECRET_KEY`

### ❌ Proibido

- `data`, `info`, `temp`, `result` sem contexto (`postData`, `userInfo` são aceitáveis)
- `i`, `j`, `k` fora de loops simples
- Nomes de uma letra (`x`, `y`, `a`, `b`) fora de coordenadas

### Padrão de sufixos

| Sufixo  | Uso                             | Exemplo                   |
| ------- | ------------------------------- | ------------------------- |
| `Id`    | Identificador                   | `userId`, `postId`        |
| `Ids`   | Array de IDs                    | `postIds`                 |
| `At`    | Timestamp                       | `createdAt`, `expiresAt`  |
| `Count` | Contador                        | `retryCount`, `likeCount` |
| `List`  | Lista (quando `posts` não cabe) | `userList`                |
| `Map`   | Dicionário                      | `roleMap`                 |
| `Set`   | Conjunto                        | `idSet`                   |

---

## 5. Nomenclatura de Tipos e Interfaces

### Regras

- ✅ `PascalCase`
- ✅ **Sem prefixo `I`** (obsoleto — `IUser` é proibido)
- ✅ **Sem prefixo `T`** exceto em generics (`T`, `TData`)
- ✅ Sufixo `Input` para payload de entrada: `CreatePostInput`, `UpdateUserInput`
- ✅ Sufixo `Output` ou `Response` para saída: `PostResponse`, `LoginOutput`
- ✅ Sufixo `Props` para props de componentes React: `PostCardProps`
- ✅ Sufixo `Schema` para schemas Zod: `createPostSchema` (mas `CreatePostInput` derivado com `z.infer`)
- ✅ Sufixo `Args` para argumentos de funções utilitárias: `RetryArgs`
- ✅ Sufixo `Options` para configs opcionais: `RetryOptions`

### Exemplos

```typescript
// ✅ CORRETO
interface User { id: string; email: string; }
interface CreateUserInput { email: string; name: string; }
interface PostCardProps { post: Post; onDelete?: () => void; }
type ApiResponse<T> = { success: boolean; data?: T };
type Role = 'ADMIN' | 'USER' | 'GUEST';

// ❌ ERRADO
interface IUser { }              // prefixo I
type user = { }                  // lowercase
interface CreateUser { }         // falta sufixo Input
type Response = { }              // genérico demais sem contexto

Enums
✅ PascalCase para o nome, SCREAMING_SNAKE_CASE para valores
enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

✅ Preferir union types para enums simples:
type Role = 'ADMIN' | 'USER' | 'GUEST';

6. Nomenclatura de Rotas de API
Regras
✅ Substantivos no plural para coleções: /api/posts, /api/users

✅ Singular com ID para item: /api/posts/[id]

✅ Sub-recursos com /: /api/posts/[id]/comments

✅ Ações especiais com verbo: /api/auth/login, /api/posts/[id]/publish

✅ kebab-case para múltiplas palavras: /api/password-reset, /api/user-settings

Exemplos
GET    /api/posts              → listar posts
POST   /api/posts              → criar post
GET    /api/posts/[id]         → obter post
PUT    /api/posts/[id]         → atualizar post (completo)
PATCH  /api/posts/[id]         → atualizar parcial
DELETE /api/posts/[id]         → deletar post
POST   /api/posts/[id]/publish → ação de publicar
GET    /api/posts/[id]/comments → sub-recurso
POST   /api/auth/login         → ação de login

❌ Proibido
/api/getPosts (verbo na URL)

/api/post (singular para coleção)

/api/post_list (snake_case)

/api/posts/create (verbo + recurso quando POST já implica create)

7. Nomenclatura de Modelos Prisma
Regras
✅ PascalCase para nomes de models (User, Post, PasswordReset)

✅ snake_case plural para nomes de tabela via @@map: @@map("users")

✅ camelCase para campos: createdAt, userId

✅ PascalCase para enums: Role, PostStatus

✅ SCREAMING_SNAKE_CASE para valores de enum: ADMIN, PUBLISHED

Padrão
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
  @@index([email])
}

enum Role {
  ADMIN
  USER
  GUEST
}

Campos comuns obrigatórios
id (String @id @default(cuid()) ou Int @id @default(autoincrement()))

createdAt (DateTime @default(now()))

updatedAt (DateTime @updatedAt)

Relações
Nome do campo é o modelo em camelCase singular: user, post, comments

Nome da FK é <modelo>Id: userId, postId

8. Imports
Ordem obrigatória
// 1. Built-in do Node
import { randomUUID } from 'node:crypto';

// 2. Dependências externas
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// 3. Imports internos com @/
import { prisma } from '@/lib/db';
import { createPost } from '@/lib/services/post.service';
import { successResponse, errorResponse } from '@/lib/utils/response';
import type { CreatePostInput } from '@/types/post.types';

Regras
✅ Sempre @/ para imports internos (configurado em tsconfig.json)

✅ import type { ... } para tipos puros (evita bundle desnecessário)

✅ Uma linha em branco entre cada grupo

❌ Nunca ../../ para voltar 2+ níveis

❌ Nunca imports mistos (import { foo, type Bar } — separe quando possível)

9. Formatação e Estilo
Regras gerais
Indentação: 2 espaços (não tabs)

Aspas: simples (') em TS/JS, duplas (") apenas em JSON

Ponto e vírgula: obrigatório

Vírgula final: obrigatória em arrays/objetos multilinha

Largura máxima: 100 caracteres

Linha em branco: entre blocos lógicos, não entre cada linha

Chaves: sempre, mesmo em if de uma linha (K&R style)

Prettier + ESLint
O projeto usa Prettier (formatação) + ESLint (regras). Configuração em .prettierrc e eslint.config.mjs. Não discuta com o linter — corrija.

Exemplo
export async function createPost(
  data: CreatePostInput,
  userId: string
): Promise<Post> {
  if (!data.title) {
    throw new Error('TITLE_REQUIRED');
  }

  return prisma.post.create({
    data: { ...data, userId },
    include: { user: true },
  });
}

10. Comentários e JSDoc
Quando comentar
✅ Funções públicas (services, utils, middleware) → JSDoc obrigatório

✅ Lógica não-óbvia → comentário // explicando o porquê, não o o quê

✅ TODOs com contexto: // TODO(@dev, 2025-03-15): refatorar após migração

❌ Código óbvio (// incrementa contador antes de i++)

❌ Comentário desatualizado (pior que não ter)

Formato JSDoc

/**
 * Busca post por ID com autor incluído.
 *
 * @param id - ID do post (cuid)
 * @returns Post com autor
 * @throws {Error} `POST_NOT_FOUND` se não existir
 *
 * @example
 * const post = await getPostById('clx123...');
 */
export async function getPostById(id: string) { ... }

Tags obrigatórias
@param para cada parâmetro

@returns quando há retorno

@throws para erros de domínio

@example para funções complexas ou não-óbvias

11. Nomenclatura de Commits
Formato: Conventional Commits

<tipo>(<escopo>): <descrição>

Tipo	Uso
feat	Nova funcionalidade
fix	Correção de bug
refactor	Refatoração sem mudança de comportamento
test	Adição/ajuste de testes
docs	Documentação
chore	Build, deps, config
perf	Melhoria de performance
style	Formatação (sem mudança de lógica)
Exemplos
feat(auth): adicionar endpoint de refresh token
fix(posts): corrigir validação de título vazio
refactor(services): extrair lógica de transação para helper
test(auth): adicionar testes E2E de login
docs(harness): atualizar convenções de nomenclatura
chore(deps): atualizar Prisma para 5.20

Regras
✅ Escopo em minúsculo, entre parênteses

✅ Descrição no imperativo, minúsculo, sem ponto final

✅ Máximo 72 caracteres na primeira linha

❌ Nunca update, fix bug, WIP como descrição

12. Nomenclatura de Branches
Formato
<tipo>/<descricao-curta>

Exemplos
feat/auth-refresh-token
fix/posts-title-validation
refactor/service-transaction-helper
docs/harness-conventions
chore/upgrade-prisma

Regras
✅ kebab-case após a barra

✅ Descrição curta (máx 5 palavras)

❌ Nunca main, master, dev (reservados)

❌ Nunca nomes pessoais (joao-feature)

13. Nomenclatura de Variáveis de Ambiente
Regras
✅ SCREAMING_SNAKE_CASE

✅ Prefixo por domínio quando aplicável: STRIPE_SECRET_KEY, DATABASE_URL, JWT_SECRET

✅ NEXT_PUBLIC_* para vars expostas ao client (Next.js)

✅ Toda var documentada em .env.example

❌ Nunca commitar .env real

❌ Nunca expor segredos com NEXT_PUBLIC_

Padrão
# .env.example
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
JWT_SECRET="change-me"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"

14. Checklist Rápido de Convenções
Antes de finalizar qualquer arquivo:

□ Nome do arquivo segue a tabela da seção 2
□ Funções começam com verbo (seção 3)
□ Variáveis descritivas, booleanos com is/has/can (seção 4)
□ Tipos sem prefixo I, com sufixos corretos (seção 5)
□ Rotas REST no plural, sem verbos (seção 6)
□ Models Prisma com @@map em snake_case plural (seção 7)
□ Imports ordenados e absolutos @/ (seção 8)
□ Formatação compatível com Prettier (seção 9)
□ JSDoc em funções públicas (seção 10)
□ Commit no padrão Conventional Commits (seção 11)
□ Branch no padrão tipo/descricao (seção 12)
□ Env vars em SCREAMING_SNAKE_CASE (seção 13)
Última atualização: [DATA]
Versão: 1.0
```
