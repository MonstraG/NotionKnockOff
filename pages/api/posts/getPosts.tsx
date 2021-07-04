import { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "~/lib/postApi";
import { PostFields } from "~/lib/helpers";

const resolveRequiredFields = (req: NextApiRequest): PostFields => {
  if (typeof req.query.fields === "string") {
    return [req.query.fields] as PostFields;
  }
  if (typeof req.query.fields === "object") {
    //string[]
    return req.query.fields as PostFields;
  }
  return [];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = await getAllPosts(resolveRequiredFields(req));
  res.status(200).send(posts);
}
