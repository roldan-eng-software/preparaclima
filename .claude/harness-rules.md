# Harness Rules — Next.js + PostgreSQL + Prisma

> **Este arquivo é normativo.** Toda geração de código deve obedecer a estas regras.
> Em caso de conflito com a constitution, a constitution prevalece.
> Em caso de conflito com conventions.md, conventions.md prevalece para nomenclatura.

---

## 1. Estrutura de Pastas Obrigatória

Nenhum arquivo pode ser criado fora desta estrutura sem justificativa explícita.
app/
├── api/ # Rotas HTTP (route handlers)
│ ├── [resource]/
│ │ ├── route.ts # GET (list), POST (create)
│ │ └── [id]/
│ │ └── route.ts # GET (one), PUT, PATCH, DELETE
│ └── external/
│ └── [api-name]/
│ └── route.ts # Proxy para APIs externas
│
lib/
├── db.ts # Instância única do PrismaClient
├── services/ # Camada de serviços (queries Prisma)
│ └── [resource].service.ts
├── external/ # Integrações com APIs externas
│ └── [api-name].ts
├── middleware/ # Auth, autorização, validação
│ ├── auth.ts
│ └── validation.ts
└── utils/
├── response.ts # successResponse / errorResponse
├── logger.ts # Logging estruturado
└── retry.ts # Helper de retry para APIs externas
│
types/
├── index.ts # Re-exports
├── api.ts # Tipos de request/response
└── [resource].types.ts # Tipos específicos de recurso

### Proibições

- ❌ Nunca criar pastas novas em `/app` sem alinhamento prévio
- ❌ Nunca colocar lógica de negócio em `route.ts`
- ❌ Nunca acessar `prisma` diretamente de um route handler
- ❌ Nunca criar componentes React em `/lib`

---

## 2. Camadas e Responsabilidades

| Camada                | Responsabilidade                                          | Pode acessar                   |
| --------------------- | --------------------------------------------------------- | ------------------------------ |
| `app/api/**/route.ts` | HTTP: parse, validação, chamar serviço, formatar resposta | Serviços, middleware, utils    |
| `lib/services/**`     | Regras de negócio + queries Prisma                        | Prisma, utils, outras services |
| `lib/external/**`     | Chamadas a APIs terceiras                                 | Utils (retry, logger)          |
| `lib/middleware/**`   | Auth, autorização, validação transversal                  | Prisma, utils                  |
| `lib/utils/**`        | Helpers puros (sem estado)                                | Nada interno                   |

### Regra de ouro

> **Route handler nunca importa `prisma`. Ele importa `services`.**

---

## 3. Validação com Zod — Obrigatória

Toda entrada HTTP (body, query, params, headers customizados) deve ser validada antes de ser processada.

### Padrão de schema

