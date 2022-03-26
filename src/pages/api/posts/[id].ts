import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prismaClient";
import { QueryString } from "../../../types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: QueryString = req.query.id;
  if (id === "") {
    return res.status(404).end();
  }
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.status(200).json({ post });
};

export default handler;
