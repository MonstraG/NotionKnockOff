import { NextApiRequest, NextApiResponse } from "next";
import { createNewRecording } from "~/lib/recordingApi";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const newSlug = await createNewRecording(req.body);
  res.status(200).send(newSlug);
}
