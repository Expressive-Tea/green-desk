import { Step, Unauthorized } from '@green-tea/core';

import type { Sessions, User } from './session.provider';

/** Steps read the accumulated context directly — no argument decorators. */
interface AuthContext {
  sessions: Sessions;
  req: { headers: Record<string, string | string[] | undefined> };
  query?: Record<string, string | undefined>;
}

/**
 * Provides `user`. Because it lives in the graph, ANY handler that
 * `@needs('user')` pulls this step into its route slice — and routes that don't
 * (like `/api/prices`) never run it. Boot fails loudly if `sessions` is missing.
 *
 * Token comes from the `x-token` header (HTTP) or `?token=` (browser WebSocket,
 * which can't set custom headers).
 */
@Step({ provides: 'user', needs: ['sessions', 'req'] })
export class Authenticate {
  run(ctx: AuthContext): { user: User } {
    const header = ctx.req.headers['x-token'];
    const token = (Array.isArray(header) ? header[0] : header) ?? ctx.query?.token;
    const user = ctx.sessions.find(token);
    if (!user) throw new Unauthorized('invalid or missing token (x-token header or ?token=)');
    return { user };
  }
}
