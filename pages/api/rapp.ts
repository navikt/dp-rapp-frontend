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
  const authHeader = req.headers.authorization || "";
  console.log("authHeader test: " + authHeader);
  const response = await fetch(url, {
    headers: { Authorization: authHeader },
  });
  return res.json(response);
}
