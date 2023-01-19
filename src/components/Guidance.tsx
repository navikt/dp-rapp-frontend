import { Accordion, Heading } from "@navikt/ds-react";

export default function Guidance() {
  return (
    <>
      <Heading level="2" size="medium">
        Hva må man rapportere?
      </Heading>
      <p>NAV trenger å vite en del informasjon, blablabla</p>
      <Accordion style={{ width: "100%" }}>
        <Accordion.Item>
          <Accordion.Header>
            <h3>Hva må jeg rapportere som arbeid?</h3>
          </Accordion.Header>
          <Accordion.Content>
            <h4 className="chapter-header navds-heading navds-heading--medium navds-typo--spacing">
              <strong>Arbeid</strong>
            </h4>{" "}
            <ul>
              <li>Alle timer du har jobbet i perioden føres på meldekortet</li>
              <li>
                Timene rundes av til nærmeste halve time, er det midt mellom to
                halve timer, runder du nedover.
              </li>
              <li>
                Inntektsgivende arbeid skal føres i den perioden arbeidet er
                utført, selv om inntekten kommer senere.
              </li>
              <li>
                Får du lønn for flere timer enn du jobbet, skal du føre alle
                timene du får lønn for.
              </li>
            </ul>
            <h4 className="chapter-header navds-heading navds-heading--medium navds-typo--spacing">
              <strong>Utbetalt lunsj</strong>
            </h4>
            <p className="navds-body-long navds-typo--spacing">
              Regnes ikke som arbeid, skal ikke føres på meldekortet.
            </p>{" "}
            <h4 className="navds-body-long navds-typo--spacing">
              <strong>Avspasering</strong>
            </h4>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Føres som om du var på jobb.
            </p>{" "}
            <h4 className="navds-body-long navds-typo--spacing">
              <strong>Hva regnes som arbeid?</strong>
            </h4>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Med «arbeid» mener vi aktivitet som kan gi eller som normalt ville
              ha vært betalt, som for eksempel:
            </p>
            <ul>
              <li className="navds-body-long">arbeid i arbeidsforhold</li>
              <li className="navds-body-long">arbeid i eget foretak</li>
              <li className="navds-body-long">
                gratisarbeid (for andre) når arbeidet vanligvis er betalt
              </li>
              <li className="navds-body-long">
                timer du får betalt for, også når du ikke jobber alle timene
                (for eksempel ved akkordarbeid)
              </li>
              <li className="navds-body-long">
                provisjonssalg, telefonsalg og liknende
              </li>
              <li className="navds-body-long">frilansarbeid</li>
              <li className="navds-body-long">lønnede verv</li>
              <li className="navds-body-long">
                hobbypreget arbeid, «homeparties» og liknende
              </li>
              <li className="navds-body-long">omsorgsstønad</li>
            </ul>
            <h4>
              <strong>Fosterforeldre</strong>
            </h4>
            <ul>
              <li>
                Du skal ikke føre opp timer som fosterforeldre på meldekortet
              </li>
            </ul>
            <h4 className="navds-body-long navds-typo--spacing">
              <strong>Etablere egen virksomhet</strong>
            </h4>
            <p className="navds-body-long navds-typo--spacing">
              Har du fått vedtak om at du kan beholde dagpenger under
              etablering?
            </p>
            <ul>
              <li>Du skal ikke føre timene du jobber i virksomheten</li>
            </ul>
            <p>Har du ikke fått vedtak fra NAV?</p>
            <ul>
              <li>
                Du skal føre alle timene du jobber i virksomheten, selv om du
                ikke tar ut lønn og det går med underskudd.
              </li>
            </ul>
            <h4>
              <strong>Formue og skattefri inntekt</strong>
            </h4>
            <p>
              Du skal ikke føre opp rene inntekter fra formue, det samme gjelder
              enkelte skattefrie inntekter utenfor virksomhet. Eksempler er:
            </p>
            <ul>
              <li>utleie av fast eiendom.</li>
              <li>
                renter, aksjeutbytte og annen avkastning av penger og
                verdipapirer.
              </li>
              <li>skattefri oppussing av egen bolig/fritidsbolig</li>
            </ul>
            <h4 className="navds-body-long navds-typo--spacing">
              <strong>Ulønnet arbeid</strong>
            </h4>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Du skal ikke føre opp enkelte former for ulønnet arbeid på
              meldekortet. Eksempler er
            </p>
            <ul>
              <li className="navds-body-long">
                ulønnet arbeid, sosiale tjenester og besøkstjenester for
                funksjonshemmede og eldre
              </li>
              <li className="navds-body-long">
                arbeid for humanitære organisasjoner, religiøse organisasjoner,
                idrettslag og liknende, for arbeid som normalt utføres av
                medlemmer og frivillige uten godtgjørelse
              </li>
            </ul>
            <h4 className="navds-heading navds-heading--small navds-typo--spacing">
              <strong>Naturalytelser</strong>
            </h4>{" "}
            <ul>
              <li className="navds-body-long navds-typo--spacing">
                Naturalytelser er goder som du mottar fra arbeidsgiveren din,
                som for eksempel telefon eller bil.
              </li>{" "}
              <li className="navds-body-long navds-typo--spacing">
                <strong>For permitterte:</strong> Hvis du har hatt goder i
                mindre enn tre måneder før du ble permittert, regnes summen av
                disse godene som timelønn. Antall timer som godene utgjør skal
                føres som timer med arbeid på meldekortene.
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            Hva må jeg rapportere av tiltak, kurs og utdanning?
          </Accordion.Header>
          <Accordion.Content>
            <h3
              id="chapter-3"
              className="chapter-header navds-heading navds-heading--medium navds-typo--spacing"
            >
              <strong>Spørsmål 2 - Aktivitet/kurs/utdanning</strong>
            </h3>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Hvis du har avtalt med NAV å delta på tiltak, kurs, utdanning
              eller annen aktivitet, skal du svare «ja» og krysse av for de
              dagene du har utført avtalt aktivitet. Les mer om{" "}
              <a
                href="https://www.nav.no/arbeid/utdanning"
                className="LenkeInline_lenkeInline__Rxp_M"
              >
                dagpenger i kombinasjon med utdanning og opplæring.
              </a>
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Hvis du deltar på kurs eller utdanning som ikke er avtalt, skal du
              svare «ja», og krysse av for de dagene du har deltatt. Dette
              gjelder også hvis du «leser» et fag på egenhånd.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Du skal bare melde fra om tiltak, kurs eller utdanning på
              meldekortet. Du skal ikke føre opp andre aktiviteter du har avtalt
              med NAV, slik som informasjonsmøter i regi av NAV og tid til å
              føre aktivitetsplan.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Hvis du ikke har utført en avtalt aktivitet, svarer du «nei». Hvis
              du ikke har avtalt aktivitet med NAV, og heller ikke har deltatt
              på kurs/utdanning, svarer du «nei».
            </p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Hva gjelder for sykdom?</Accordion.Header>
          <Accordion.Content>
            <h3
              id="chapter-4"
              className="chapter-header navds-heading navds-heading--medium navds-typo--spacing"
            >
              <strong>Spørsmål 3 - Sykdomsfravær</strong>
            </h3>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Hvis du på grunn av egen sykdom ikke har vært i stand til å jobbe
              eller delta på tiltak, kurs, utdanning eller jobbintervju, skal du
              svare «ja». Du skal da krysse av for de dagene du ikke har jobbet
              eller utført avtalt aktivitet.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Hvis du ikke har hatt fravær på grunn av sykdom, svarer du «nei».
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Hvis du deltar på tiltak må du i tillegg melde fra til den som er
              ansvarlig for tiltaket.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Du har ikke rett til dagpenger når du er syk, men du kan ha rett
              til sykepenger. Du har ikke egenmeldingsdager når du mottar
              dagpenger, og må derfor be om sykmelding fra første dag du er syk.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              <a
                href="/sykmeldt-og-permittert"
                className="LenkeInline_lenkeInline__Rxp_M"
              >
                Jeg er arbeidsledig eller permittert og blir sykmeldt
              </a>
            </p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            Hvis jeg tar ferie eller har annet fravær?
          </Accordion.Header>
          <Accordion.Content>
            <h3
              id="chapter-5"
              className="chapter-header navds-heading navds-heading--medium navds-typo--spacing"
            >
              <strong>Spørsmål 4 - Ferie og annet fravær</strong>
            </h3>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Du kan som hovedregel oppholde deg hvor du vil i Norge når du
              mottar dagpenger, uten å føre fravær på meldekortet. Er du ikke
              tilgjengelig for jobb eller tiltak på grunn av ferie eller annet
              fravær, må du føre disse dagene som fravær på meldekortet. Gjelder
              fraværet sykdom skal du svare på dette i spørsmål 3.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Deltar du på tiltak må du melde fra til tiltaksarrangør.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Hvis du har fravær vil du få trekk i utbetalingen din. Har du
              opparbeidet deg rett til{" "}
              <a
                href="/no/nav-og-samfunn/kontakt-nav/utbetalinger/snarveier/ferie-og-feriepenger#chapter-6"
                className="LenkeInline_lenkeInline__Rxp_M"
              >
                dagpenger under ferie
              </a>
              , vil du ikke få trekk i utbetalingen din.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Skal du reise bort over lengre tid, må du kontakte NAV. NAV vil da
              vurdere om du fortsatt har rett til dagpenger i fraværsperioden.
            </p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
