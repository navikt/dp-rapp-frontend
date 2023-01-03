import { Heading } from "@navikt/ds-react";
import Divider from "../../components/Divider";
import CustomStepper from "../../components/CustomStepper";
import Step1 from "../../components/Step1";
import Step2 from "../../components/Step2";
import Step3 from "../../components/Step3";
import Step4 from "../../components/Step4";
import Receipt from "../../components/Receipt";
import CancelButton from "../../components/CancelButton";
import { format, getISOWeek, parseISO } from "date-fns";
import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import { ActivityType, Data, Day, SavedDates } from "../../models/Data";
import { LoadedData } from "../../models/LoadedData";

type InitialState = {
  currentId: string;
  loadedData: LoadedData;
}

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
  savedDates: SavedDates;
  setSavedDates: Dispatch<SetStateAction<SavedDates>>;
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

export async function getServerSideProps() {
  // TODO: Get ID from the earliest meldekort and set it as currentId
  const currentId = "5";

  // Default values for initial state
  let loadedData: LoadedData = {
    id: currentId,
    questionWork: null,
    questionMeasures: null,
    questionIllness: null,
    questionVacation: null,
    days: [],
    questionProceed: null
  }

  // Get saved values
  try {
    const response = await fetch(process.env.DP_RAPP_API_URL + '/api/v1/get/' + currentId);
    if (response.ok) {
      loadedData = await response.json();
    }
  } catch (e) {
    console.warn("Kunne ikke hente lagrede verdier", e);
  }


  // Data comes to page as props
  return {
    props: {
      currentId,
      loadedData
    },
  };
}

export default function Page(props: InitialState) {

  // Service variables
  const maxStep = 4;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Pre-fetched data (initial state) comes to the page as props
  const { currentId, loadedData } = props;

  // Convert loaded days to SavedDates
  const loadedSavedDates: SavedDates = {}
  loadedData?.days.forEach((day) => {
    // @ts-ignore
    loadedSavedDates[parseISO(day.date + "T12:00:00").getTime()] = { type: ActivityType[day.type], hours: day.hours }
  });

  // Use loaded data as initial state for variables
  const [questionWork, setQuestionWork] = useState<boolean | null>(loadedData.questionWork);
  const [questionMeasures, setQuestionMeasures] = useState<boolean | null>(loadedData.questionMeasures);
  const [questionIllness, setQuestionIllness] = useState<boolean | null>(loadedData.questionIllness);
  const [questionVacation, setQuestionVacation] = useState<boolean | null>(loadedData.questionVacation);
  const [savedDates, setSavedDates] = useState<SavedDates>(loadedSavedDates);
  const [questionProceed, setQuestionProceed] = useState<boolean | null>(loadedData.questionProceed);
  const [questionConsent, setQuestionConsent] = useState<boolean>(false); // Always false initially, user must check it every time

  // TODO: Get dates from the earliest meldekort and use these dates
  // JavaScript Dates are internally in UTC
  // We have to add time (12:00) so as the date itself is not changed when converted from/to CET
  const startDate = new Date(2022, 11, 5, 12, 0);
  const endDate = new Date(2022, 11, 18, 12, 0);

  const startDateStr = format(startDate, "dd.MM.yy");
  const endDateStr = format(endDate, "dd.MM.yy");

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextStep = async () => {
    if (currentStep < maxStep) {
      await save();
      setCurrentStep(currentStep + 1);
    }
  };

  const save = async () => {
    const response = await postData('/api/save');

    if (!response.ok) {
      setError('Feil i vårt baksystem. Kunne ikke lagre data');
    }

    // Hide loader
    setShowLoader(false);
  }

  const send = async () => {
    const response = await postData('/api/send');

    if (response.ok) {
      setCurrentStep(currentStep + 1);
      setShowReceipt(true);
    } else {
      setError('Feil i vårt baksystem. Prøv senere');
    }

    // Hide loader
    setShowLoader(false);
  }

  const postData = async (endpoint: string) => {
    // Reset error
    setError('');

    // Show loader
    setShowLoader(true);

    // Prepare dates
    const days: Day[] = [];
    for (const key in savedDates) {
      days.push({
        date: new Date(+key),
        type: savedDates[key].type,
        hours: savedDates[key].hours,
      });
    }

    // Collect data in one object
    const data: Data = {
      id: currentId,
      questionWork,
      questionMeasures,
      questionIllness,
      questionVacation,
      days,
      questionProceed
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

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
    return await fetch(endpoint, options);
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
      <Heading level="2"
               size="medium">Uke {getISOWeek(startDate)} - {getISOWeek(endDate)} ({startDateStr} - {endDateStr})</Heading>

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
