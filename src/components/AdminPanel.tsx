import { BodyShort, Button, Panel } from "@navikt/ds-react";
import { CommonFormProps } from "../pages/form";
import { MeldekortState } from "../models/Data";

export default function AdminPanel(props: CommonFormProps) {
  const { mockKlarForInnsending, setMockKlarForInnsending } = props;
  return (
    <Panel>
      <strong>ADMINPANEL</strong>
      <BodyShort>
        Her kan du sette forskjellige states på meldekortet. <br />
        Current state: {mockKlarForInnsending}
      </BodyShort>
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
    </Panel>
  );
}
