import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismaClient";

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description } = JSON.parse(req.body);
  await prisma.post.create({
    data: {
      title,
      description,
    },
  });
  return res.status(200).end();
};

export default upload;
