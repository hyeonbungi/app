import { Elysia } from 'elysia';

const appController = new Elysia({ prefix: '', detail: { tags: ['App'] } })
  .get('/', ({ path }) => path)
  .post('/hello', 'Do you miss me?');

export default appController;
