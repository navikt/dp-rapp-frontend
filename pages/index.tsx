import { Button } from "@navikt/ds-react";
import { kallRappApiBak } from "./api/rapp";
import getConfig from "next/config";
import { Env } from "@navikt/nav-dekoratoren-moduler/ssr";

export default function Page() {
  const kallApi = () =>
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => console.log(data));
  const kallRappApi = () =>
    kallRappApiBak()
      .then((response) => response.json())
      .then((data) => console.log(data));
  const { publicRuntimeConfig } = getConfig();
  const dekoratorEnv = publicRuntimeConfig.NAV_DEKORATOREN_ENV as Exclude<
    Env,
    "localhost"
  >;
  return (
    <main>
      <h1>Hello, Next.js!</h1>
      <p>dekoratoren env er: {dekoratorEnv}</p>
      <Button onClick={() => kallApi()}> kall hello api </Button>
      <Button onClick={() => kallRappApi()}> kall dp-rapp-api </Button>
    </main>
  );
}
