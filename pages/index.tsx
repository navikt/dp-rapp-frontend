import { Button } from "@navikt/ds-react";

export default function Page() {
  const kallApi = () =>
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => console.log(data));
  const kallRappApi = () =>
    fetch("/api/rapp")
      .then((response) => response.json())
      .then((data) => console.log(data));

  return (
    <main>
      <h1>Hello, Next.js!</h1>
      <p>dekoratoren env er: VET IKKE</p>
      <Button onClick={() => kallApi()}> kall hello api </Button>
      <Button onClick={() => kallRappApi()}> kall dp-rapp-api </Button>
    </main>
  );
}
