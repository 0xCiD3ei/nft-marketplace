import {withSessionSsr} from "src/lib/middlewares/withSession";

export const withAuthSsr = (fn) => {
  return withSessionSsr(ctx => {
    if(!ctx.req.session.isLoggedIn) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false
        }
      }
    }
    return fn(ctx);
  });
}