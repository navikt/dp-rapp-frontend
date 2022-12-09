// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../auth.utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const audienceRappApi = `${process.env.NAIS_CLUSTER_NAME}:raptus:dp-rapp-api`;
  try {
    const session = await getSession(req);

    if (!session) {
      return res.status(401).end(); //skal aldri skje siden vi har wonderwall med enforcedlogin
    }
    const onBehalfOfToken = await session.apiToken(audienceRappApi);

    //const callId = uuid(); //trengs kanskje senere hvis vi skal ha tracing
    const dpRappApiUrl = process.env.DP_RAPP_API_URL;
    const url = `${dpRappApiUrl}/api/v1/authenticatedping`;
    const response = await fetch(url, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${onBehalfOfToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`unexpected response ${response.statusText}`);
    }
    return res.json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
}
