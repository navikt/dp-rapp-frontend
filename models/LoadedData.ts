export type LoadedData = {
  id: number;
  questionWork: boolean | null;
  questionMeasures: boolean | null;
  questionIllness: boolean | null;
  questionVacation: boolean | null;
  days: LoadedDay[];
  questionProceed: boolean | null;
}

export type LoadedDay = {
  date: string;
  type: string;
  hours: number | null;
}
