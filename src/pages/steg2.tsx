import { Heading } from "@navikt/ds-react";
import NavPanel from "../../components/NavPanel";
import CustomStepper from "../../components/CustomStepper";
import Spacer from "../../components/Spacer";
import Divider from "../../components/Divider";
import CancelButton from "../../components/CancelButton";
import ActivitySelector from "../../components/ActivitySelector";
import { format } from "date-fns";

export default function Page() {

  const startDate = new Date(2022, 11, 5);
  const endDate = new Date(2022, 11, 18);

  const startDateStr = format(startDate, "dd.MM.yy");
  const endDateStr = format(endDate, "dd.MM.yy");

  return (
    <main>
      <Heading level="1" size="xlarge">Dagpenger rapportering</Heading>
      <Heading level="2" size="medium">Uke 49 - 50 ({startDateStr} - {endDateStr})</Heading>

      <Divider />

      <CustomStepper numberOfSteps={4} currentStep={2} />

      <Heading level="3" size="large">Utfylling</Heading>

      <Spacer />

      <ActivitySelector startDate={startDate} endDate={endDate} />

      <Spacer />

      <div>Sammenlagt for meldeperioden:</div>

      <Spacer />

      <NavPanel backHref="/steg1" backText="Forrige steg" nextHref="/steg3" nextText="Neste steg" />

      <CancelButton />
    </main>
  );
}
