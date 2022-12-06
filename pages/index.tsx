import { Button } from "@navikt/ds-react";
import { kallRappApiBak } from "./api/rapp";

export default function Page() {
  const kallApi = () =>
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => console.log(data));
  const kallRappApi = () => console.log("du kommer ikke lengre enn hit");
  return (
    <main>
      <h1>Hello, Next.js!</h1>
      <Button onClick={() => kallApi()}> kall hello api </Button>
      <Button onClick={() => kallRappApiBak()}> kall dp-rapp-api </Button>
    </main>
  );
}
