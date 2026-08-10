# 🍵 green-desk

A small trading desk built with [**green-tea**](https://github.com/Expressive-Tea/green-tea) —
live prices over SSE, validated orders over HTTP, and fills coming back over a duplex
WebSocket. This is the demo used in the video.

The point of it is the last folder in this repo: **the same `src/` runs on Node, Deno and
Bun.** Only the entry point changes.

```
green-tea/        Node   — app.listen(port)
green-tea-deno/   Deno   — serveDeno(app, { port })
green-tea-bun/    Bun    — serveBun(app, { port })
```

```bash
diff -rq green-tea/src green-tea-deno/src   # only main.ts differs
```

## Run it

Pick a runtime. All three serve the same thing on `http://localhost:3000`.

```bash
cd green-tea      && npm install && npm run dev
cd green-tea-deno && deno task start
cd green-tea-bun  && bun install && bun run start
```

| Route | What's there |
|---|---|
| `/` | the dashboard: live prices, an order form, and the fills panel |
| `/__graph__` | the dependency graph, interactive — click a route to see only its slice |
| `/__openapi__` | OpenAPI 3.1, projected from the same metadata graph |

Test tokens: `tok-diego`, `tok-ana`. A negative `qty` returns `422` with the failing
field; a bad token returns `401`.

## What to look at

**`src/modules.ts`** — the whole API surface: providers, the auth step, controllers.
Comment `SessionProvider` out of `providers` and the app **fails at boot** naming what's
missing and who asked for it, instead of serving `undefined` in production.

**`src/trading/trading.controller.ts`** — the signature is the contract. A handler that
reads `@needs('user')` gets the auth step in its slice; `/api/prices`, which never asks
for it, doesn't run it and doesn't pay for it.

**`src/market/market.controller.ts`** — real-time as one primitive. `@Sse`, `@Stream` and
`@Ws` all return an `AsyncIterable`; the transport does the rest.

## Notes

green-tea is in **beta** (`26.8.0-beta.0`). One runtime dependency: `reflect-metadata`.

- Framework: https://github.com/Expressive-Tea/green-tea
- Docs: https://green-tea.expressive-tea.io/docs/
- Install: `npm i @green-tea/core@beta`

MIT.
