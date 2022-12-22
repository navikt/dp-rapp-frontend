import { ConfirmationPanel, Heading } from "@navikt/ds-react";
import Spacer from "./Spacer";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { CommonFormProps } from "../src/pages/form";
import { FormEvent, useState } from "react";

export default function Step4(props: CommonFormProps) {

  const {
    questionConsent,
    setQuestionConsent,
    prevStep,
    send
  } = props;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Validators
  const questionConsentValidated = () => {
    return questionConsent;
  }

  // Check form
  const checkForm = (event: FormEvent) => {
    setIsChecked(true);

    if (questionConsentValidated()) {
      send(event);
    }
  }

  // Render
  return (
    <>
      <Heading level="3" size="large">Arbeidssøker</Heading>

      <Spacer />

      Oppsummering. Du har valgt... Bla bla bla.

      <Spacer />

      <ConfirmationPanel
        label="Ja, jeg samtykker."
        checked={questionConsent}
        onChange={() => setQuestionConsent((x) => !x)}
        error={isChecked && !questionConsentValidated() && "Du må samtykke før du kan fortsette."}
      >
        For å komme videre må du gi oss lov til å hente inn og bruke opplysninger
        om deg.
      </ConfirmationPanel>

      <Spacer />

      <NavPanelWithButtons backText="Forrige steg"
                           backOnClick={prevStep}
                           nextText="Send"
                           nextOnClick={checkForm} />
    </>
  );
}