import { Route, Get, Post, Ws, needs, body, inbound } from '@green-tea/core';

import type { User } from '../auth/session.provider';
import type { Market } from '../market/market';
import { OrderSchema, type Order } from './order.schema';
import type { Portfolio, Fill } from './portfolio.provider';

/**
 * Everything here `@needs('user')`, so every route slice includes the auth step
 * — the opposite of the public `/api/prices`. Same `@Route`, three transports:
 * JSON (portfolio), validated JSON (orders), and a duplex WebSocket (desk).
 */
@Route('/')
export class TradingController {
  @Get('/portfolio')
  portfolio(@needs('user') user: User, @needs('portfolio') pf: Portfolio) {
    return { user: user.name, positions: pf.positions(user.id) };
  }

  @Post('/orders')
  place(
    @needs('user') user: User,
    @needs('market') market: Market,
    @needs('portfolio') pf: Portfolio,
    @body(OrderSchema) order: Order,
  ) {
    const fill = pf.apply(user.id, order, market.price(order.symbol));
    return { accepted: true, fill };
  }

  @Ws('/desk')
  desk(
    @needs('user') _user: User,
    @needs('portfolio') pf: Portfolio,
    @inbound() incoming: AsyncIterable<string>,
  ): AsyncIterable<Fill> {
    // Duplex: drain client pings (fire-and-forget) while streaming fills back.
    void (async () => {
      for await (const _msg of incoming) {
        /* client keep-alive; nothing to do */
      }
    })().catch(() => {});
    // ponytail: single-tenant demo streams all fills; filter by _user.id for multi-tenant.
    return pf.fills;
  }
}
