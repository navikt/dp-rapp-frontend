import { Heading, Radio, RadioGroup } from "@navikt/ds-react";
import NavPanel from "../../components/NavPanel";
import CustomStepper from "../../components/CustomStepper";
import Spacer from "../../components/Spacer";
import Divider from "../../components/Divider";
import { useState } from "react";
import CancelButton from "../../components/CancelButton";

export default function Page() {

  const [val1, setVal1] = useState<boolean | null>(null);

  return (
    <main>
      <Heading level="1" size="xlarge">Dagpenger rapportering</Heading>
      <Heading level="2" size="medium">Uke 49 - 50 (05.12.22 - 18.12.22)</Heading>

      <Divider />

      <CustomStepper numberOfSteps={4} currentStep={3} />

      <Heading level="3" size="large">Arbeidssøker</Heading>

      <Spacer />

      <RadioGroup
        legend="Ønsker du fortsatt å være registrert hos NAV som arbeidssøker de neste 14 dager?"
        description="For å få bistand og/eller ytelser, må du være registrert hos NAV"
        onChange={(val: boolean) => setVal1(val)}
        value={val1}
        error=""
      >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
      </RadioGroup>

      <Spacer />

      <NavPanel backHref="/steg2" backText="Forrige steg" nextHref="/steg4" nextText="Neste steg" />

      <CancelButton />
    </main>
  );
}
