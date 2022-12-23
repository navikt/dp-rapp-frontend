import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../auth.utils";
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

    const response = {
      answer: "ok"
    };
    /*
    const callId = uuid();
    const dpRappApiUrl = process.env.DP_RAPP_API_URL;
    const url = `${dpRappApiUrl}/api/v1/authenticatedping`;
    const response = await fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${onBehalfOfToken}`,
        "X-Request-ID": callId
      },
    })

    if (!response.ok) {
      return res.status(500).send(`Unexpected response status: ${response.statusText}`)
    }
    */

    // TODO: delete
    // Sleep 2 seconds
    await new Promise(r => setTimeout(r, 2000));

    return res.json(response);
    // return res.status(500).end();
  } catch (error) {
    return res.status(500).send(error);
  }
}
