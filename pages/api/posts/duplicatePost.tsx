import { NextApiRequest, NextApiResponse } from "next";
import { duplicatePost } from "~/lib/postApi";
import { sendOk } from "~/lib/requests";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  sendOk(res, await duplicatePost(req.query.slug.toString()));
}
