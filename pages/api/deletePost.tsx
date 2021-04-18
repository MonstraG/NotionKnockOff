import { NextApiRequest, NextApiResponse } from "next";
import { deletePost } from "../../lib/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await deletePost(req.query.slug.toString());
  res.status(200).end();
}
