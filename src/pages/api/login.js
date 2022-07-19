import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { loginWithUserAndPassword } from "../../api/account";
import axios from "axios";

async function loginRoute(req, res) {
  const { username, password } = await req.body;
  // console.log(`user: ${username} pw: ${password}`);
  const response = await loginWithUserAndPassword(username, password);
  if (response.status === "success" && response.token !== undefined) {
    const cookie = { isLoggedIn: true, token: response.token };
    console.log(cookie);
    req.session.user = cookie;
    await req.session.save();
    res.json(cookie);
  } else {
    const msg = response.message ?? "Unknown error";
    res.json({ message: msg });
    // res.status(500).json({ message: msg });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
