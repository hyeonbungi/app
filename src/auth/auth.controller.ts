import { Elysia } from 'elysia';
import authService from './auth.service';

const authController = new Elysia({
  prefix: '/auth',
  detail: { tags: ['Auth'] },
})
  .use(authService)

  .post(
    '/sign-up',
    async ({ body: { nickname, plainPassword }, store, error }) => {
      if (store.user[nickname]) {
        return error(400, {
          success: false,
          message: '[ERROR] 이미 존재하는 닉네임입니다.',
        });
      }

      store.user[nickname] = await Bun.password.hash(plainPassword);
    },
    {
      body: 'signIn',
    },
  )

  .post(
    '/sign-in',
    async ({
      cookie: { token },
      body: { nickname, plainPassword },
      store: { user, session },
      error,
    }) => {
      if (
        !user[nickname] ||
        !(await Bun.password.verify(plainPassword, user[nickname]))
      ) {
        return error(400, {
          success: false,
          message: '[ERROR] 닉네임 또는 패스워드가 일치하지 않습니다.',
        });
      }

      const key = crypto.getRandomValues(new Uint32Array(1))[0];
      session[key] = nickname;
      token.value = key;

      return {
        success: true,
        message: `[INFO] ${nickname}님이 로그인했습니다.`,
      };
    },
    {
      body: 'signIn',
      cookie: 'session',
    },
  )

  .get(
    '/sign-out',
    ({ cookie: { token } }) => {
      token.remove();

      return {
        success: true,
        message: '[INFO] 로그아웃했습니다.',
      };
    },
    {
      cookie: 'optionalSession',
    },
  )

  .get(
    '/profile',
    ({ cookie: { token }, store: { session }, error }) => {
      const nickname = session[token.value];

      return {
        success: true,
        nickname,
      };
    },
    { isSignIn: true, cookie: 'session' },
  );

export default authController;
