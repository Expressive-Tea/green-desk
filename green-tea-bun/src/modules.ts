import { Module } from '@green-tea/core';

import { Authenticate } from './auth/authenticate.step';
import { SessionProvider } from './auth/session.provider';
import { HomeController } from './home.controller';
import { MarketController } from './market/market.controller';
import { MarketProvider } from './market/market.provider';
import { PortfolioProvider } from './trading/portfolio.provider';
import { TradingController } from './trading/trading.controller';

/** The API surface, mounted under /api. Providers + the auth step + controllers. */
@Module({
  mountpoint: '/api',
  providers: [MarketProvider, SessionProvider, PortfolioProvider],
  steps: [Authenticate],
  controllers: [MarketController, TradingController],
})
export class ApiModule {}

/** The dashboard, mounted at the root. */
@Module({ mountpoint: '/', controllers: [HomeController] })
export class WebModule {}
