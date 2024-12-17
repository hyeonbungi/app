import { swagger } from '@elysiajs/swagger';
import Elysia from 'elysia';

export function initSwagger(app: Elysia) {
  app.use(
    swagger({
      provider: 'swagger-ui',
      path: '/api',
      documentation: {
        info: {
          title: 'Elysia Documentation',
          version: '1.0.0',
        },
        tags: [
          { name: 'App', description: 'General endpoints' },
          { name: 'Auth', description: 'Authentication endpoints' },
        ],
      },
    }),
  );
}
