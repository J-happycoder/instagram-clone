import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismaClient";
import sessionOptions from "../../../lib/sessionConfig";

const joinRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { wholePhoneNumber, name } = JSON.parse(req.body);
  try {
    await prisma.user.create({
      data: {
        wholePhoneNumber,
        name,
      },
    });
  } catch {
    return res.status(400).json({ success: false });
  }
  return res.status(200).json({ success: true });
};

export default withIronSessionApiRoute(joinRoute, sessionOptions);
