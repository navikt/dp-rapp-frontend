import { Heading, Radio, RadioGroup } from "@navikt/ds-react";
import Divider from "../../components/Divider";
import CustomStepper from "../../components/CustomStepper";
import Spacer from "../../components/Spacer";
import NavPanelWithSubmit from "../../components/NavPanelWithSubmit";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export default function Page() {

  const [check, setCheck] = useState<boolean>(false);
  const [val1, setVal1] = useState<boolean | null>(null);
  const [val2, setVal2] = useState<boolean | null>(null);
  const [val3, setVal3] = useState<boolean | null>(null);
  const [val4, setVal4] = useState<boolean | null>(null);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    setCheck(true);

    if (
      val1 == undefined
      || val2 == undefined
      || val3 == undefined
      || val4 == undefined
    ) {
      return false;
    }

    const data = {
      sp1: val1,
      sp2: val2,
      sp3: val3,
      sp4: val4,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/form'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // const result = await response.json()

    console.log(response.ok);

    await router.push('/steg2');
  }

  return (
    <main>
      <Heading level="1" size="xlarge">Dagpenger rapportering</Heading>
      <Heading level="2" size="medium">Uke 49 - 50 (05.12.22 - 18.12.22)</Heading>

      <Divider />

      <CustomStepper numberOfSteps={4} currentStep={1} />

      <Heading level="3" size="large">Aktivitet siste 14 dager</Heading>

      <Spacer />

      <form onSubmit={handleSubmit}>
        <RadioGroup
          legend="Har du vært i arbeid de siste 14 dager?"
          description="Med &quot;arbeid&quot; mener vi aktivitet som kan gi inntekt eller som normalt ville ha vært betalt"
          onChange={(val: boolean) => setVal1(val)}
          value={val1}
          error={check && val1 == undefined && "Du må svare på dette spørsmålet"}
        >
          <Radio value={true}>Ja</Radio>
          <Radio value={false}>Nei</Radio>
        </RadioGroup>

        <Spacer />

        <RadioGroup
          legend="Har du deltatt på tiltak, kurs eller utdanning?"
          description="Med &quot;tiltak&quot; mener vi aktivitet som kan gi..."
          onChange={(val: boolean) => setVal2(val)}
          value={val2}
          error={check && val2 == undefined && "Du må svare på dette spørsmålet"}
        >
          <Radio value={true}>Ja</Radio>
          <Radio value={false}>Nei</Radio>
        </RadioGroup>

        <Spacer />

        <RadioGroup
          legend="Har du vært syk?"
          description="Har du vært forhindret fra å ta arbeid, delta på tiltak eller være arbeidssøker fordi du har vært syk?"
          onChange={(val: boolean) => setVal3(val)}
          value={val3}
          error={check && val3 == undefined && "Du må svare på dette spørsmålet"}
        >
          <Radio value={true}>Ja</Radio>
          <Radio value={false}>Nei</Radio>
        </RadioGroup>

        <Spacer />

        <RadioGroup
          legend="Har du hatt ferie eller annet fravær?"
          description="Har du hatt ferie eller annet fravær slik at du ikke har kunnet ta arbeid, delta på tiltak eller være arbeidssøker?"
          onChange={(val: boolean) => setVal4(val)}
          value={val4}
          error={check && val4 == undefined && "Du må svare på dette spørsmålet"}
        >
          <Radio value={true}>Ja</Radio>
          <Radio value={false}>Nei</Radio>
        </RadioGroup>

        <Spacer />

        <NavPanelWithSubmit backHref="/" backText="Avbryt" nextText="Neste steg" />
      </form>
    </main>
  );
}
