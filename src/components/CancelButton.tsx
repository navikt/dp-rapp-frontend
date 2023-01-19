import { Panel } from "@navikt/ds-react";
import Link from "next/link";

export default function CancelButton() {
  return (
    <Panel>
      <Link href="/">
        <b>Fortsett senere</b>
      </Link>
    </Panel>
  );
}
