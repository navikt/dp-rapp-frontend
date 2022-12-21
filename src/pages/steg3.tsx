import { Heading, Radio, RadioGroup } from "@navikt/ds-react";
import Divider from "../../components/Divider";
import CustomStepper from "../../components/CustomStepper";
import Spacer from "../../components/Spacer";
import NavPanelWithSubmit from "../../components/NavPanelWithSubmit";
import CancelButton from "../../components/CancelButton";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export default function Page() {

  const [check, setCheck] = useState<boolean>(false);
  const [val5, setVal5] = useState<boolean | null>(null);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    setCheck(true);

    if (val5 == undefined) {
      return false;
    }

    const data = {
      sp5: val5,
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

    await router.push('/steg4');
  }

  return (
    <main>
      <Heading level="1" size="xlarge">Dagpenger rapportering</Heading>
      <Heading level="2" size="medium">Uke 49 - 50 (05.12.22 - 18.12.22)</Heading>

      <Divider />

      <CustomStepper numberOfSteps={4} currentStep={3} />

      <Heading level="3" size="large">Arbeidssøker</Heading>

      <Spacer />

      <form onSubmit={handleSubmit}>
        <RadioGroup
          legend="Ønsker du fortsatt å være registrert hos NAV som arbeidssøker de neste 14 dager?"
          description="For å få bistand og/eller ytelser, må du være registrert hos NAV"
          onChange={(val: boolean) => setVal5(val)}
          value={val5}
          error={check && val5 == undefined && "Du må svare på dette spørsmålet"}
        >
          <Radio value={true}>Ja</Radio>
          <Radio value={false}>Nei</Radio>
        </RadioGroup>

        <Spacer />

        <NavPanelWithSubmit backHref="/steg2" backText="Forrige steg" nextText="Neste steg" />
      </form>

      <CancelButton />
    </main>
  );
}
