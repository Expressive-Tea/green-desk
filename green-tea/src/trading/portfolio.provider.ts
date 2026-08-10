import { Provider, channel, type Channel } from '@green-tea/core';

import type { Ticker } from '../market/market';
import type { Order } from './order.schema';

export interface Fill {
  user: string;
  symbol: Ticker;
  side: 'buy' | 'sell';
  qty: number;
  price: number;
  at: number;
}

export interface Position {
  symbol: Ticker;
  qty: number;
}

/** Per-user books plus a fan-out stream of every fill, for the live desk feed. */
export class Portfolio {
  readonly fills: Channel<Fill> = channel<Fill>({ buffer: 50 });

  private readonly books = new Map<string, Map<Ticker, number>>();

  positions(userId: string): Position[] {
    const book = this.books.get(userId) ?? new Map<Ticker, number>();
    return [...book.entries()].map(([symbol, qty]) => ({ symbol, qty }));
  }

  apply(userId: string, order: Order, price: number): Fill {
    const book = this.books.get(userId) ?? new Map<Ticker, number>();
    const delta = order.side === 'buy' ? order.qty : -order.qty;
    book.set(order.symbol, (book.get(order.symbol) ?? 0) + delta);
    this.books.set(userId, book);

    const fill: Fill = { user: userId, symbol: order.symbol, side: order.side, qty: order.qty, price, at: Date.now() };
    this.fills.push(fill);
    return fill;
  }
}

@Provider({ provides: 'portfolio' })
export class PortfolioProvider {
  private readonly portfolio = new Portfolio();

  provide(): { portfolio: Portfolio } {
    return { portfolio: this.portfolio };
  }
}
