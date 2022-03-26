import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismaClient";

const confirm = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({});
  }
  const { wholePhoneNumber, verificationCode } = JSON.parse(req.body);
  const oneTimePassword = await prisma.oneTimePassword.findFirst({
    where: {
      wholePhoneNumber,
    },
  });
  const isCodeCorrect = String(verificationCode) === String(oneTimePassword?.oneTimePassword);
  await prisma.oneTimePassword.deleteMany({
    where: {
      wholePhoneNumber,
    },
  });
  return res.json({ isCodeCorrect });
};

export default confirm;
