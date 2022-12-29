import { Heading } from "@navikt/ds-react";
import Divider from "../../components/Divider";
import CustomStepper from "../../components/CustomStepper";
import Step1 from "../../components/Step1";
import Step2 from "../../components/Step2";
import Step3 from "../../components/Step3";
import Step4 from "../../components/Step4";
import Receipt from "../../components/Receipt";
import CancelButton from "../../components/CancelButton";
import { format, getISOWeek } from "date-fns";
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
  showLoader: boolean;
  error: string;
}

export default function Page() {

  // JavaScript Dates are internally in UTC
  // We have to add time (12:00) so as the date itself is not changed when converted from/to CET
  const startDate = new Date(2022, 11, 5, 12, 0);
  const endDate = new Date(2022, 11, 18, 12, 0);

  const startDateStr = format(startDate, "dd.MM.yy");
  const endDateStr = format(endDate, "dd.MM.yy");

  const maxStep = 4;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [questionWork, setQuestionWork] = useState<boolean | null>(null);
  const [questionMeasures, setQuestionMeasures] = useState<boolean | null>(null);
  const [questionIllness, setQuestionIllness] = useState<boolean | null>(null);
  const [questionVacation, setQuestionVacation] = useState<boolean | null>(null);
  const [savedDates, setSavedDates] = useState<{ [key: number]: { type: string, hours: number } }>({});
  const [questionProceed, setQuestionProceed] = useState<boolean | null>(null);
  const [questionConsent, setQuestionConsent] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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

  const send = async () => {
    // Reset error
    setError('');

    // Show loader
    setShowLoader(true);

    // Prepare dates
    const days = [];
    for (const key in savedDates) {
      days.push({
        date: new Date(+key),
        type: savedDates[key].type,
        hours: savedDates[key].hours,
      });
    }

    // Collect data in one object
    const data = {
      questionWork,
      questionMeasures,
      questionIllness,
      questionVacation,
      days,
      questionProceed
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = '/api/save';

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

    if (response.ok) {
      // Get the response data from server as JSON.
      // const result = await response.json();
      setCurrentStep(currentStep + 1);
      setShowReceipt(true);
    } else {
      setError('Feil i vårt baksystem. Prøv senere');
    }

    // Hide loader
    setShowLoader(false);
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
    send,
    showLoader,
    error
  }

  return (
    <main>
      <Heading level="1" size="xlarge">Dagpenger rapportering</Heading>
      <Heading level="2" size="medium">Uke {getISOWeek(startDate)} - {getISOWeek(endDate)} ({startDateStr} - {endDateStr})</Heading>

      <Divider />

      {!showReceipt && <CustomStepper numberOfSteps={maxStep} currentStep={currentStep} />}

      {currentStep == 1 && <Step1 {...commonFormProps} />}
      {currentStep == 2 && <Step2 {...commonFormProps} />}
      {currentStep == 3 && <Step3 {...commonFormProps} />}
      {currentStep == 4 && <Step4 {...commonFormProps} />}
      {showReceipt && <Receipt />}

      {!showReceipt && <CancelButton />}
    </main>
  );
}
