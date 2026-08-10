import { Provider } from '@green-tea/core';

import { Market } from './market';

/**
 * Provides the shared {@link Market} under the `market` token and starts the
 * price engine at boot. Any handler that `@needs('market')` pulls this in.
 */
@Provider({ provides: 'market' })
export class MarketProvider {
  private readonly market = new Market();

  provide(): { market: Market } {
    this.market.start();
    return { market: this.market };
  }
}
