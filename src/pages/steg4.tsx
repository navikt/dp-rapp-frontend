import { ConfirmationPanel, Heading } from "@navikt/ds-react";
import NavPanel from "../../components/NavPanel";
import CustomStepper from "../../components/CustomStepper";
import Spacer from "../../components/Spacer";
import Divider from "../../components/Divider";
import { useState } from "react";
import CancelButton from "../../components/CancelButton";

export default function Page() {

  const [state, setState] = useState(false);

  return (
    <main>
      <Heading level="1" size="xlarge">Dagpenger rapportering</Heading>
      <Heading level="2" size="medium">Uke 49 - 50 (05.12.22 - 18.12.22)</Heading>

      <Divider />

      <CustomStepper numberOfSteps={4} currentStep={4} />

      <Heading level="3" size="large">Arbeidssøker</Heading>

      <Spacer />

      Oppsummering. Du har valgt... Bla bla bla.

      <Spacer />

      <ConfirmationPanel
        checked={state}
        label="Ja, jeg samtykker."
        onChange={() => setState((x) => !x)}
        error={!state && "Du må samtykke før du kan fortsette."}
      >
        For å komme videre må du gi oss lov til å hente inn og bruke opplysninger
        om deg.
      </ConfirmationPanel>

      <Spacer />

      <NavPanel backHref="/steg3" backText="Forrige steg" nextHref="/send" nextText="Send" />

      <CancelButton />
    </main>
  );
}
