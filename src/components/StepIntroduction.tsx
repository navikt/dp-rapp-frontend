import { BodyShort, ConfirmationPanel, Heading, Panel } from "@navikt/ds-react";
import Spacer from "./Spacer";
import NavPanelWithButtons from "./NavPanelWithButtons";
import { CommonFormProps } from "../pages/form";
import { FormEvent } from "react";
import { Calender } from "@navikt/ds-icons";

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
        Velkommen til dagpengerapportering <Calender />
      </Heading>
      <Panel>
        <Heading spacing level="4" size="small">
          Hvorfor må man rapportere?
        </Heading>
        <BodyShort>
          <ul>
            <li>
              Du må rapportere slik at vi kan utbetale riktig sum med penger.
            </li>
            <li>
              Du må opprettholde meldeplikten din som mottaker av dagpenger.
            </li>
          </ul>
        </BodyShort>
      </Panel>
      <Panel>
        <Heading spacing level="4" size="small">
          Hva må man rapportere?
        </Heading>
        <BodyShort>
          NAV trenger å vite en del informasjon, så det er viktig at man går inn
          og leser seg opp på hva man skal rapportere. Mer info om hva og
          hvordan finner man nederst på siden hvor man rapporterer
          <p>Kort sagt så skal man rapportere:</p>
          <ul>
            <li>Timer man har arbeidet</li>
            <li>Tiltak, kurs og utdanning</li>
            <li>Sykdom</li>
            <li>Ferie og annet fravær</li>
          </ul>
        </BodyShort>
      </Panel>
      <Panel>
        <Heading spacing level="4" size="small">
          Hvordan rapporterer man?
        </Heading>
        <BodyShort>
          <ul>
            <li>
              Du rapporterer for to uker av gangen og sender rapporteringen til
              NAV i slutten av perioden.
            </li>
            <li>
              Du kan når som helst logge inn og legge til aktivitet slik at du
              slipper å huske to uker tilbake i tid.
            </li>
            <li>
              Alt som skal rapporteres gjør man i kalenderen. Da trykker man på
              datoen det gjelder og legger inn den aktiviteten man har gjort.
            </li>
            <li>
              Har man kunn vært arbeidssøker og ikke gjort andre aktiviteter i
              perioden trenger man ikke føre noe i kalenderen.
            </li>
            <li>
              Når det er åpnet for å sende rapporteringen i slutten av perioden
              vil du få mulighet til å sende rapporteringen.
            </li>
          </ul>
        </BodyShort>
      </Panel>
      <Panel>
        <BodyShort>
          Husk å sjekke ut informasjonen nederst på rapporteringssiden for hva
          man skal rapportere! :)
        </BodyShort>
      </Panel>

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
