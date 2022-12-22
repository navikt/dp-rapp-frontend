import { ConfirmationPanel, Heading } from "@navikt/ds-react";
import Divider from "../../components/Divider";
import CustomStepper from "../../components/CustomStepper";
import Spacer from "../../components/Spacer";
import NavPanelWithSubmit from "../../components/NavPanelWithSubmit";
import CancelButton from "../../components/CancelButton";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export default function Page() {

  const [check, setCheck] = useState<boolean>(false);
  const [val6, setVal6] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    setCheck(true);

    if (!val6) {
      return false;
    }

    const data = {
      sp6: val6,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = '/api/form';

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
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // const result = await response.json();

    console.log(response.ok);

    await router.push('/');
  }

  return (
    <main>
      <Heading level="1" size="xlarge">Dagpenger rapportering</Heading>
      <Heading level="2" size="medium">Uke 49 - 50 (05.12.22 - 18.12.22)</Heading>

      <Divider />

      <CustomStepper numberOfSteps={4} currentStep={4} />

      <Heading level="3" size="large">Arbeidssøker</Heading>

      <Spacer />

      Oppsummering. Du har valgt... Bla bla bla.

      <Spacer />

      <form onSubmit={handleSubmit}>
        <ConfirmationPanel
          checked={val6}
          label="Ja, jeg samtykker."
          onChange={() => setVal6((x) => !x)}
          error={check && !val6 && "Du må samtykke før du kan fortsette."}
        >
          For å komme videre må du gi oss lov til å hente inn og bruke opplysninger
          om deg.
        </ConfirmationPanel>

        <Spacer />

        <NavPanelWithSubmit backHref="/steg3" backText="Forrige steg" nextText="Neste steg" />
      </form>

      <CancelButton />
    </main>
  );
}
