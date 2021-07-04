import { NextApiResponse } from "next";

export const sendOk = (res: NextApiResponse, body?: any) => {
  res.status(200);
  if (body) {
    res.send(body);
  } else {
    res.end();
  }
};
