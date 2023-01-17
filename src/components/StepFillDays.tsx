import styles from "./ActivitySelector.module.css";
import { Heading, Panel } from "@navikt/ds-react";
import Spacer from "./Spacer";
import ActivitySelector from "./ActivitySelector";
import Error from "./Error";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { CommonFormProps } from "../pages/form";
import { FormEvent, useState } from "react";
import ActivitySummary from "./ActivitySummary";

export default function StepFillDays(props: CommonFormProps) {
  const {
    startDate,
    endDate,
    savedDates,
    setSavedDates,
    prevStep,
    nextStep,
    showLoader,
  } = props;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Validators
  const savedDatesValidated = () => {
    return Object.keys(savedDates).length > 0;
  };

  // Check form
  const checkForm = (event: FormEvent) => {
    setIsChecked(true);
    nextStep(event);
  };

  // Render
  return (
    <>
      <Heading level="3" size="large">
        Fyll ut aktivitet
      </Heading>

      <Spacer />

      <ActivitySelector
        startDate={startDate}
        endDate={endDate}
        savedDates={savedDates}
        setSavedDates={setSavedDates}
      />
      <Panel className={styles.summary}>
        <ActivitySummary savedDates={savedDates} />
      </Panel>

      <div className={styles.summary}>
        <Error
          showError={isChecked && !savedDatesValidated()}
          error={"Du må velge minst 1 dag"}
        />
      </div>

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
