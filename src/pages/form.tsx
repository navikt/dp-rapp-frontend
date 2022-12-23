import { Heading } from "@navikt/ds-react";
import Divider from "../../components/Divider";
import CustomStepper from "../../components/CustomStepper";
import Step1 from "../../components/Step1";
import Step2 from "../../components/Step2";
import Step3 from "../../components/Step3";
import Step4 from "../../components/Step4";
import CancelButton from "../../components/CancelButton";
import { format } from "date-fns";
import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";

export type CommonFormProps = {
  startDate: Date;
  endDate: Date;
  questionWork: boolean | null;
  setQuestionWork: Dispatch<SetStateAction<boolean | null>>;
  questionMeasures: boolean | null;
  setQuestionMeasures: Dispatch<SetStateAction<boolean | null>>;
  questionIllness: boolean | null;
  setQuestionIllness: Dispatch<SetStateAction<boolean | null>>;
  questionVacation: boolean | null;
  setQuestionVacation: Dispatch<SetStateAction<boolean | null>>;
  savedDates: {
    [key: number]: { type: string, hours: number };
  };
  setSavedDates: Dispatch<SetStateAction<{ [p: number]: { type: string, hours: number } }>>;
  questionProceed: boolean | null;
  setQuestionProceed: Dispatch<SetStateAction<boolean | null>>;
  questionConsent: boolean;
  setQuestionConsent: Dispatch<SetStateAction<boolean>>;
  prevStep: FormEventHandler;
  nextStep: FormEventHandler;
  send: FormEventHandler;
}

export default function Page() {

  const startDate = new Date(2022, 11, 5);
  const endDate = new Date(2022, 11, 18);

  const startDateStr = format(startDate, "dd.MM.yy");
  const endDateStr = format(endDate, "dd.MM.yy");

  const maxStep = 4;

  const [currentStep, setCurrentStep] = useState(1);
  const [questionWork, setQuestionWork] = useState<boolean | null>(null);
  const [questionMeasures, setQuestionMeasures] = useState<boolean | null>(null);
  const [questionIllness, setQuestionIllness] = useState<boolean | null>(null);
  const [questionVacation, setQuestionVacation] = useState<boolean | null>(null);
  const [savedDates, setSavedDates] = useState<{ [key: number]: { type: string, hours: number } }>({});
  const [questionProceed, setQuestionProceed] = useState<boolean | null>(null);
  const [questionConsent, setQuestionConsent] = useState<boolean>(false);

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextStep = () => {
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const send = () => {
    const dates = [];

    for (const key in savedDates) {
      dates.push({
        date: new Date(+key),
        type: savedDates[key].type,
        hours: savedDates[key].hours,
      });
    }

    const data = {
      questionWork,
      questionMeasures,
      questionIllness,
      questionVacation,
      dates,
      questionProceed
    }

    console.log(data);
  }

  const commonFormProps: CommonFormProps = {
    startDate,
    endDate,
    questionWork,
    setQuestionWork,
    questionMeasures,
    setQuestionMeasures,
    questionIllness,
    setQuestionIllness,
    questionVacation,
    setQuestionVacation,
    savedDates,
    setSavedDates,
    questionProceed,
    setQuestionProceed,
    questionConsent,
    setQuestionConsent,
    prevStep,
    nextStep,
    send
  }

  return (
    <main>
      <Heading level="1" size="xlarge">Dagpenger rapportering</Heading>
      <Heading level="2" size="medium">Uke 49 - 50 ({startDateStr} - {endDateStr})</Heading>

      <Divider />

      <CustomStepper numberOfSteps={maxStep} currentStep={currentStep} />

      {currentStep == 1 && <Step1 {...commonFormProps} />}
      {currentStep == 2 && <Step2 {...commonFormProps} />}
      {currentStep == 3 && <Step3 {...commonFormProps} />}
      {currentStep == 4 && <Step4 {...commonFormProps} />}

      <CancelButton />
    </main>
  );
}
