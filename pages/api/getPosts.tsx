import { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts, PostFields } from "../../lib/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let fields = ["slug"];
  if (typeof req.query.fields === "string") {
    fields.push(req.query.fields);
  }
  if (typeof req.query.fields === "object") {
    //string[]
    fields.push(...req.query.fields);
  }
  const posts = await getAllPosts(fields as PostFields);
  res.status(200).send(posts);
}
