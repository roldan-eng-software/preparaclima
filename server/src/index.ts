import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/saude", async () => ({ ok: true, servico: "climasafe-server" }));
app.get("/alertas", async () => ({ alertas: [] }));

const porta = Number(process.env.PORT ?? 3333);
app.listen({ port: porta, host: "0.0.0.0" });
