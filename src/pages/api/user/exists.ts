import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prismaClient";

const checkUserExists = async (req: NextApiRequest, res: NextApiResponse) => {
  const { wholePhoneNumber } = JSON.parse(req.body);
  const existingUser = await prisma.user.findFirst({
    where: {
      wholePhoneNumber,
    },
  });
  if (existingUser) {
    return res.status(200).json({ exists: true });
  }
  return res.status(200).json({ exists: false });
};

export default checkUserExists;