```typescript
// types/post.types.ts
import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(10),
  published: z.boolean().optional().default(false),
  tags: z.array(z.string()).max(10).optional(),
});

export const updatePostSchema = createPostSchema.partial();

export const postIdSchema = z.object({
  id: z.string().cuid(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;

Padrão de uso em route handler
import { createPostSchema } from '@/types/post.types';

const body = await req.json();
const parsed = createPostSchema.safeParse(body);

if (!parsed.success) {
  const [response, status] = errorResponse(
    'VALIDATION_ERROR',
    'Dados inválidos',
    400,
    parsed.error.flatten().fieldErrors
  );
  return NextResponse.json(response, { status });
}

// usar parsed.data (nunca body bruto)

Regras
❌ Nunca usar any para inputs

❌ Nunca confiar em req.json() sem validação

✅ Sempre usar .safeParse() em route handlers (não .parse())

✅ Sempre exportar o tipo inferido (z.infer<typeof schema>)

✅ Schemas de update são .partial() do schema de create

4. Resposta Padronizada
Toda resposta de API deve seguir o formato abaixo. Sem exceções.

Formato

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
  requestId: string;
}

Helpers em lib/utils/response.ts
export function successResponse<T>(
  data: T,
  statusCode: number = 200
): [ApiResponse<T>, number] {
  return [
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
      requestId: crypto.randomUUID(),
    },
    statusCode,
  ];
}

export function errorResponse(
  code: string,
  message: string,
  statusCode: number = 400,
  details?: Record<string, unknown>
): [ApiResponse<never>, number] {
  return [
    {
      success: false,
      error: { code, message, details },
      timestamp: new Date().toISOString(),
      requestId: crypto.randomUUID(),
    },
    statusCode,
  ];
}
Códigos de erro padronizados
Código	Uso	HTTP
VALIDATION_ERROR	Input inválido	400
UNAUTHORIZED	Sem autenticação	401
FORBIDDEN	Sem permissão	403
NOT_FOUND	Recurso inexistente	404
CONFLICT	Duplicidade (ex.: email único)	409
EXTERNAL_API_ERROR	Falha em API externa	502
INTERNAL_ERROR	Erro inesperado	500
Regras
✅ Sempre usar successResponse / errorResponse

✅ Sempre retornar NextResponse.json(response, { status })

❌ Nunca retornar objeto bruto (ex.: { ok: true, post })

❌ Nunca retornar HTML ou texto puro

5. Camada de Serviços (Prisma)
Toda query Prisma vive em lib/services/*.service.ts. Nada de Prisma em route handlers.

Padrão

// lib/services/post.service.ts
import { prisma } from '@/lib/db';
import type { CreatePostInput, UpdatePostInput } from '@/types/post.types';

/**
 * Busca todos os posts com autor.
 */
export async function getPosts() {
  return prisma.post.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Busca post por ID.
 * @throws Error se não encontrar
 */
export async function getPostById(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!post) throw new Error('POST_NOT_FOUND');
  return post;
}

/**
 * Cria novo post.
 */
export async function createPost(data: CreatePostInput, userId: string) {
  return prisma.post.create({
    data: { ...data, userId },
    include: { user: true },
  });
}

Regras
✅ Toda função de serviço tem JSDoc

✅ Erros de domínio lançados como Error('CODE') (ex.: 'POST_NOT_FOUND')

✅ Usar select ou include explícito (nunca retornar tudo sem querer)

✅ Tipos de retorno inferidos do Prisma (Prisma.PostGetPayload<{...}> quando necessário)

❌ Nunca usar prisma.$queryRaw sem justificativa (preferir API tipada)

❌ Nunca retornar null de um getById — lançar erro

6. Transações
Operações que afetam múltiplas tabelas ou dependem de consistência atômica devem usar prisma.$transaction.

Padrão interativo
export async function publishPostWithNotification(postId: string) {
  return prisma.$transaction(async (tx) => {
    const post = await tx.post.update({
      where: { id: postId },
      data: { published: true },
    });

    await tx.notification.create({
      data: {
        userId: post.userId,
        message: `Seu post "${post.title}" foi publicado`,
      },
    });

    return post;
  });
}
Regras
✅ Transação sempre que houver >1 operação de escrita correlacionada

✅ Usar tx dentro da transação (nunca prisma diretamente)

✅ Limitar transações a <5s (evitar timeouts)

❌ Nunca chamar APIs externas dentro de transação (lentidão + locks)

7. APIs Externas
Toda integração vive em lib/external/[api-name].ts e deve seguir este template.

Padrão
// lib/external/stripe.ts
import { withRetry } from '@/lib/utils/retry';
import { logger } from '@/lib/utils/logger';

const STRIPE_API = 'https://api.stripe.com/v1';
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_KEY) throw new Error('STRIPE_SECRET_KEY not set');

export async function createStripeCustomer(email: string, name: string) {
  return withRetry(
    async () => {
      const response = await fetch(`${STRIPE_API}/customers`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${STRIPE_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email, name }).toString(),
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        logger.error('STRIPE_API_ERROR', {
          status: response.status,
          body: errorBody,
        });
        throw new Error(`STRIPE_ERROR_${response.status}`);
      }

      return response.json();
    },
    { attempts: 3, baseDelayMs: 1000 }
  );
}

Helper lib/utils/retry.ts
export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: { attempts: number; baseDelayMs: number } = {
    attempts: 3,
    baseDelayMs: 1000,
  }
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < opts.attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < opts.attempts - 1) {
        await new Promise((r) =>
          setTimeout(r, opts.baseDelayMs * Math.pow(2, i))
        );
      }
    }
  }
  throw lastError;
}

Regras
✅ Sempre AbortSignal.timeout(10_000) (10s)

✅ Sempre retry com backoff exponencial (3 tentativas)

✅ Sempre logar erros com contexto (status, body)

✅ Sempre validar presença das env vars no topo do arquivo

✅ Cache em memória ou Next.js revalidate quando resposta for estável

❌ Nunca expor chaves de API no client

❌ Nunca chamar API externa de dentro de um $transaction

8. Tratamento de Erros
Padrão em route handlers
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createPostSchema.safeParse(body);

    if (!parsed.success) {
      const [response, status] = errorResponse(
        'VALIDATION_ERROR',
        'Dados inválidos',
        400,
        parsed.error.flatten().fieldErrors
      );
      return NextResponse.json(response, { status });
    }

    const post = await createPost(parsed.data, userId);
    const [response, status] = successResponse(post, 201);
    return NextResponse.json(response, { status });
  } catch (error) {
    if (error instanceof Error && error.message === 'POST_NOT_FOUND') {
      const [response, status] = errorResponse('NOT_FOUND', 'Post não encontrado', 404);
      return NextResponse.json(response, { status });
    }

    logger.error('CREATE_POST_FAILED', { error });
    const [response, status] = errorResponse('INTERNAL_ERROR', 'Erro interno', 500);
    return NextResponse.json(response, { status });
  }
}
Regras
✅ try/catch em todo route handler

✅ Mapear erros de domínio (Error('CODE')) para HTTP codes

✅ Logar erro inesperado com logger.error antes de retornar 500

❌ Nunca vazar stack trace ou detalhes internos na resposta

❌ Nunca engolir erro silenciosamente (catch {} vazio)

9. TypeScript Estrito
Regras
✅ strict: true no tsconfig.json (obrigatório)

✅ Tipos explícitos em parâmetros e retornos de funções públicas

✅ unknown em vez de any quando o tipo é desconhecido

✅ z.infer<> para tipos derivados de schemas Zod

✅ Prisma.XGetPayload<> para tipos de queries com include

❌ Nunca any

❌ Nunca as sem justificativa em comentário

❌ Nunca // @ts-ignore (usar @ts-expect-error com motivo)

10. Autenticação e Autorização
Middleware
// lib/middleware/auth.ts
export async function requireAuth(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) throw new Error('UNAUTHORIZED');

  const payload = await verifyJWT(token); // implementação própria
  if (!payload) throw new Error('UNAUTHORIZED');

  return payload; // { userId, role }
}

export function requireRole(payload: AuthPayload, role: Role) {
  if (payload.role !== role && payload.role !== 'ADMIN') {
    throw new Error('FORBIDDEN');
  }
}

11. Logging
Padrão
// lib/utils/logger.ts
type LogContext = Record<string, unknown>;

export const logger = {
  info: (event: string, context?: LogContext) =>
    console.log(JSON.stringify({ level: 'info', event, ...context, ts: Date.now() })),
  error: (event: string, context?: LogContext) =>
    console.error(JSON.stringify({ level: 'error', event, ...context, ts: Date.now() })),
  warn: (event: string, context?: LogContext) =>
    console.warn(JSON.stringify({ level: 'warn', event, ...context, ts: Date.now() })),
};

Regras
✅ Logs estruturados (JSON) — nunca console.log("erro aqui")

✅ Evento em SCREAMING_SNAKE_CASE (ex.: CREATE_POST_FAILED)

✅ Contexto com dados úteis, mas sem PII (sem senha, sem token)

❌ Nunca logar objetos de request inteiros

12. Testes
Regras
✅ Serviços: testes unitários com mocks de prisma

✅ Route handlers: testes E2E (chamando handler direto ou via fetch)

✅ Cobrir: caminho de sucesso, validação inválida, erro de domínio, erro inesperado

✅ Cobertura mínima: 80%

❌ Nunca testar contra banco real em testes unitários

❌ Nunca deixar teste depender de ordem de execução

Estrutura

tests/
├── unit/
│ └── services/
│ └── post.service.test.ts
└── e2e/
└── api/
└── posts.test.ts

13. Migrations Prisma
Fluxo obrigatório
Editar prisma/schema.prisma

Rodar npx prisma migrate dev --name <descricao>

Rodar npx prisma generate

Atualizar .claude/schema.prisma (cópia para o LLM)

Atualizar tipos derivados se necessário

Regras
✅ Nome descritivo em snake_case (ex.: add_published_to_posts)

✅ Sempre incluir createdAt e updatedAt em modelos de negócio

✅ Índices explícitos para FKs e campos de busca

❌ Nunca editar migration já aplicada

❌ Nunca usar prisma db push em produção

14. Imports e Caminhos
✅ Sempre usar @/ para imports absolutos

❌ Nunca usar ../../ para voltar mais de um nível

✅ Ordem: built-in → externos → internos (@/) → relativos
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { createPost } from '@/lib/services/post.service';
import { successResponse, errorResponse } from '@/lib/utils/response';
import type { CreatePostInput } from '@/types/post.types';

15. Checklist Mental Antes de Finalizar Código
Antes de retornar qualquer código gerado, o agente deve verificar:

□ Arquivo está na pasta correta
□ Nome do arquivo segue conventions.md
□ Input validado com Zod
□ Serviço em /lib/services usado (não prisma direto)
□ Transação se múltiplas escritas
□ Resposta via successResponse/errorResponse
□ try/catch com mapeamento de erros
□ Logging estruturado em erros
□ Tipos TypeScript sem any
□ JSDoc em funções públicas
□ Imports absolutos @/
□ Teste unitário e/ou E2E incluso
□ Sem segredo hardcoded (usar process.env)
Se algum item falhar, o código não está pronto.

16. O Que Nunca Fazer
❌ Criar pastas fora de app/, lib/, types/, tests/

❌ Acessar prisma em route handlers

❌ Retornar objetos sem o envelope ApiResponse

❌ Chamar API externa sem retry + timeout

❌ Engolir erro com catch {} vazio

❌ Usar any

❌ Hardcodar segredos ou URLs de produção

❌ Esquecer await em chamada assíncrona

❌ Fazer console.log de dados sensíveis

Última atualização: [DATA]
Versão: 1.0
```
