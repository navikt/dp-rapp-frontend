import { Button } from "@navikt/ds-react";

export default function Page() {
  const kallApi = () =>
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => console.log(data));
  const kallRappApi = () => console.log("denne gjør ingenting enda!!");
  return (
    <main>
      <h1>Hello, Next.js!</h1>
      <Button onClick={() => kallApi()}> kall hello api </Button>
      <Button onClick={() => kallRappApi()}> kall dp-rapp-api </Button>
    </main>
  );
}
