import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import sessionOptions from "../../../lib/sessionConfig";

const logoutRoute = (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  return res.status(200).json({});
};

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
