import { BodyLong, ConfirmationPanel, Heading, Panel } from "@navikt/ds-react";
import Spacer from "./Spacer";
import Error from "./Error";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { CommonFormProps } from "../pages/form";
import { FormEvent, useState } from "react";
import { format } from "date-fns";
import { ActivityType } from "../models/Data";
import ActivitySummary from "./ActivitySummary";

export default function StepSummary(props: CommonFormProps) {
  const {
    savedDates,
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

    window.scrollTo(0, 0);
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
        Send inn rapportering:
      </Heading>

      <Spacer />

      <ActivitySummary savedDates={savedDates}>
        <Heading spacing size="medium" level="4">
          Dette er det du har registrert for meldekortperioden:
        </Heading>
      </ActivitySummary>

      <ConfirmationPanel
        label="Jeg bekrefter at jeg har lest og forstått veiledningstekstene"
        checked={questionConsent}
        onChange={() => setQuestionConsent((x) => !x)}
        error={
          isChecked &&
          !questionConsentValidated() &&
          "Du må samtykke før du kan fortsette."
        }
      >
        <p>
          Jeg er kjent med at hvis opplysningene jeg har oppgitt ikke er riktige
          og fullstendige kan jeg miste retten til stønad fra NAV.
        </p>
        <p>
          {" "}
          Jeg er også klar over at jeg må betale tilbake det jeg har fått
          feilaktig utbetalt.
        </p>
      </ConfirmationPanel>

      <Spacer />

      <Error showError={!!error} error={error} />

      <NavPanelWithButtons
        backText="Forrige steg"
        backOnClick={prevStep}
        nextText="Send inn"
        nextOnClick={checkForm}
        showLoader={showLoader}
      />
    </>
  );
}
