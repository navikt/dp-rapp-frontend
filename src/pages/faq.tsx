import { Accordion } from "@navikt/ds-react";
import Menu from "../../components/Menu";
import Spacer from "../../components/Spacer";

export default function Page() {

  return (
    <main>
      <Menu />

      <h1>Ofte stilte spørsmål</h1>

      <Accordion>
        <Accordion.Item>
          <Accordion.Header>Til deg som er mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. NAV kan gjøre unntak.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            Til deg som har yrkesskade eller yrkessykdom
          </Accordion.Header>
          <Accordion.Content>
            Med yrkesskade mener vi at du har fått en skade som følge av en
            arbeidsulykke. Vi kan godkjenne en sykdom som yrkessykdom hvis den
            kommer av skadelig påvirkning fra arbeidsmiljøet.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>

      <Spacer />

    </main>
  );
}
