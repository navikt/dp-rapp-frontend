import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../../auth.utils";
import { v4 as uuid } from 'uuid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession(req);

    if (!session) {
      return res.status(401).end(); //skal aldri skje siden vi har wonderwall med enforcedlogin
    }

    const audienceRappApi = `${process.env.NAIS_CLUSTER_NAME}:raptus:dp-rapp-api`;

    const onBehalfOfToken = await session.apiToken(audienceRappApi);

    const callId = uuid();
    const dpRappApiUrl = process.env.DP_RAPP_API_URL;
    const url = `${dpRappApiUrl}/api/v1/mellomlagring/lagre`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${onBehalfOfToken}`,
        "X-Request-ID": callId
      },
      body: JSON.stringify(req.body),
    })

    if (!response.ok) {
      return res.status(500).send(`Unexpected response status: ${response.statusText}`)
    }

    return res.json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
}
