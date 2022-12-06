// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

type Data = {
  name: string;
};
const dpRappApiUrl = process.env.DP_RAPP_API_URL;

export async function kallRappApiBak() {
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

/*export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}*/
