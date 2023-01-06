import type { NextApiRequest, NextApiResponse } from "next";
import { doRequest } from "../../../utils/api.utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query
    const url = `${process.env.DP_RAPP_API_URL}/api/v1/meldeperioder/mellomlagret/${id}`;

    const response = await doRequest(req, res, "GET", url);

    if (!response.ok) {
      return res.status(500).send(`Unexpected response status: ${response.statusText}`)
    }

    const json = await response.json();

    return res.json(json);
  } catch (error) {
    return res.status(500).send(error);
  }
}
