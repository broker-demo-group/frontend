import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '../../pages/api/user';
import axios from 'axios';
import { LOGOUT } from '../../api/account';

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
//   axios.post(LOGOUT).then({
    req.session.destroy();
    res.json({ isLoggedIn: false, login: ''});    
//   }).catch(e => console.log(e));
}
