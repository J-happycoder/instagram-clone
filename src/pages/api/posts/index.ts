import { Post } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts: Post[] = await prisma.post.findMany();
  return res.status(200).json({ posts });
};

export default handler;
