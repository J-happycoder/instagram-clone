import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismaClient";

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, hashTagList, id } = JSON.parse(req.body);
  await prisma.post.create({
    data: {
      id,
      title,
      description,
      hashTagList: JSON.stringify(hashTagList),
    },
  });
  return res.status(200).end();
};

export default upload;
