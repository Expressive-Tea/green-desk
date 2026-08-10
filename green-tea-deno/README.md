# green-desk · on Deno 🦕🍵

The exact same green-desk app — a live mini trading desk — running on **Deno**
instead of Node. Not a rewrite: the whole `src/` is the same code. **The only
line that changes is the boot in `src/main.ts`:**

```ts
// Node                         // Deno
app.listen(port);              serveDeno(app, { port });
```

Same graph, same `@Provider`/`@Step`/`@Route`/`@Get`/`@Post`/`@Sse`/`@Ws`
handlers, same rooms/channels, same validation — one primitive, four runtimes.

## Run

```bash
deno task start
# → 🍵 green-desk on Deno — http://localhost:3000
```

Deno pulls `@green-tea/core` from the staging registry (`.npmrc` scopes only
`@green-tea`; everything else from npmjs) and runs the TypeScript directly — no
build step.

## What to try

| URL | What it shows |
|-----|---------------|
| `GET  /` | The dashboard (served from the same origin) |
| `GET  /api/prices` | **SSE** live ticker — one `AsyncIterable`, no socket.io |
| `POST /api/orders` | Zod-validated order (`x-token: tok-diego`) → `422` on bad input |
| `WS   /api/desk?token=tok-diego` | **Duplex WebSocket** — live fills stream back |
| `GET  /__graph__` | Interactive **dependency-graph viewer** (Cytoscape) |
| `GET  /__openapi__` | OpenAPI 3.1 generated from the same metadata |

`explain('/api/prices')` vs `explain('/api/portfolio')` (printed on boot) proves
the per-route slice: the public ticker carries **no** auth step; the gated
routes do.

**Tokens:** `tok-diego` / `tok-ana`. **Not yet on Deno:** `app.listen()`/TLS and
mesh are Node-only; on Deno you use `serveDeno`.
