import { Link, Panel } from "@navikt/ds-react";

export default function CancelButton() {
  return (
    <Panel>
      <Link href="/">
        <b>Avbryt</b>
      </Link>
    </Panel>
  );
}
