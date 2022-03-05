import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await prisma.post.findMany();
  return res.status(200).json({ posts });
};

export default handler;
