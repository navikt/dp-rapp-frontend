import { Heading } from "@navikt/ds-react";
import Divider from "../components/Divider";
import CustomStepper from "../components/CustomStepper";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import Receipt from "../components/Receipt";
import CancelButton from "../components/CancelButton";
import { format, getISOWeek } from "date-fns";
import { Dispatch, FormEventHandler, SetStateAction, useEffect, useState } from "react";
import { ActivityType, Data, Day, SavedDates } from "../models/Data";
import { LoadedData } from "../models/LoadedData";
import { fromStringToDate } from "../utils/date.utils";
import CenteredLoader from "../components/CenteredLoader";

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
  questionConsent: boolean | undefined;
  setQuestionConsent: Dispatch<SetStateAction<boolean | undefined>>;
  prevStep: FormEventHandler;
  nextStep: FormEventHandler;
  send: FormEventHandler;
  showLoader: boolean;
  error: string;
}

export default function Page() {
  // TODO: Get ID from the earliest meldekort and set it as currentId
  const currentId = 5;

  // TODO: Get dates from the earliest meldekort and use these dates
  // JavaScript Dates are internally in UTC
  // We have to add time (12:00) so as the date itself is not changed when converted from/to CET
  const startDate = new Date(2022, 11, 5, 12, 0);
  const endDate = new Date(2022, 11, 18, 12, 0);

  // Service variables
  const maxStep = 4;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState(false)

  // Data variables
  const [questionWork, setQuestionWork] = useState<boolean | null>(null);
  const [questionMeasures, setQuestionMeasures] = useState<boolean | null>(null);
  const [questionIllness, setQuestionIllness] = useState<boolean | null>(null);
  const [questionVacation, setQuestionVacation] = useState<boolean | null>(null);
  const [savedDates, setSavedDates] = useState<SavedDates>([]);
  const [questionProceed, setQuestionProceed] = useState<boolean | null>(null);
  const [questionConsent, setQuestionConsent] = useState<boolean>();

  useEffect(() => {
    setLoading(true)
    fetch('/api/periods/' + currentId)
      .then((res) => res.json())
      .then((loadedData: LoadedData) => {
        // Convert loaded days to SavedDates
        const loadedSavedDates: SavedDates = {}
        loadedData?.days.forEach((day) => {
          // @ts-ignore
          loadedSavedDates[fromStringToDate(day.date).getTime()] = { type: ActivityType[day.type], hours: day.hours }
        });

        setQuestionWork(loadedData.questionWork);
        setQuestionMeasures(loadedData.questionMeasures);
        setQuestionIllness(loadedData.questionIllness);
        setQuestionVacation(loadedData.questionVacation);
        setSavedDates(loadedSavedDates);
        setQuestionProceed(loadedData.questionProceed);
        setQuestionConsent(false); // User must check it every time

        setLoading(false)
      }).catch((error) => {
      console.log(error)
    });
  }, [])

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
    const response = await postData('/api/periods/save');

    if (!response.ok) {
      setError('Feil i vårt baksystem. Kunne ikke lagre data');
    }

    // Hide loader
    setShowLoader(false);
  }

  const send = async () => {
    const response = await postData('/api/periods/send');

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

  if (isLoading) {
    return (
      <main>
        <CenteredLoader />
      </main>
    );
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
