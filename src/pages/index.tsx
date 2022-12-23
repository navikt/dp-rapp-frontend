import { Button, Panel } from "@navikt/ds-react";
import NavPanel from "../../components/NavPanel";

export default function Page() {

  const kallRappApi = () =>
    fetch("/api/rapp").then((response) => console.log(response));
  /*
  .then((response) => response.json())
      .then((data) => console.log(data));
   */

  return (
    <main>
      <h1>Ny løsning</h1>
      <p>Bla bla bla 1</p>
      <Panel>
        <Button onClick={() => kallRappApi()}> kall dp-rapp-api </Button>
      </Panel>

      <NavPanel nextHref="/form" nextText="Begynn utfylling (new)" />
    </main>
  );
}
