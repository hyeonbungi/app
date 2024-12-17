import { Elysia } from 'elysia';

export function initLogger(app: Elysia) {
  app.onTransform(function log({ body, params, path, request: { method } }) {
    console.log(`${method} ${path}`, { params, body });
  });
}
