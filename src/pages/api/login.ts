import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismaClient";
import sessionOptions from "../../../lib/sessionConfig";

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { wholePhoneNumber } = JSON.parse(req.body);
  const user = await prisma.user.findFirst({
    where: {
      wholePhoneNumber,
    },
  });
  req.session.user = user;
  await req.session.save();
  return res.status(200).json({});
};

export default withIronSessionApiRoute(loginRoute, sessionOptions);
