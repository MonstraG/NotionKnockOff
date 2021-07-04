import { NextApiRequest, NextApiResponse } from "next";
import { createNewRecording } from "~/lib/recordingApi";
import { sendOk } from "~/lib/requests";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  sendOk(res, await createNewRecording(req.body));
}
