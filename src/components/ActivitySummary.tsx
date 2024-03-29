import styles from "./ActivitySummary.module.css";
import { ActivityType, SavedDates } from "../models/Data";

export type ActivitySummaryProps = {
  savedDates: SavedDates;
  children?: React.ReactNode;
  center?: boolean;
};

export default function ActivitySummary(props: ActivitySummaryProps) {
  const { savedDates } = props;
  // Summary
  let workHours = 0;
  let illnessDays = 0;
  let measuresDays = 0;
  let vacationDays = 0;
  const hasActivity = () => {
    return workHours + illnessDays + measuresDays + vacationDays > 0;
  };
  for (const key in savedDates) {
    const currentData = savedDates[key];

    if (currentData.type == ActivityType.WORK)
      workHours += currentData.hours || 0;
    else if (currentData.type == ActivityType.ILLNESS) illnessDays += 1;
    else if (currentData.type == ActivityType.MEASURES) measuresDays += 1;
    else if (currentData.type == ActivityType.VACATION) vacationDays += 1;
  }

  let summaryWork = <></>;
  if (workHours > 0) {
    summaryWork = (
      <div className={styles.summaryLine + " " + styles.work}>
        <div>Arbeid</div>
        <div>
          {workHours} {workHours == 1 ? "time" : "timer"}
        </div>
      </div>
    );
  }

  let summaryIllness = <></>;
  if (illnessDays > 0) {
    summaryIllness = (
      <div className={styles.summaryLine + " " + styles.illness}>
        <div>Syk</div>
        {illnessDays} {illnessDays == 1 ? "dag" : "dager"}
      </div>
    );
  }

  let summaryMeasures = <></>;
  if (measuresDays > 0) {
    summaryMeasures = (
      <div className={styles.summaryLine + " " + styles.measures}>
        <div>Tiltak</div>
        <div>
          {measuresDays} {measuresDays == 1 ? "dag" : "dager"}
        </div>
      </div>
    );
  }

  let summaryVacation = <></>;
  if (vacationDays > 0) {
    summaryVacation = (
      <div className={styles.summaryLine + " " + styles.vacation}>
        <div>Fravær/ferie</div>
        <div>
          {vacationDays} {vacationDays == 1 ? "dag" : "dager"}
        </div>
      </div>
    );
  }
  const summaryNothing = (
    <div className={styles.summaryLine + " " + styles.none}>
      Ingen aktivitet utenom å være arbeidssøker
    </div>
  );

  const summaryStyle = props.center
    ? styles.summary + " " + styles.center
    : styles.summary;
  return (
    <div className={summaryStyle}>
      {props.children}
      {hasActivity() && summaryWork}
      {hasActivity() && summaryIllness}
      {hasActivity() && summaryMeasures}
      {hasActivity() && summaryVacation}
      {!hasActivity() && summaryNothing}
    </div>
  );
}
