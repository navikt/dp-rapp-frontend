// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../auth.utils";

export const audienceRappApi = `${process.env.NAIS_CLUSTER_NAME}:raptus:dp-rapp-api`;

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //const { token } = await getSession(req);
  console.log("fått kall");
  try {
    console.log("prøver å hente session");
    const session = await getSession(req);

    if (!session) {
      return res.status(401).end();
    }
    console.log("lager obo token");
    const onBehalfOfToken = await session.apiToken(audienceRappApi);
    //const callId = uuid();
    const dpRappApiUrl = process.env.DP_RAPP_API_URL;
    const url = `${dpRappApiUrl}/api/v1/authenticatedping`;
    console.log("pinger rapp-api");
    const response = await fetch(url, {
      method: "Get",
      headers: { Authorization: `Bearer ${onBehalfOfToken}` },
    });
    console.log("fått respons fra api: " + response.statusText);
    if (!response.ok) {
      throw new Error(`unexpected response ${response.statusText}`);
    }
    return res.json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
}
