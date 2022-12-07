// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { GetServerSidePropsContext } from "next";

type Data = {
  name: string;
};

export default async function handler({ req }: GetServerSidePropsContext) {
  //const { token } = await getSession(req);

  //const callId = uuid();
  const dpRappApiUrl = process.env.DP_RAPP_API_URL;
  const url = `${dpRappApiUrl}/api/v1/ping`;
  console.log("Prøver å pinge api at url: " + url);

  return await fetch(url, {
    headers: {
      //Authorization: `Bearer ${token}`,
      //"Downstream-Authorization": `Bearer ${token}`,
      "Nav-Consumer-Id": "dp-rapp-frontend",
      //"Nav-Call-Id": callId,
    },
  });
}
