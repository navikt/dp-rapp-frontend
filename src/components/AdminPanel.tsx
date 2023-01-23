import { Accordion, BodyShort, Button, Panel } from "@navikt/ds-react";
import { CommonFormProps } from "../pages/form";
import { MeldekortState } from "../models/Data";

export default function AdminPanel(props: CommonFormProps) {
  const { mockKlarForInnsending, setMockKlarForInnsending } = props;
  return (
    <Accordion style={{ width: "100%" }}>
      <Accordion.Item>
        <Accordion.Header>Adminpanel</Accordion.Header>
        <Accordion.Content>
          <BodyShort>
            Her kan du sette forskjellige states på meldekortet. <br />
            Current state: {mockKlarForInnsending}
          </BodyShort>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => setMockKlarForInnsending(MeldekortState.KLAR)}
            >
              Kan sende inn
            </Button>
            <Button
              variant="secondary"
              onClick={() => setMockKlarForInnsending(MeldekortState.IKKE_KLAR)}
            >
              Kan ikke sende inn
            </Button>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
