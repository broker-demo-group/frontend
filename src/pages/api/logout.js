import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { logout, LOGOUT } from "../../api/account";
import fetchJson from "../../lib/fetchJson";
import axios from "axios";

async function logoutRoute(req, res) {
  // const isLogoutSuccessful = await logout();
  // console.log(req.session);
  // try {
  //   // const logoutResponse = await axios.post(LOGOUT);

  //   // fetchJson(LOGOUT, { headers: { token: token } })
  //   // axios
  //   //   .post(LOGOUT)

  //   //   // if (token) {
  //   //   // logout()

  //   // const isLogoutSuccessful = true;
  //   // if (isLogoutSuccessful) {
  //   if (isLogoutSuccessful) {
  req.session.destroy();
  res.json({ isLoggedIn: false });
  return;
  //   }

  //   res.json(res.session.user);

  //   // req.session.user = { isLoggedIn: false };
  //   // await req.session.save();
  // } catch (err) {
  //   console.log(`error: ${err}`);
  //   res.json(req.session.user);
  // }
  // // }
  // res.json({ message: "failed to logout" });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
