import { ConfirmationPanel, Heading } from "@navikt/ds-react";
import Spacer from "./Spacer";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { CommonFormProps } from "../pages/form";
import { FormEvent, useState } from "react";

export default function StepIntroduction(props: CommonFormProps) {
  const { nextStep, showLoader, questionIllness, setQuestionIllness } = props;

  // Check form
  const checkForm = (event: FormEvent) => {
    nextStep(event);
  };
  const isChecked = () => {
    if (questionIllness !== null) {
      return questionIllness;
    }
    return undefined;
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
        checked={isChecked()}
        label="Ikke vis denne introduksjonen igjen"
        onChange={() =>
          setQuestionIllness((questionIllness) => !questionIllness)
        }
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
