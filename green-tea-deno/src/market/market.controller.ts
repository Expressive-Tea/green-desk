import { Route, Sse, needs } from '@green-tea/core';

import type { Market, Tick } from './market';

/**
 * Public live ticker. The handler only `@needs('market')`, so its route slice
 * contains no auth step — `explain('/api/prices')` proves it. Returning the
 * market's fan-out channel is all it takes to stream Server-Sent Events.
 */
@Route('/')
export class MarketController {
  @Sse('/prices')
  stream(@needs('market') market: Market): AsyncIterable<Tick> {
    return market.ticks;
  }
}
