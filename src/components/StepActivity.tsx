import { Radio, RadioGroup } from "@navikt/ds-react";
import Spacer from "./Spacer";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { CommonFormProps, MeldekortState } from "../pages/form";
import { FormEvent, useState } from "react";

export default function StepActivity(props: CommonFormProps) {
  const {
    questionWork,
    setQuestionWork,
    prevStep,
    nextStep,
    showLoader,
    calculateStep,
    mockKlarForInnsending,
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
      nextStep(event);
    }
  };
  const nesteKnapp = () => {
    return calculateStep() === 4 ? "SEND INN" : "GÅ VIDERE";
  };
  const nesteKnappDisabled = () => {
    return (
      calculateStep() === 4 &&
      mockKlarForInnsending === MeldekortState.IKKE_KLAR
    );
  };

  // Render
  //todo: må ha en punktliste i description der, flytte det ut fra komponenten og heller bruke label for elns
  return (
    <>
      <RadioGroup
        legend="Aktivitet siste 14 dager"
        description="Har du i løpet av denne perioden: arbeidet, tatt utdanning, hatt fravær eller vært i utlandet, vært syk"
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
        nextText={nesteKnapp()}
        nextDisabled={nesteKnappDisabled()}
        nextOnClick={checkForm}
        showLoader={showLoader}
      />
    </>
  );
}
