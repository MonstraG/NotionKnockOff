import { NextApiRequest, NextApiResponse } from "next";
import { savePost } from "~/lib/mdApi";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await savePost(req.query.slug?.toString(), req.body);
  res.status(200).end();
}
