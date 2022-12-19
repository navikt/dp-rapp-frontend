import { Heading, Radio, RadioGroup } from "@navikt/ds-react";
import NavPanel from "../../components/NavPanel";
import CustomStepper from "../../components/CustomStepper";
import { useState } from "react";

export default function Page() {

  const [val1, setVal1] = useState<boolean | null>(null);
  const [val2, setVal2] = useState<boolean | null>(null);
  const [val3, setVal3] = useState<boolean | null>(null);
  const [val4, setVal4] = useState<boolean | null>(null);

  return (
    <main>
      <Heading level="1" size="xlarge">Dagpenger rapportering</Heading>
      <Heading level="2" size="medium">Uke 49 - 50 (05.12.22 - 18.12.22)</Heading>

      <div className="divider" />

      <CustomStepper numberOfSteps={4} currentStep={1} />

      <Heading level="3" size="large">Aktivitet siste 14 dager</Heading>

      <div className="spacer10" />

      <RadioGroup
        legend="Har du vært i arbeid de siste 14 dager?"
        description="Med &quot;arbeid&quot; mener vi aktivitet som kan gi inntekt eller som normalt ville ha vært betalt"
        onChange={(val: boolean) => setVal1(val)}
        value={val1}
        error="Du må svare på dette spørsmålet"
      >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
      </RadioGroup>

      <div className="spacer10" />

      <RadioGroup
        legend="Har du deltatt på tiltak, kurs eller utdanning?"
        description="Med &quot;tiltak&quot; mener vi aktivitet som kan gi..."
        onChange={(val: boolean) => setVal2(val)}
        value={val2}
      >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
      </RadioGroup>

      <div className="spacer10" />

      <RadioGroup
        legend="Har du vært syk?"
        description="Har du vært forhindret fra å ta arbeid, delta på tiltak eller være arbeidssøker fordi du har vært syk?"
        onChange={(val: boolean) => setVal3(val)}
        value={val3}
      >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
      </RadioGroup>

      <div className="spacer10" />

      <RadioGroup
        legend="Har du hatt ferie eller annet fravær?"
        description="Har du hatt ferie eller annet fravær slik at du ikke har kunnet ta arbeid, delta på tiltak eller være arbeidssøker?"
        onChange={(val: boolean) => setVal4(val)}
        value={val4}
      >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
      </RadioGroup>

      <div className="spacer10" />

      <NavPanel nextHref="/page1" nextText="Neste" />
    </main>
  );
}
