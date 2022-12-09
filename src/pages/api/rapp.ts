// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../auth.utils";

export const audienceRappApi = `dev-gcp:raptus:dp-rapp-api`;

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //const { token } = await getSession(req);
  console.log("1: fått kall");
  try {
    console.log("2: prøver å hente session");
    const session = await getSession(req);

    if (!session) {
      return res.status(401).end();
    }
    try {
      console.log("3: lager obo token");
      const onBehalfOfToken = await session.apiToken(audienceRappApi);
    } catch (error) {
      console.log("aiii, noe kresjet. error: " + error);
    }
    //const callId = uuid();
    const dpRappApiUrl = process.env.DP_RAPP_API_URL;
    const url = `${dpRappApiUrl}/api/v1/authenticatedping`;
    console.log("4: pinger rapp-api");
    const response = await fetch(url, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${"oboToken-funker-ikke"}`,
      },
    });
    console.log("5: fått respons fra api: " + response.statusText);
    if (!response.ok) {
      throw new Error(`unexpected response ${response.statusText}`);
    }
    return res.json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
}
