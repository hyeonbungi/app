import { Elysia } from 'elysia';

const usersController = new Elysia({
  prefix: '/users',
  detail: { tags: ['Users'] },
});

export default usersController;
