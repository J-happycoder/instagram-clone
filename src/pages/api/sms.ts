import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import prisma from "../../../lib/prismaClient";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const SMSAccessToken = process.env.NEXT_PUBLIC_SMS_ACCESS_TOKEN;

const sendMessage = async (message: string) => {
  await client.messages.create({
    body: message,
    from: "+19035182760",
    to: "+8201083171236",
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { SMSAccessToken: sendedToken, wholePhoneNumber } = JSON.parse(req.body);
  const verificationCode = Math.floor(Math.random() * 900000) + 100000;
  const passwordIncorrect = sendedToken !== SMSAccessToken;
  if (req.method !== "POST" || passwordIncorrect) {
    return res.status(400).json({ sended: false });
  }
  await prisma.oneTimePassword.create({
    data: {
      wholePhoneNumber,
      oneTimePassword: verificationCode,
    },
  });
  // const message = `Your verification code is ${verificationCode}`;
  // sendMessage(message)

  return res.status(200).json({ sended: true });
};

export default handler;
