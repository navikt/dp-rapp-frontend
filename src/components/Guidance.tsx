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
          <Accordion.Header>Hva må jeg rapportere som arbeid?</Accordion.Header>
          <Accordion.Content>
            <h3
              id="chapter-2"
              className="chapter-header navds-heading navds-heading--medium navds-typo--spacing"
            >
              <strong>Spørsmål 1 - Arbeid</strong>
            </h3>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Hvis du har vært i arbeid i perioden meldekortet gjelder for, må
              du oppgi alle timene du har arbeidet hver dag. Dette gjelder alle
              dager i uken, også lørdag og søndag, uansett når på døgnet du
              jobber.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              En time i arbeid skal føres som en time på meldekortet. Hvis du
              ikke jobber nøyaktig hele eller halve timer, runder du av til
              nærmeste halve time. Er det like langt til begge alternativer
              runder du av nedover, ikke oppover.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Som hovedregel skal du alltid oppgi det antall timer du faktisk
              arbeider. Hvis du mottar dagpenger oppgir du både lønnet og
              ulønnet arbeid. Inntektsgivende arbeid skal føres i den perioden
              arbeidet har blitt utført, selv om inntekten først kommer senere.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Hvis du får lønn for flere timer enn du faktisk har jobbet, skal
              du føre alle timene du får lønn for. Dette gjelder også om
              arbeidsgiveren din velger å betale kompensasjon for tapt lønn når
              du er permittert.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              <strong>Ubetalt lunsj</strong>
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Ubetalt lunsjpause regnes ikke som arbeid, og du skal ikke føre
              dette på meldekortet. Du skal føre betalt lunsjpause som arbeid på
              meldekortet.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              <strong>Avspasering</strong>
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Avspasering føres som om du var på jobb.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              <strong>Hva regnes som arbeid?</strong>
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Med «arbeid» mener vi aktivitet som kan gi eller som normalt ville
              ha vært betalt, som for eksempel:
            </p>
            <ul>
              <li className="navds-body-long">
                arbeid i vanlige arbeidsforhold (som lønnstaker)
              </li>
              <li className="navds-body-long">
                arbeid i eget foretak (det har ikke noe å si om du har
                registrert foretaket som ENK, ANS, AS, NUF eller noe annet)
              </li>
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
            <p className="navds-body-long navds-typo--spacing">
              <strong>Lønnspliktperiode</strong>
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Hvis du er 100 prosent permittert skal du ikke føre timer på
              meldekortet de dagene du får lønn fra arbeidsgiveren din i
              arbeidsgivers lønnspliktperiode. Er du delvis permittert, skal du
              føre de timene du faktisk jobber.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Mottar du allerede dagpenger når du blir permittert skal du føre
              timer for de dagene du får lønn av arbeidsgiveren din. Dette
              kalles arbeidsgivers lønnspliktperiode.{" "}
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              <strong>Fosterforeldre</strong>
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Du skal ikke føre opp timer som fosterforeldre på meldekortet.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              <strong>Etablere egen virksomhet</strong>
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Har du fått vedtak fra NAV om at du kan beholde{" "}
              <a
                href="https://www.nav.no/arbeid/no/dagpenger/#onsker-du-a-etablere-egen-virksomhet"
                className="LenkeInline_lenkeInline__Rxp_M"
              >
                dagpenger mens du etablerer egen virksomhet
              </a>
              , skal du ikke føre på de timene du jobber i virksomheten på
              meldekortet. Har du ikke fått vedtak fra NAV om at du kan beholde
              dagpenger mens du etablerer egen virksomhet, skal du føre på alle
              timer du jobber på meldekortet. Dette gjelder selv om du ikke tar
              ut lønn eller om virksomheten går med underskudd.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              <strong>Formue og skattefri inntekt</strong>
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Du skal ikke føre opp rene inntekter fra formue, det samme gjelder
              enkelte skattefrie inntekter på meldekortet. Eksempler er:
            </p>
            <ul>
              <li className="navds-body-long">
                utleie av fast eiendom utenfor virksomhet
              </li>
              <li className="navds-body-long">
                renter, aksjeutbytte og annen avkastning av penger og
                verdipapirer utenfor virksomhet
              </li>
              <li className="navds-body-long">
                skattefri oppussing av egen bolig/fritidsbolig
              </li>
            </ul>
            <p className="navds-body-long navds-typo--spacing">
              <strong>Ulønnet arbeid</strong>
            </p>{" "}
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
              Naturalytelser
            </h4>{" "}
            <p className="navds-body-long navds-typo--spacing">
              Naturalytelser er goder som du mottar fra arbeidsgiveren din, som
              for eksempel telefon eller bil.
            </p>{" "}
            <p className="navds-body-long navds-typo--spacing">
              <strong>For permitterte:</strong> Hvis du har hatt goder i mindre
              enn tre måneder før du ble permittert, regnes summen av disse
              godene som timelønn. Antall timer som godene utgjør skal føres som
              timer med arbeid på meldekortene.
            </p>
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