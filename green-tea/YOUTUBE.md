# 🍵 green-tea — YouTube copy (EN / ES)

Angle: **evolution story** — I built Expressive Tea on Express + Inversify; the foundation kept shifting under me (Express 5 migration, the Inversify v7 jump and its breaking changes, middleware ordering, bolt-on real-time). So I rebuilt the idea from zero, fully in-house.

---

## 🇬🇧 ENGLISH

### Title (recommended)
**I built a framework on Express. Then I had to rebuild it from scratch.**

Alternatives:
- Express 5 and Inversify 7 broke my framework. So I dropped both.
- My framework was built on Express. That's why I started over — green-tea 🍵
- I rebuilt my framework from zero: no Express, no Inversify, one dependency

### Description
Years ago I built **Expressive Tea**: a decorator framework on top of **Express** and **InversifyJS**. I shipped it to production and it worked… until the foundation started shifting under me.

When you build a framework on top of another framework, you spend your life tracking what the base does — and what will break your chain. Migrating to **Express 5** was exactly that. Then the jump to **Inversify 7** landed with breaking changes deep enough to stall my own work and force a refactor. Add the middleware ordering problem (what runs first, what runs after), typing that gets complicated keeping that order straight, and decorators that are already chaotic on their own. Real-time? Install a package and wire it up. SSE? Wire that up too.

So I rebuilt the whole idea from zero. This is **green-tea**: your API isn't a chain of middleware, it's an explicit **dependency graph** you can see, slice, and trust. Real-time, DI, validation and security are **in-house** — maintenance is the framework's job, not yours chasing upstream. One runtime dependency. And because the core runs on web standards, the **same `src/` runs on Node, Deno, Bun and the edge** — the only thing that changes is how you serve it.

In this video I prove it with a real app (a mini trading desk) actually running.

**What's different:**
🔹 The pipeline is a graph, not a chain — you declare what each step needs, the framework computes the order
🔹 Boot fails loudly when a dependency is missing (you never serve `undefined` in prod)
🔹 Each route runs only its slice of the graph (auth doesn't run on public routes)
🔹 Real-time as one primitive: SSE, ndjson and WebSocket from an `AsyncIterable`
🔹 The graph is visible and interactive (not behind a paid plan)
🔹 The same `src/` runs on Node, Deno, Bun and the edge — only one line changes (how you serve it)
🔹 One runtime dependency — no Express, no Inversify

**Chapters:**
0:00 Where I am coming from
0:58 The idea
1:23 The graph is the app
2:24 Boot that fails loudly
2:42 Each route runs its slice
3:09 Real validation
3:35 Real-time is one primitive
4:16 Batteries included
4:48 Runs anywhere
5:43 An honest close

green-tea is in **beta**. You come for the model and the ergonomics, not the ecosystem — yet.

Repo: https://github.com/Expressive-Tea/green-tea
Docs: https://green-tea.expressive-tea.io/docs/
Install: npm i @green-tea/core@beta
Demo code: [link — publish the trading-desk app and paste it here]

#nodejs #typescript #backend #framework #webdev

---

## 🇪🇸 ESPAÑOL

### Título (recomendado)
**Construí un framework sobre Express. Tuve que reconstruirlo desde cero.**

Alternativas:
- Express 5 e Inversify me rompieron el framework. Así que dejé los dos.
- Mi framework dependía de Express. Por eso empecé de nuevo — green-tea 🍵
- Reconstruí mi framework desde cero: sin Express, sin Inversify, una dependencia

### Descripción
Hace años construí **Expressive Tea**: un framework de decoradores sobre **Express** e **InversifyJS**. Lo usé en producción y funcionó… hasta que la base empezó a moverse debajo de mí.

Cuando construyes un framework sobre otro framework, vives persiguiendo lo que la base hace — y lo que va a romper tu cadena. Migrar a **Express 5** fue eso. Después el salto a **Inversify 7** llegó con cambios que rompen tan hondo que te frenan el desarrollo y fuerzan un refactor. Súmale el orden de los middlewares (qué corre antes, qué después), el tipado que se complica cuidando ese orden, y decorators que ya de por sí son caóticos. ¿Y el real-time? Instala un paquete y conéctalo. ¿SSE? Conéctalo también.

Así que reconstruí la idea completa desde cero. Esto es **green-tea**: tu API no es una cadena de middlewares, es un **grafo de dependencias explícito** que puedes ver, cortar y en el que puedes confiar. Real-time, DI, validación y seguridad **in-house** — mantenerlo es obligación del framework, no tuya persiguiendo upstream. Una sola dependencia de runtime. Y como el core vive sobre web standards, el **mismo `src/` corre en Node, Deno, Bun y el edge** — lo único que cambia es cómo lo sirves.

En este video lo demuestro con una app real (un mini trading desk) corriendo de verdad.

**Qué es distinto:**
🔹 El pipeline es un grafo, no una cadena — declaras qué necesita cada paso, el framework calcula el orden
🔹 El boot truena fuerte si falta una dependencia (nunca sirves `undefined` en prod)
🔹 Cada ruta corre solo su rebanada del grafo (auth no corre en rutas públicas)
🔹 Real-time como un solo primitivo: SSE, ndjson y WebSocket desde un `AsyncIterable`
🔹 El grafo es visible e interactivo (no detrás de un plan de pago)
🔹 El mismo `src/` corre en Node, Deno, Bun y el edge — solo cambia una línea (cómo lo sirves)
🔹 Una dependencia de runtime — sin Express, sin Inversify

**Capítulos:**
0:00 De dónde vengo
0:56 La idea de green-tea
1:23 El grafo es la app
2:19 El boot que truena fuerte
2:39 Cada ruta corre su rebanada
3:09 Validación de verdad
3:36 Real-time es un solo primitivo
4:18 Baterías incluidas
4:51 Corre donde sea
5:46 Cierre honesto

green-tea está en **beta**. Vienes por el modelo y la ergonomía, no por el ecosistema — todavía.

Repo: https://github.com/Expressive-Tea/green-tea
Docs: https://green-tea.expressive-tea.io/docs/
Instalar: npm i @green-tea/core@beta
Código del demo: [enlace — publica la app de trading y pégalo aquí]

#nodejs #typescript #backend #framework #webdev

---

## Tags (both)
`nodejs, typescript, backend framework, express alternative, nestjs alternative, fastify alternative, hono alternative, dependency injection, websocket, server-sent events, sse, real-time, api framework, web development, decorators, green-tea, expressive-tea, express 5, inversify, deno, bun, cloudflare workers, edge, runtime agnostic, web standards`

## Notes
- Done: the cold open is the personal Expressive Tea → green-tea story (Express 5 migration + the Inversify 7 breaking changes). Scene 00 in `../green-tea-video/voz/00-origin.txt`, 59s.
- Chapter timings are generated from the actual cut by `../green-tea-video/chapters.sh` and pasted here. Re-run it after any change to the narration or to `CH_SECS`; don't hand-edit them. Runtime: 6:28 (English), 6:29 (Spanish).
- Repo, docs and npm are live: github.com/Expressive-Tea/green-tea (MIT) · green-tea.expressive-tea.io/docs · `@green-tea/core@26.8.0-beta.0`. Main development stays on Gitea; GitHub is the public mirror and already takes outside PRs.
- One `[link]` is still open, in both languages. Scene 09 now says out loud *"the repo and the demo code are in the description"*, so the demo app in `yt-demos/green-tea` has to be published before you upload — the line is a promise the description must keep.
