import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await client.messages.create({
    body: "사랑해",
    from: "+19035182760",
    to: "+8201037561286",
  });
  return res.end();
};

export default handler;
