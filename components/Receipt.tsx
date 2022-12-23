import { Alert, Heading } from "@navikt/ds-react";
import Spacer from "./Spacer";
import NavPanel from "./NavPanel";

export default function Receipt() {

  return (
    <>
      <Heading level="3" size="large">Kvittering</Heading>

      <Spacer />

      <Alert variant="success">Data har blitt lagret</Alert>

      <Spacer />

      <NavPanel nextHref="/" nextText="Til oversikt" />
    </>
  );
}
