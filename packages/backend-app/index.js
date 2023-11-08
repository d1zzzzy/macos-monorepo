// packages/backend-app/index.js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World from Koa in a Monorepo!';
});

app.listen(3000);
