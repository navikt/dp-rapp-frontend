import styles from "./ActivitySelector.module.css";
import { Alert, Heading } from "@navikt/ds-react";
import Spacer from "./Spacer";
import ActivitySelector from "./ActivitySelector";
import { CommonFormProps } from "../src/pages/form";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { FormEvent, useState } from "react";

export default function Step2(props: CommonFormProps) {

  const { startDate, endDate, savedDates, setSavedDates, prevStep, nextStep } = props;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Validators
  const savedDatesValidated = () => {
    return Object.keys(savedDates).length > 0;
  }

  // Check form
  const checkForm = (event: FormEvent) => {
    setIsChecked(true);

    if (savedDatesValidated()) {
      nextStep(event);
    }
  }

  // Render
  return (
    <>
      <Heading level="3" size="large">Utfylling</Heading>

      <Spacer />

      <ActivitySelector startDate={startDate} endDate={endDate} savedDates={savedDates} setSavedDates={setSavedDates} />

      <div className={styles.summary}>
        {isChecked && !savedDatesValidated() && <Alert variant="error">Du må velge minst 1 dag</Alert>}
      </div>

      <Spacer />

      <NavPanelWithButtons backText="Forrige steg"
                           backOnClick={prevStep}
                           nextText="Neste steg"
                           nextOnClick={checkForm} />
    </>
  );
}
