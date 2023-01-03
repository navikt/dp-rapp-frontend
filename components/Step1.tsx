import { Heading, Radio, RadioGroup } from "@navikt/ds-react";
import Spacer from "./Spacer";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { CommonFormProps } from "../src/pages/form";
import { FormEvent, useState } from "react";

export default function Step1(props: CommonFormProps) {

  const {
    questionWork,
    setQuestionWork,
    questionMeasures,
    setQuestionMeasures,
    questionIllness,
    setQuestionIllness,
    questionVacation,
    setQuestionVacation,
    nextStep,
    showLoader
  } = props;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Validators
  const questionWorkValidated = () => {
    return questionWork != null;
  }
  const questionMeasuresValidated = () => {
    return questionMeasures != null;
  }
  const questionIllnessValidated = () => {
    return questionIllness != null;
  }
  const questionVacationValidated = () => {
    return questionVacation != null;
  }

  // Check form
  const checkForm = (event: FormEvent) => {
    setIsChecked(true);

    if (questionWorkValidated() &&
      questionMeasuresValidated() &&
      questionIllnessValidated() &&
      questionVacationValidated()) {
      nextStep(event);
    }
  }

  // Render
  return (
    <>
      <Heading level="3" size="large">Aktivitet siste 14 dager</Heading>

      <Spacer />

      <RadioGroup
        legend="Har du vært i arbeid de siste 14 dager?"
        description="Med &quot;arbeid&quot; mener vi aktivitet som kan gi inntekt eller som normalt ville ha vært betalt"
        onChange={(val: boolean) => setQuestionWork(val)}
        value={questionWork}
        error={isChecked && !questionWorkValidated() && "Du må svare på dette spørsmålet"}
      >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
      </RadioGroup>

      <Spacer />

      <RadioGroup
        legend="Har du deltatt på tiltak, kurs eller utdanning?"
        description="Med &quot;tiltak&quot; mener vi aktivitet som kan gi..."
        onChange={(val: boolean) => setQuestionMeasures(val)}
        value={questionMeasures}
        error={isChecked && !questionMeasuresValidated() && "Du må svare på dette spørsmålet"}
      >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
      </RadioGroup>

      <Spacer />

      <RadioGroup
        legend="Har du vært syk?"
        description="Har du vært forhindret fra å ta arbeid, delta på tiltak eller være arbeidssøker fordi du har vært syk?"
        onChange={(val: boolean) => setQuestionIllness(val)}
        value={questionIllness}
        error={isChecked && !questionIllnessValidated() && "Du må svare på dette spørsmålet"}
      >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
      </RadioGroup>

      <Spacer />

      <RadioGroup
        legend="Har du hatt ferie eller annet fravær?"
        description="Har du hatt ferie eller annet fravær slik at du ikke har kunnet ta arbeid, delta på tiltak eller være arbeidssøker?"
        onChange={(val: boolean) => setQuestionVacation(val)}
        value={questionVacation}
        error={isChecked && !questionVacationValidated() && "Du må svare på dette spørsmålet"}
      >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
      </RadioGroup>

      <Spacer />

      <NavPanelWithButtons nextText="Neste steg" nextOnClick={checkForm} showLoader={showLoader} />
    </>
  );
}
