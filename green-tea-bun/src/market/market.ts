import { channel, type Channel } from '@green-tea/core';

/** The three instruments this desk trades. */
export type Ticker = 'BTC' | 'ETH' | 'SOL';

/** One price update, broadcast to every live subscriber. */
export interface Tick {
  symbol: Ticker;
  price: number;
  at: number;
}

const SEED: Record<Ticker, number> = { BTC: 64000, ETH: 3200, SOL: 145 };
const round2 = (n: number): number => Math.round(n * 100) / 100;

/**
 * A tiny in-process price engine. Every second it random-walks each price and
 * pushes a {@link Tick} onto a fan-out {@link Channel} — one source, many SSE
 * subscribers. No external market feed, so the demo is fully reproducible.
 */
export class Market {
  /** Fan-out stream: each `for await` (each SSE client) gets every tick. */
  readonly ticks: Channel<Tick> = channel<Tick>({ buffer: 50 });

  private readonly prices: Record<Ticker, number> = { ...SEED };
  private timer?: NodeJS.Timeout;

  start(): void {
    if (this.timer) return;
    this.timer = setInterval(() => {
      for (const symbol of Object.keys(this.prices) as Ticker[]) {
        const drift = (Math.random() - 0.5) * 0.01; // ±0.5% per tick
        this.prices[symbol] = Math.max(1, this.prices[symbol] * (1 + drift));
        this.ticks.push({ symbol, price: round2(this.prices[symbol]), at: Date.now() });
      }
    }, 1000);
    this.timer.unref?.(); // never keep the process alive just for the ticker
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = undefined;
    this.ticks.close();
  }

  price(symbol: Ticker): number {
    return round2(this.prices[symbol]);
  }
}
