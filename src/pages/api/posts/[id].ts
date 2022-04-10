import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = String(req.query.id);
  if (id === "") {
    return res.status(404).end();
  }

  const where = { where: { id } };

  if (req.method === "GET") {
    const post = await prisma.post.findUnique(where);
    return res.status(200).json({ post });
  }
  if (req.method === "DELETE") {
    await prisma.post.delete(where);
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v1/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.CF_TOKEN}`,
        },
      }
    );
    return res.status(200).end();
  }
};

export default handler;
