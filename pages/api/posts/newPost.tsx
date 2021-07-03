import { NextApiRequest, NextApiResponse } from "next";
import { createNewPost } from "~/lib/postApi";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const newSlug = await createNewPost();
  res.status(200).send(newSlug);
}
