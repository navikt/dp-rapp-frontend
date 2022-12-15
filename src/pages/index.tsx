import { Button, GuidePanel, Heading, Panel, Stepper } from "@navikt/ds-react";
import { Back, Next } from "@navikt/ds-icons";
import { useState } from "react";
import Link from "next/link";
import NavPanel from "../../components/NavPanel";

export default function Page() {
  const kallApi = () =>
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => console.log(data));
  const kallRappApi = () =>
    fetch("/api/rapp").then((response) => console.log(response));

  const [activeStep, setActiveStep] = useState(1);

  return (
    <main>
      <Heading level="1" size="xlarge">Hello, Next.js!</Heading>

      <Panel>
        <Button onClick={() => kallApi()}> kall hello api </Button>
        <Button onClick={() => kallRappApi()}> kall dp-rapp-api </Button>
      </Panel>

      <GuidePanel poster>
        About
      </GuidePanel>

      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={activeStep}
        onStepChange={(x) => setActiveStep(x)}
      >
        <Stepper.Step href="#">Start søknad</Stepper.Step>
        <Stepper.Step href="#">Saksopplysninger</Stepper.Step>
        <Stepper.Step href="#">Vedlegg</Stepper.Step>
        <Stepper.Step href="#">Oppsummering</Stepper.Step>
        <Stepper.Step href="#">Innsending</Stepper.Step>
      </Stepper>

      <Panel border className="navds-date__caption">
        <Link href="/" passHref>
          <Button icon={<Back aria-hidden />} variant="secondary">
            Tilbake
          </Button>
        </Link>
        <Link href="/page1" passHref>
          <Button icon={<Next aria-hidden />} iconPosition="right">
            Neste
          </Button>
        </Link>
      </Panel>

      <NavPanel nextHref="/page1" />
    </main>
  );
}
