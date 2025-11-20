import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));
app.get("/api/greet", (c) => {
  const { name = "Hono" } = c.req.query();
  return c.json({ message: `Hello, ${name}!` });
});

export default app;
