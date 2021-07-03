import { NextApiRequest, NextApiResponse } from "next";
import { duplicatePost } from "~/lib/mdApi";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const newSlug = await duplicatePost(req.query.slug.toString());
  res.status(200).send(newSlug);
}
