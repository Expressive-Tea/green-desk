import 'reflect-metadata';

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

const PORT = Number(process.env.PORT ?? 3000);

app.listen(PORT).then(() => {
  console.log(`\n  🍵 green-desk on http://localhost:${PORT}`);
  console.log(`     dashboard   http://localhost:${PORT}/`);
  console.log(`     graph       http://localhost:${PORT}/__graph__`);
  console.log(`     openapi     http://localhost:${PORT}/__openapi__\n`);
});

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    void app.close().then(() => process.exit(0));
  });
}
