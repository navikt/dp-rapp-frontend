import { Alert, Heading, Radio, RadioGroup } from "@navikt/ds-react";
import Spacer from "./Spacer";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { CommonFormProps } from "../pages/form";
import { FormEvent, useState } from "react";

export default function Step3(props: CommonFormProps) {

  const {
    questionProceed,
    setQuestionProceed,
    prevStep,
    nextStep,
    showLoader
  } = props;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Validators
  const questionProceedValidated = () => {
    return questionProceed != null;
  }

  // Check form
  const checkForm = (event: FormEvent) => {
    setIsChecked(true);

    if (questionProceedValidated()) {
      nextStep(event);
    }
  }

  // Render
  return (
    <>
      <Heading level="3" size="large">Arbeidssøker</Heading>

      <Spacer />

      <RadioGroup
        legend="Ønsker du fortsatt å være registrert hos NAV som arbeidssøker de neste 14 dager?"
        description="For å få bistand og/eller ytelser, må du være registrert hos NAV"
        value={questionProceed}
        onChange={(val: boolean) => setQuestionProceed(val)}
        error={isChecked && !questionProceedValidated() && "Du må svare på dette spørsmålet"}
      >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
      </RadioGroup>
      {
        questionProceed == false &&
          <Alert variant="warning">
              Hvis du svarer Nei, skal du ikke få penger fra NAV
          </Alert>
      }

      <Spacer />

      <NavPanelWithButtons backText="Forrige steg"
                           backOnClick={prevStep}
                           nextText="Neste steg"
                           nextOnClick={checkForm}
                           showLoader={showLoader} />
    </>
  );
}
