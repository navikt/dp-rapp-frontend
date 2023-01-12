import { ConfirmationPanel, Heading } from "@navikt/ds-react";
import Spacer from "./Spacer";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { CommonFormProps } from "../pages/form";
import { FormEvent, useState } from "react";

export default function Introduction(props: CommonFormProps) {
  const { nextStep, showLoader } = props;

  const [notShow, setNotShow] = useState<boolean>(false);

  // Check form
  const checkForm = (event: FormEvent) => {
    nextStep(event);
  };

  // Render
  return (
    <>
      <Heading level="3" size="large">
        Introduksjon
      </Heading>
      <p>Slik fyller du ut dagpenger!</p>
      <Spacer />

      <ConfirmationPanel
        checked={notShow}
        label="Ikke vis denne introduksjonen igjen"
        onChange={() => setNotShow((notShow) => !notShow)}
      >
        Her kan du velge å ikke se denne introduksjonen mer
      </ConfirmationPanel>

      <Spacer />

      <NavPanelWithButtons
        nextText="Neste steg"
        nextOnClick={checkForm}
        showLoader={showLoader}
      />
    </>
  );
}
