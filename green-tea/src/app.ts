import { createApp, type App } from '@green-tea/core';

import { ApiModule, WebModule } from './modules';

/**
 * Composition root. `devGraph`/`devOpenapi` expose the pipeline as a live
 * diagram and an OpenAPI 3.1 doc; `security: true` puts hardened headers on
 * every response. Swap any node for a fake via `overrides` in tests.
 */
export function buildApp(): App {
  return createApp({
    modules: [ApiModule, WebModule],
    devGraph: true, // GET /__graph__     — live dependency-graph diagram
    devOpenapi: true, // GET /__openapi__ — OpenAPI 3.1 JSON from the same metadata
    security: true, // secure-by-default headers on every response
  });
}
