export type Data = {
  id: number;
  questionWork: boolean | null;
  questionMeasures: boolean | null;
  questionIllness: boolean | null;
  questionVacation: boolean | null;
  days: Day[];
  questionProceed: boolean | null;
};

export type Day = {
  date: Date;
  type: ActivityType;
  hours: number | null;
};

export enum ActivityType {
  WORK = "WORK",
  ILLNESS = "ILLNESS",
  MEASURES = "MEASURES",
  VACATION = "VACATION",
}

export enum MeldekortState {
  KLAR = "KLAR FOR INNSENDING",
  IKKE_KLAR = "IKKE KLAR FOR INNSENDING ENDA",
}

export type SavedDates = {
  [key: number]: { type: ActivityType; hours: number | null };
};
