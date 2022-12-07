import { Button } from "@navikt/ds-react";
import getConfig from "next/config";

export default function Page(dekoratorEnv: string) {
  const kallApi = () =>
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => console.log(data));
  const kallRappApi = () =>
    fetch("/api/rapp").then((response) => console.log(response));

  return (
    <main>
      <h1>Hello, Next.js!</h1>
      <p>dekoratoren env er: ukjent</p>
      <Button onClick={() => kallApi()}> kall hello api </Button>
      <Button onClick={() => kallRappApi()}> kall dp-rapp-api </Button>
    </main>
  );
}
Page.getInitialProps = async () => {
  const { publicRuntimeConfig } = await getConfig();
  const dekoratorEnv = publicRuntimeConfig.NAV_DEKORATOREN_ENV;
  return { dekoratorEnv };
};
