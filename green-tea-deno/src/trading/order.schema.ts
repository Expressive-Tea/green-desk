import { z } from 'zod';

/**
 * Standard Schema (zod) for an order. Passed to `@body(OrderSchema)`, green-tea
 * validates and types the body before the handler runs — invalid input becomes
 * a `422` with per-field issues, and the core stays zero-dep (you bring zod).
 */
export const OrderSchema = z.object({
  symbol: z.enum(['BTC', 'ETH', 'SOL']),
  side: z.enum(['buy', 'sell']),
  qty: z.number().positive(),
});

export type Order = z.infer<typeof OrderSchema>;
