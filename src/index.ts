import { Elysia } from 'elysia';
import { initSwagger } from './_common/utils/init-swagger';
import appController from './app/app.controller';
import authController from './auth/auth.controller';
import notesController from './notes/notes.controller';
import { initLogger } from './_common/utils/init-logger';

const app = new Elysia();

initSwagger(app);
initLogger(app);

app.use(appController).use(authController).use(notesController);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
