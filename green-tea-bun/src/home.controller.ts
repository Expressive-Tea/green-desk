import { Route, Get, Html } from '@green-tea/core';

/**
 * Serve the static dashboard from the same origin (no CORS, no static server).
 * `@Html('path')` reads the file at boot and serves it as `text/html` — the whole
 * manual `readFileSync` + `@Transformer` dance is gone. The handler returns
 * nothing (`: void`); the file is the response.
 */
@Route('/')
export class HomeController {
  @Get('/')
  @Html('public/index.html')
  home(): void {}
}
