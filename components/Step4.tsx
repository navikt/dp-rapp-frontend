import { BodyShort, ConfirmationPanel, Heading, Panel } from "@navikt/ds-react";
import Spacer from "./Spacer";
import Error from "./Error";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { CommonFormProps } from "../src/pages/form";
import { FormEvent, useState } from "react";
import { format } from "date-fns";

export default function Step4(props: CommonFormProps) {

  const {
    questionWork,
    questionMeasures,
    questionIllness,
    questionVacation,
    savedDates,
    questionProceed,
    questionConsent,
    setQuestionConsent,
    prevStep,
    send,
    showLoader,
    error
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

  const days = [];
  for (const key in savedDates) {
    const date = format(new Date(+key), "dd.MM.yy");
    const type = savedDates[key].type;
    const hours = type == 'work' ? '(' + savedDates[key].hours + ' t)' : '';
    const str = date + ' ' + type + ' ' + hours;

    days.push(
      <div key={key}>
        {str}
      </div>
    );
  }

  // Render
  return (
    <>
      <Heading level="3" size="large">Arbeidssøker</Heading>

      <Spacer />

      <Panel>
        <Heading spacing level="4" size="small">
          Har du vært i arbeid de siste 14 dager?
        </Heading>
        <BodyShort>
          {questionWork ? 'Ja' : 'Nei'}
        </BodyShort>
      </Panel>
      <Panel>
        <Heading spacing level="4" size="small">
          Har du deltatt på tiltak, kurs eller utdanning?
        </Heading>
        <BodyShort>
          {questionMeasures ? 'Ja' : 'Nei'}
        </BodyShort>
      </Panel>
      <Panel>
        <Heading spacing level="4" size="small">
          Har du vært syk?
        </Heading>
        <BodyShort>
          {questionIllness ? 'Ja' : 'Nei'}
        </BodyShort>
      </Panel>
      <Panel>
        <Heading spacing level="4" size="small">
          Har du hatt ferie eller annet fravær?
        </Heading>
        <BodyShort>
          {questionVacation ? 'Ja' : 'Nei'}
        </BodyShort>
      </Panel>
      <Panel>
        <Heading spacing level="4" size="small">
          Registrerte dager
        </Heading>
        <BodyShort>
          {days}
        </BodyShort>
      </Panel>
      <Panel>
        <Heading spacing level="4" size="small">
          Ønsker du fortsatt å være registrert hos NAV som arbeidssøker de neste 14 dager?
        </Heading>
        <BodyShort>
          {questionProceed ? 'Ja' : 'Nei'}
        </BodyShort>
      </Panel>

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

      <Error showError={!!error} error={error} />

      <NavPanelWithButtons backText="Forrige steg"
                           backOnClick={prevStep}
                           nextText="Send"
                           nextOnClick={checkForm}
                           showLoader={showLoader} />
    </>
  );
}
