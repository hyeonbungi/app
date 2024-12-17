import { Elysia } from 'elysia';

const authController = new Elysia({ prefix: '/auth' })
  .post('/sign-in', () => 'Sign in')
  .post('/sign-up', async ({ body }) => body, {
    detail: { tags: ['Auth'] },
  })
  .post('/profile', () => 'Profile');

export default authController;
