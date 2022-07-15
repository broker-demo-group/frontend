import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { logout } from "../../api/account";

async function logoutRoute(req, res) {
  const isLogoutSuccessful = await logout();
  if (isLogoutSuccessful) {
    req.session.destroy();
    res.json({ isLoggedIn: false });
  }
  res.json({ message: "failed to logout" });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
