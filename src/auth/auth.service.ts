import { Elysia, t } from 'elysia';

const authService = new Elysia({ name: 'auth/service' })
  .state({
    user: {} as Record<string, string>,
    session: {} as Record<number, string>,
  })
  .model({
    signIn: t.Object({
      nickname: t.String({ minLength: 1 }),
      plainPassword: t.String({ minLength: 8 }),
    }),
    session: t.Cookie({ token: t.Number() }, { secrets: 'hyeonbungi' }),
  })

  .model((model) => ({
    ...model,
    optionalSession: t.Optional(model.session),
  }))

  .macro(({ onBeforeHandle }) => ({
    isSignIn(enabled: boolean) {
      if (!enabled) {
        return;
      }

      onBeforeHandle(({ cookie: { token }, store: { session }, error }) => {
        if (!token.value) {
          return error(401, {
            success: false,
            message: '[ERROR] 로그인이 필요합니다.',
          });
        }

        const nickname = session[token.value as unknown as number];
        if (!nickname) {
          return error(401, {
            success: false,
            message: '[ERROR] 로그인이 필요합니다.',
          });
        }
      });
    },
  }));

export default authService;
