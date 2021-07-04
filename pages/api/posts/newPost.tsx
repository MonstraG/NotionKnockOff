import { NextApiRequest, NextApiResponse } from "next";
import { createNewPost } from "~/lib/postApi";
import { sendOk } from "~/lib/requests";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  sendOk(res, await createNewPost());
}
