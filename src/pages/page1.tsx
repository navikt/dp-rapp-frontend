import NavPanel from "../../components/NavPanel";
import { Button, Panel } from "@navikt/ds-react";

export default function Page() {

  const kallApi = () =>
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => console.log(data));
  const kallRappApi = () =>
    fetch("/api/rapp").then((response) => console.log(response));

  return (
    <main>
      <h1>Page 1</h1>
      <p>Bla bla bla 1</p>
      <Panel>
        <Button onClick={() => kallApi()}> kall hello api </Button>
        <Button onClick={() => kallRappApi()}> kall dp-rapp-api </Button>
      </Panel>

      <NavPanel backHref="/" backText="Tilbake" nextHref="/page2" nextText="Neste" />
    </main>
  );
}
