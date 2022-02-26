import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import prisma from "../../../lib/prismaClient";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const smsPassword = process.env.NEXT_PUBLIC_SMS_PASSWORD;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { password, wholePhoneNumber } = JSON.parse(req.body);
  const verificationCode = Math.floor(Math.random() * 900000) + 100000;
  const passwordIncorrect = password !== smsPassword;
  if (req.method !== "POST" || passwordIncorrect) {
    return res.status(400).json({ sended: false });
  }
  await prisma.oneTimePassword.create({
    data: {
      phoneNumber: wholePhoneNumber,
      oneTimePassword: verificationCode,
    },
  });
  const message = `Your verification code is ${verificationCode}`;
  // await client.messages.create({
  //   body: message,
  //   from: "+19035182760",
  //   to: "+8201037561286",
  // });
  return res.status(200).json({ sended: true });
};

export default handler;
