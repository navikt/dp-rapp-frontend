import { parseISO } from "date-fns";

export const fromStringToDate = (str: string): Date => {
  return parseISO(str + "T12:00:00")
}
