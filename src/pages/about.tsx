import { GuidePanel } from "@navikt/ds-react";
import Menu from "../../components/Menu";
import Spacer from "../../components/Spacer";

export default function Page() {

  return (
    <main>
      <Menu />

      <h1>Om meldekort</h1>

      <GuidePanel poster>
        Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
        enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
        er forlenget.
      </GuidePanel>

      <Spacer />

    </main>
  );
}
