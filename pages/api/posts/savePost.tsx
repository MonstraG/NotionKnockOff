import { NextApiRequest, NextApiResponse } from "next";
import { savePost } from "~/lib/postApi";
import { sendOk } from "~/lib/requests";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await savePost(req.query.slug?.toString(), req.body);
  sendOk(res);
}
