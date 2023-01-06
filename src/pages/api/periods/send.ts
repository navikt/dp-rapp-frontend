import type { NextApiRequest, NextApiResponse } from "next";
import { doRequest } from "../../../utils/api.utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = `${process.env.DP_RAPP_API_URL}/api/v1/meldeperioder/send`;

    const response = await doRequest(req, res, "POST", url);

    if (!response.ok) {
      return res.status(500).send(`Unexpected response status: ${response.statusText}`)
    }

    return res.end();
  } catch (error) {
    return res.status(500).send(error);
  }
}
