import { Heading } from "@navikt/ds-react";
import Divider from "../components/Divider";
import StepActivity from "../components/StepActivity";
import StepFillDays from "../components/StepFillDays";
import StepSummary from "../components/StepSummary";
import Receipt from "../components/Receipt";
import CancelButton from "../components/CancelButton";
import { format, getISOWeek } from "date-fns";
import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ActivityType, Data, Day, SavedDates } from "../models/Data";
import { LoadedData } from "../models/LoadedData";
import { fromStringToDate } from "../utils/date.utils";
import CenteredLoader from "../components/CenteredLoader";
import StepIntroduction from "../components/StepIntroduction";
import Guidance from "../components/Guidance";
import AdminPanel from "../components/AdminPanel";

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
  mockKlarForInnsending: MeldekortState;
  setMockKlarForInnsending: Dispatch<SetStateAction<MeldekortState>>;
  prevStep: FormEventHandler;
  nextStep: FormEventHandler;
  send: FormEventHandler;
  showLoader: boolean;
  error: string;
};
export enum MeldekortState {
  KLAR = "KLAR FOR INNSENDING",
  IKKE_KLAR = "IKKE KLAR FOR INNSENDING ENDA",
}

export default function Page() {
  // TODO: Get ID from the earliest meldekort and set it as currentId
  const currentId = 5;

  // TODO: Get dates from the earliest meldekort and use these dates
  // JavaScript Dates are internally in UTC
  // We have to add time (12:00) so as the date itself is not changed when converted from/to CET
  const startDate = new Date(2022, 11, 5, 12, 0);
  const endDate = new Date(2022, 11, 18, 12, 0);

  // Dev variables for å mocke state
  const [mockKlarForInnsending, setMockKlarForInnsending] =
    useState<MeldekortState>(MeldekortState.KLAR);

  // Service variables
  const maxStep = 4;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  // Data variables
  const [questionWork, setQuestionWork] = useState<boolean | null>(null);
  const [questionMeasures, setQuestionMeasures] = useState<boolean | null>(
    null
  );
  const [questionIllness, setQuestionIllness] = useState<boolean | null>(null);
  const [questionVacation, setQuestionVacation] = useState<boolean | null>(
    null
  );
  const [savedDates, setSavedDates] = useState<SavedDates>([]);
  const [questionProceed, setQuestionProceed] = useState<boolean | null>(null);
  const [questionConsent, setQuestionConsent] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    fetch("/api/periods/" + currentId)
      .then((res) => res.json())
      .then((loadedData: LoadedData) => {
        // Convert loaded days to SavedDates
        const loadedSavedDates: SavedDates = {};
        loadedData?.days?.forEach((day) => {
          loadedSavedDates[fromStringToDate(day.date).getTime()] = {
            // @ts-ignore
            type: ActivityType[day.type],
            hours: day.hours,
          };
        });

        // If we didn't get data and fields are undefined > use null
        // We can't leave undefined in these fields, because it makes these components uncontrolled
        setQuestionWork(
          loadedData.questionWork == undefined ? null : loadedData.questionWork
        );
        setQuestionMeasures(
          loadedData.questionMeasures == undefined
            ? null
            : loadedData.questionMeasures
        );
        setQuestionIllness(
          loadedData.questionIllness == undefined
            ? null
            : loadedData.questionIllness
        );
        setQuestionVacation(
          loadedData.questionVacation == undefined
            ? null
            : loadedData.questionVacation
        );
        setSavedDates(loadedSavedDates);
        setQuestionProceed(
          loadedData.questionProceed == undefined
            ? null
            : loadedData.questionProceed
        );
        setQuestionConsent(false); // User must check it every time

        setLoading(false);
      })
      .then(() => {
        setIsFetched(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (!isLoading && isFetched) {
      setCurrentStep(calculateStep());
    }
  }, [isFetched]);

  useEffect(() => {
    //lagre datoer i activityselector hver gang man trykker ok i modalen, kanskje ikke optimalt at logikken ligger her?
    if (isFetched && !isLoading && !showLoader && currentStep == 3) {
      save();
    }
  }, [savedDates]);

  const startDateStr = format(startDate, "dd.MM.yy");
  const endDateStr = format(endDate, "dd.MM.yy");
  const hasActivity = () => {
    if (savedDates) {
      for (const key in savedDates) {
        const currentData = savedDates[key];
        if (
          currentData.type == ActivityType.WORK ||
          currentData.type == ActivityType.ILLNESS ||
          currentData.type == ActivityType.MEASURES ||
          currentData.type == ActivityType.VACATION
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const calculateStep = () => {
    let shouldGoToStep = currentStep + 1;
    if (currentStep == 0) {
      if (hasActivity()) {
        shouldGoToStep = 3;
      } else shouldGoToStep = 2;
      if (!questionIllness) {
        shouldGoToStep = 1;
      }
    }
    if (currentStep == 1) {
      if (hasActivity()) {
        shouldGoToStep = 3;
      }
    }
    if (currentStep == 2 && !questionWork) {
      shouldGoToStep = 4;
    }
    return shouldGoToStep;
  };

  const prevStep = async () => {
    if (currentStep > 1) {
      await save();
      setCurrentStep(currentStep - 1);
    }
  };

  const nextStep = async () => {
    if (currentStep < maxStep) {
      await save();
      setCurrentStep(calculateStep());
    }
  };

  const save = async () => {
    const response = await postData("/api/periods/save");

    if (!response.ok) {
      setError("Feil i vårt baksystem. Kunne ikke lagre data");
    }

    // Hide loader
    setShowLoader(false);
  };

  const send = async () => {
    const response = await postData("/api/periods/send");

    if (response.ok) {
      setCurrentStep(currentStep + 1);
      setShowReceipt(true);
    } else {
      setError("Feil i vårt baksystem. Prøv senere");
    }

    // Hide loader
    setShowLoader(false);
  };

  const postData = async (endpoint: string) => {
    // Reset error
    setError("");

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
      questionProceed,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    return await fetch(endpoint, options);
  };

  const commonFormProps: CommonFormProps = {
    startDate,
    endDate,
    mockKlarForInnsending,
    setMockKlarForInnsending,
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
    error,
  };

  if (isLoading) {
    return (
      <main>
        <CenteredLoader />
      </main>
    );
  }

  //tester om jeg kan vise github branch, litt på gøy

  return (
    <main>
      <Heading level="1" size="xlarge">
        Dagpenger rapportering
      </Heading>
      <Heading level="2" size="medium">
        Uke {getISOWeek(startDate)} - {getISOWeek(endDate)} ({startDateStr} -{" "}
        {endDateStr})
      </Heading>
      <Divider />
      {currentStep == 1 && <StepIntroduction {...commonFormProps} />}
      {currentStep == 2 && <StepActivity {...commonFormProps} />}
      {currentStep == 3 && <StepFillDays {...commonFormProps} />}
      {currentStep == 4 && <StepSummary {...commonFormProps} />}
      {currentStep == 0 && <p>Laster</p>}
      {showReceipt && <Receipt />}
      {!showReceipt && <CancelButton />}
      {currentStep == 3 && <Guidance />}
      <AdminPanel {...commonFormProps} />
    </main>
  );
}
