import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({});
  }
  const { wholePhoneNumber, enteredVerificationCode } = JSON.parse(req.body);
  const oneTimePassword = await prisma.oneTimePassword.findFirst({
    where: {
      phoneNumber: wholePhoneNumber,
    },
  });
  if (String(enteredVerificationCode) !== String(oneTimePassword?.oneTimePassword)) {
    return res.status(400).json({ codeCorrect: false });
  }
  return res.status(200).json({ codeCorrect: true });
};

export default handler;
