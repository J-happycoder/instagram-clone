import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import sessionOptions from "../../../../lib/sessionConfig";

const userRoute = (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.session;
  return res.status(200).json({ user });
};

export default withIronSessionApiRoute(userRoute, sessionOptions);
