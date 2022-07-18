import { withIronSessionApiRoute } from "iron-session/next";
// import { isLoggedIn } from "src/api/account";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req, res) {
  if (!req.session.user) {
    res.json({
      isLoggedIn: false,
    });
    return;
  }

  // const isNotLoggedIn = !(await isLoggedIn(req.session?.user?.token));

  // if (isNotLoggedIn) {
  //   res.json({
  //     isLoggedIn: false,
  //   });
  //   return;
  // }

  res.json({
    ...req.session.user,
    isLoggedIn: true,
  });
}
