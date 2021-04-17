import { NextApiRequest, NextApiResponse } from "next";
import { savePost } from "../../lib/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await savePost(req.query.slug.toString(), req.query.title.toString(), req.body);
  res.status(200).end();
}
