import { Heading, Radio, RadioGroup } from "@navikt/ds-react";
import Spacer from "./Spacer";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { CommonFormProps } from "../pages/form";
import { FormEvent, useState } from "react";

export default function Step1(props: CommonFormProps) {
  const {
    questionWork,
    setQuestionWork,
    prevStep,
    nextStep,
    goToSummaryStep,
    showLoader,
  } = props;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Validators
  const questionWorkValidated = () => {
    return questionWork != null;
  };

  // Check form
  const checkForm = (event: FormEvent) => {
    setIsChecked(true);

    if (questionWorkValidated()) {
      if (questionWork) {
        nextStep(event);
      } else {
        goToSummaryStep(event);
      }
    }
  };

  // Render
  return (
    <>
      <Heading level="3" size="large">
        Aktivitet siste 14 dager
      </Heading>

      <Spacer />

      <RadioGroup
        legend="Har du vært i annen aktivitet enn det å være arbeidssøker i løpet av denne perioden?"
        description='Med "aktivitet" mener vi....'
        onChange={(val: boolean) => setQuestionWork(val)}
        value={questionWork}
        error={
          isChecked &&
          !questionWorkValidated() &&
          "Du må svare på dette spørsmålet"
        }
      >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
      </RadioGroup>

      <Spacer />

      <NavPanelWithButtons
        backText="Forrige steg"
        backOnClick={prevStep}
        nextText="Neste steg"
        nextOnClick={checkForm}
        showLoader={showLoader}
      />
    </>
  );
}
