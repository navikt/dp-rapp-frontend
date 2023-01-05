import { getSession } from "./auth.utils";
import { v4 as uuid } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";

export const doRequest = async (req: NextApiRequest, res: NextApiResponse, method: string, url: string) => {
  const session = await getSession(req);

  if (!session) {
    // return res.status(401).end(); //skal aldri skje siden vi har wonderwall med enforcedlogin
  }

  const audienceRappApi = `${process.env.NAIS_CLUSTER_NAME}:raptus:dp-rapp-api`;

  const onBehalfOfToken = await session.apiToken(audienceRappApi);

  const callId = uuid();

  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
      "X-Request-ID": callId
    },
    body: req.body ? JSON.stringify(req.body) : null
  }

  return await fetch(url, options);
}