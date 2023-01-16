import { BodyShort, ConfirmationPanel, Heading, Panel } from "@navikt/ds-react";
import Spacer from "./Spacer";
import Error from "./Error";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { CommonFormProps } from "../pages/form";
import { FormEvent, useState } from "react";
import { format } from "date-fns";
import { ActivityType } from "../models/Data";
import ActivitySummary from "./ActivitySummary";
import styles from "./StepSummary.module.css";

export default function StepSummary(props: CommonFormProps) {
  const {
    questionWork,
    savedDates,
    questionProceed,
    questionConsent,
    setQuestionConsent,
    prevStep,
    send,
    showLoader,
    error,
  } = props;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Validators
  const questionConsentValidated = () => {
    return questionConsent;
  };

  // Check form
  const checkForm = (event: FormEvent) => {
    setIsChecked(true);

    if (questionConsentValidated()) {
      send(event);
    }
  };

  //todo, oversette activityType til work
  const days = [];
  for (const key in savedDates) {
    const date = format(new Date(+key), "dd.MM.yy");
    const type = savedDates[key].type;
    const hours =
      type == ActivityType.WORK ? "(" + savedDates[key].hours + " t)" : "";
    const str = date + " " + type + " " + hours;

    days.push(<div key={key}>{str}</div>);
  }

  // Render
  return (
    <>
      <Heading level="3" size="large">
        Oppsummering
      </Heading>

      <Spacer />

      <Panel>
        <Heading spacing level="4" size="small">
          Har du vært i aktivitet de siste 14 dager?
        </Heading>
        <BodyShort>{questionWork ? "Ja" : "Nei"}</BodyShort>
      </Panel>
      <Panel className={styles.summary}>
        <ActivitySummary savedDates={savedDates} />
      </Panel>
      <Panel className={styles.summary}>
        <Heading spacing level="4" size="small">
          Ønsker du fortsatt å være registrert hos NAV som arbeidssøker de neste
          14 dager?
        </Heading>
        <BodyShort>{questionProceed ? "Ja" : "Nei"}</BodyShort>
      </Panel>

      <Spacer />

      <ConfirmationPanel
        label="Ja, jeg samtykker."
        checked={questionConsent}
        onChange={() => setQuestionConsent((x) => !x)}
        error={
          isChecked &&
          !questionConsentValidated() &&
          "Du må samtykke før du kan fortsette."
        }
      >
        For å komme videre må du gi oss lov til å hente inn og bruke
        opplysninger om deg.
      </ConfirmationPanel>

      <Spacer />

      <Error showError={!!error} error={error} />

      <NavPanelWithButtons
        backText="Forrige steg"
        backOnClick={prevStep}
        nextText="Send"
        nextOnClick={checkForm}
        showLoader={showLoader}
      />
    </>
  );
}
