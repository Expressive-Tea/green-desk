import 'reflect-metadata';

import { serveBun } from '@green-tea/core/bun';

import { buildApp } from './app';

const app = buildApp();

// Prove the slice: the public route carries no auth step; the gated one does.
const slice = (route: string): string =>
  app
    .explain(route)
    .chain.map((node) => `${node.kind}:${node.name}`)
    .join('  ->  ');

console.log('\n  public   /api/prices     ', slice('/api/prices'));
console.log('  gated    /api/portfolio  ', slice('/api/portfolio'));

const port = Number(process.env.PORT ?? 3000);

// The whole difference from the Node/Deno demos is this line: serveBun.
const server = serveBun(app, { port });

console.log(`\n  🍵 green-desk on Bun — http://localhost:${server.port}`);
console.log(`     dashboard   http://localhost:${server.port}/`);
console.log(`     graph       http://localhost:${server.port}/__graph__`);
console.log(`     openapi     http://localhost:${server.port}/__openapi__\n`);
