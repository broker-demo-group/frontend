import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { loginWithUserAndPassword } from "../../api/account";

async function loginRoute(req, res) {
  const { username, password } = await req.body;
  // console.log(`user: ${username} pw: ${password}`);
  const response = await loginWithUserAndPassword(username, password);
  console.log(response);
  if (response.status === "success" && response.token !== undefined) {
    const cookie = { isLoggedIn: true, token: response.token };
    req.session.user = cookie;
    await req.session.save();
    res.json(cookie);
  } else {
    const msg = res.message ?? "Unknown error";

    res.status(500).json({ message: msg });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
