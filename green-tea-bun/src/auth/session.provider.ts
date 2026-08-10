import { Provider } from '@green-tea/core';

export interface User {
  id: string;
  name: string;
}

/** Looks a bearer token up to a user, or null. */
export interface Sessions {
  find(token: string | undefined): User | null;
}

/**
 * Toy session store. green-tea ships transport security but NOT auth — you
 * compose it as a provider + step (this file plus {@link Authenticate}). A real
 * app would verify a JWT or hit a session store here; the wiring is identical.
 */
@Provider({ provides: 'sessions' })
export class SessionProvider {
  private readonly users: Record<string, User> = {
    'tok-diego': { id: 'u1', name: 'Diego' },
    'tok-ana': { id: 'u2', name: 'Ana' },
  };

  provide(): { sessions: Sessions } {
    return {
      sessions: {
        find: (token) => (token ? this.users[token] ?? null : null),
      },
    };
  }
}
