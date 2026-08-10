import 'reflect-metadata';

import { serveDeno } from '@green-tea/core/deno';

import { buildApp } from './app.ts';

const app = buildApp();

// Prove the slice: the public route carries no auth step; the gated one does.
const slice = (route: string): string =>
  app
    .explain(route)
    .chain.map((node) => `${node.kind}:${node.name}`)
    .join('  ->  ');

console.log('\n  public   /api/prices     ', slice('/api/prices'));
console.log('  gated    /api/portfolio  ', slice('/api/portfolio'));

const port = Number(Deno.env.get('PORT') ?? 3000);

// The whole difference from the Node demo is this line: serveDeno instead of app.listen.
serveDeno(app, {
  port,
  onListen: ({ port }) => {
    console.log(`\n  🍵 green-desk on Deno — http://localhost:${port}`);
    console.log(`     dashboard   http://localhost:${port}/`);
    console.log(`     graph       http://localhost:${port}/__graph__`);
    console.log(`     openapi     http://localhost:${port}/__openapi__\n`);
  },
});
