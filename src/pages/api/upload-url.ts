import { NextApiRequest, NextApiResponse } from "next";

const getUploadUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const { result } = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    )
  ).json();
  return res.status(200).json(result);
};

export default getUploadUrl;
