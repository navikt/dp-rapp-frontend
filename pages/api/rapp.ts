// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import getConfig from "next/config";

type Data = {
  name: string;
};

const { serverRuntimeConfig } = getConfig();
const dpRappApiUrl = serverRuntimeConfig.DP_RAPP_API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //const { token } = await getSession(req);

  //const callId = uuid();
  const url = `${dpRappApiUrl}/api/v1/ping`;

  return await fetch(url, {
    headers: {
      //Authorization: `Bearer ${token}`,
      //"Downstream-Authorization": `Bearer ${token}`,
      "Nav-Consumer-Id": "dp-rapp-frontend",
      //"Nav-Call-Id": callId,
    },
  });
}
