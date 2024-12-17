import { Elysia, t } from 'elysia';

const appController = new Elysia({ prefix: '' })
  .get('/', 'Hello, Elysia!', {
    detail: { tags: ['App'] },
  })
  .get('/users/:id', ({ params: { id } }) => id, {
    params: t.Object({
      id: t.Numeric(),
    }),
    detail: { tags: ['App'] },
  })
  .post('/form', ({ body }) => body, {
    detail: { tags: ['App'] },
  });

export default appController;
