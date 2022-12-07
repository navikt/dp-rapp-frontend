// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //const { token } = await getSession(req);

  //const callId = uuid();
  const dpRappApiUrl = process.env.DP_RAPP_API_URL;
  const url = `${dpRappApiUrl}/api/v1/authenticatedping`;
  console.log("Prøver å pinge api at url: " + url);
  console.log("headers: " + JSON.stringify(req.headers));
  const response = await fetch(url);
  return res.json(response);
}
