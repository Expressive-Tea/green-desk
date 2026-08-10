# 🍵 green-desk

A live mini **trading desk** built on [`@green-tea/core`](https://npm.svc.zoit.services/) — the demo reel for the framework. One coherent app that exercises the parts other stacks answer with three subsystems: a **visible dependency graph**, **real-time as one primitive**, and **validation with a zero-dep core**.

```bash
npm install        # pulls @green-tea/core from the staging registry (.npmrc)
npm run dev        # tsx watch — http://localhost:3000
```

Open <http://localhost:3000> for the dashboard: live SSE prices, a validated order form, and a duplex WebSocket fill feed — all against the same app.

## Layout

```
src/
  main.ts                     entrypoint — prints the route slices, then listen()
  app.ts                      composition root — createApp({ devGraph, devOpenapi, security })
  modules.ts                  @Module wiring (ApiModule /api, WebModule /)
  home.controller.ts          serves the static dashboard same-origin
  market/                     public live prices
    market.ts                 in-process price engine (fan-out channel)
    market.provider.ts        provides 'market'
    market.controller.ts      @Sse /api/prices
  auth/                       bring-your-own auth (green-tea ships transport security, not auth)
    session.provider.ts       provides 'sessions' (token -> user)
    authenticate.step.ts      provides 'user' — only pulled into routes that @needs it
  trading/                    gated trading surface
    order.schema.ts           zod schema for @body validation
    portfolio.provider.ts     provides 'portfolio' + a fan-out fills channel
    trading.controller.ts     @Get /portfolio · @Post /orders · @Ws /desk
```

## The routes

| Method | Path | Auth | Shows |
|---|---|---|---|
| `GET` (SSE) | `/api/prices` | public | real-time from an `AsyncIterable`; no auth step in its slice |
| `GET` | `/api/portfolio` | `x-token` | the auth step slices in because the handler `@needs('user')` |
| `POST` | `/api/orders` | `x-token` | `@body(OrderSchema)` → `422` on bad input |
| `WS` | `/api/desk?token=` | token | duplex — same handler shape, WebSocket transport |
| `GET` | `/__graph__` | — | the live dependency-graph diagram |
| `GET` | `/__openapi__` | — | OpenAPI 3.1 from the same metadata |

Tokens: `tok-diego`, `tok-ana`.

## Video script — 7 beats

**1 · Almost zero deps.** `npm ls --prod` — one runtime dep (`reflect-metadata`) under the framework; `ws` only because we use WebSockets, `zod` only because we validate.

**2 · The pipeline is a graph.** `npm run dev` prints each route's ordered chain. Open `/__graph__` for the live diagram.

**3 · Boot fails loudly.** Comment `SessionProvider` out of `modules.ts` → `createApp` throws (nothing provides `sessions`), naming the missing key. Never `undefined` in prod.

**4 · Auth runs only on its slice.** The startup log shows `/api/prices` with **no** `Authenticate` step, `/api/portfolio` **with** it. Public routes don't pay for auth.

**5 · Validation.** In the dashboard, set qty `-1` → `422` with a per-field issue. Send a bad token → `401`.

**6 · Real-time is one primitive.** Prices stream over SSE; fills stream over a WebSocket. Both are just an `AsyncIterable` returned from a handler — watch the numbers and fills move on camera.

**7 · Batteries + OpenAPI.** `curl -i localhost:3000/api/prices` shows secure-by-default headers; `/__openapi__` is a real spec generated from the same graph.

## curl cheatsheet

```bash
# public SSE ticker
curl -N localhost:3000/api/prices

# gated — 401 without a token, 200 with one
curl localhost:3000/api/portfolio
curl -H 'x-token: tok-diego' localhost:3000/api/portfolio

# valid order
curl -H 'x-token: tok-diego' -H 'content-type: application/json' \
  -d '{"symbol":"BTC","side":"buy","qty":1}' localhost:3000/api/orders

# 422 — validation
curl -H 'x-token: tok-diego' -H 'content-type: application/json' \
  -d '{"symbol":"BTC","side":"buy","qty":-1}' localhost:3000/api/orders
```

> Staging: `@green-tea/core` resolves from the Verdaccio registry pinned in `.npmrc`. Everything else comes from npmjs.
