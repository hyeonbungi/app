import { Elysia, t } from 'elysia';
import { initSwagger } from './init-swagger';
import appController from './app/app.controller';
import authController from './auth/auth.controller';

const app = new Elysia();

initSwagger(app);

app.use(appController).use(authController);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
