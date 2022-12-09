// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../auth.utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //const { token } = await getSession(req);
  console.log("1: fått kall");
  const audienceRappApi = `dev-gcp:raptus:dp-rapp-api`;
  try {
    console.log("2: prøver å hente session");
    const session = await getSession(req);

    if (!session) {
      return res.status(401).end();
    }
    console.log("3: lager obo token");
    const onBehalfOfToken = await session.apiToken(audienceRappApi);

    //const callId = uuid();
    const dpRappApiUrl = process.env.DP_RAPP_API_URL;
    const url = `${dpRappApiUrl}/api/v1/authenticatedping`;
    console.log("4: pinger rapp-api");
    const response = await fetch(url, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${onBehalfOfToken}`,
      },
    });
    console.log("5: fått respons fra api: " + response.statusText);
    if (!response.ok) {
      throw new Error(`unexpected response ${response.statusText}`);
    }
    return res.json(response);
  } catch (error) {
    console.log("aiii, noe kresjet. error: " + error);
    return res.status(500).send(error);
  }
}
