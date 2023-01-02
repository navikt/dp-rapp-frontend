export type Data = {
  id: string;
  questionWork: boolean | null;
  questionMeasures: boolean | null;
  questionIllness: boolean | null;
  questionVacation: boolean | null;
  days: Day[];
  questionProceed: boolean | null;
}

export type Day = {
  date: Date;
  type: ActivityType;
  hours: number | null;
}

export type LoadedData = {
  id: string;
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

export enum ActivityType {
  WORK,
  ILLNESS,
  MEASURES,
  VACATION
}

export type SavedDates = {
  [key: number]: { type: ActivityType, hours: number | null };
}