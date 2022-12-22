import { Heading } from "@navikt/ds-react";
import Divider from "../../components/Divider";
import CustomStepper from "../../components/CustomStepper";
import Spacer from "../../components/Spacer";
import ActivitySelector from "../../components/ActivitySelector";
import NavPanelWithSubmit from "../../components/NavPanelWithSubmit";
import CancelButton from "../../components/CancelButton";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { FormEvent } from "react";

export default function Page() {

  const startDate = new Date(2022, 11, 5);
  const endDate = new Date(2022, 11, 18);

  const startDateStr = format(startDate, "dd.MM.yy");
  const endDateStr = format(endDate, "dd.MM.yy");

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    await router.push('/steg3');
  }

  return (
    <main>
      <Heading level="1" size="xlarge">Dagpenger rapportering</Heading>
      <Heading level="2" size="medium">Uke 49 - 50 ({startDateStr} - {endDateStr})</Heading>

      <Divider />

      <CustomStepper numberOfSteps={4} currentStep={2} />

      <Heading level="3" size="large">Utfylling</Heading>

      <Spacer />

      <form onSubmit={handleSubmit}>
        <ActivitySelector startDate={startDate} endDate={endDate} />

        <Spacer />

        <NavPanelWithSubmit backHref="/steg1" backText="Forrige steg" nextText="Neste steg" />
      </form>

      <CancelButton />
    </main>
  );
}
