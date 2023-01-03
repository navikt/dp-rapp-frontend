import styles from "./ActivitySelector.module.css";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Heading, Modal, Panel, TextField } from "@navikt/ds-react";
import { addDays, format } from "date-fns";
import Spacer from "./Spacer";
import { ActivityType, SavedDates } from "../models/Data";

export type ActivitySelectorProps = {
  startDate: Date;
  endDate: Date;
  savedDates: SavedDates;
  setSavedDates: Dispatch<SetStateAction<SavedDates>>;
}

export default function ActivitySelector(props: ActivitySelectorProps) {

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedType, setSelectedType] = useState<ActivityType | null>(null);
  const [selectedHours, setSelectedHours] = useState<number | null>(null);
  const { startDate, savedDates, setSavedDates } = props;

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  const dateSelected = (date: Date) => {
    setSelectedType(savedDates[date.getTime()]?.type);
    setSelectedHours(savedDates[date.getTime()]?.hours);
    setSelectedDate(date);
    setOpen(true);
  }

  const dateTypeSelected = (type: ActivityType | null) => {
    setSelectedType(type);
    setSelectedHours(0);
  }

  const updateHours = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedHours(Number.parseFloat(event.target.value));
  }

  const saveDate = () => {
    if (selectedDate == null) {
      return;
    }

    const hoursNumber = Number(selectedHours);
    if (isNaN(+hoursNumber) || hoursNumber < 0 || hoursNumber > 24) {
      return;
    }


    const key = selectedDate.getTime();

    // Delete object if its type is empty
    // Else save
    if (selectedType == null) {
      const state = { ...savedDates };
      delete state[key];
      setSavedDates(state);
    } else {
      setSavedDates({
        ...savedDates,
        [key]: {
          type: selectedType,
          hours: hoursNumber
        }
      });
    }

    setOpen(false);
  }

  // Building day grid
  const days = [];
  for (let i = 0; i < 14; i++) {
    const currentDate = addDays(startDate, i);
    const currentDateStr = format(currentDate, "d.");
    const currentData = savedDates[currentDate.getTime()];

    let addClass = styles.none;
    if (currentData?.type == ActivityType.WORK) addClass = styles.work;
    else if (currentData?.type == ActivityType.ILLNESS) addClass = styles.illness;
    else if (currentData?.type == ActivityType.MEASURES) addClass = styles.measures;
    else if (currentData?.type == ActivityType.VACATION) addClass = styles.vacation;

    let hours = <></>;
    if (currentData?.type == ActivityType.WORK) {
      hours = <div className={styles.workHours}>{currentData.hours}t</div>;
    }

    days.push(
      <div key={currentDate.getTime()}>
        <button
          type="button"
          className={styles.activityGridButton + ' ' + addClass}
          onClick={() => dateSelected(currentDate)}>
          {currentDateStr}
        </button>
        {hours}
      </div>
    );
  }

  const hoursInput = <TextField label="Antall timer"
                                type="number"
                                step="0.5"
                                value={selectedHours || 0}
                                onChange={updateHours} />

  // Summary
  let workHours = 0;
  let illnessDays = 0;
  let measuresDays = 0;
  let vacationDays = 0;
  for (const key in savedDates) {
    const currentData = savedDates[key];

    if (currentData.type == ActivityType.WORK) workHours += (currentData.hours || 0);
    else if (currentData.type == ActivityType.ILLNESS) illnessDays += 1;
    else if (currentData.type == ActivityType.MEASURES) measuresDays += 1;
    else if (currentData.type == ActivityType.VACATION) vacationDays += 1;
  }

  let summaryWork = <></>
  if (workHours > 0) {
    summaryWork = <div className={styles.summaryLine + ' ' + styles.work}>
      <div>Arbeid</div>
      <div>{workHours} {(workHours == 1) ? 'time' : 'timer'}</div>
    </div>
  }

  let summaryIllness = <></>
  if (illnessDays > 0) {
    summaryIllness = <div className={styles.summaryLine + ' ' + styles.illness}>
      <div>Syk</div>
      <div>{illnessDays} {(illnessDays == 1) ? 'dag' : 'dager'}</div>
    </div>
  }

  let summaryMeasures = <></>
  if (measuresDays > 0) {
    summaryMeasures = <div className={styles.summaryLine + ' ' + styles.measures}>
      <div>Tiltak</div>
      <div>{measuresDays} {(measuresDays == 1) ? 'dag' : 'dager'}</div>
    </div>
  }

  let summaryVacation = <></>
  if (vacationDays > 0) {
    summaryVacation = <div className={styles.summaryLine + ' ' + styles.vacation}>
      <div>Fravær/ferie</div>
      <div>{vacationDays} {(vacationDays == 1) ? 'dag' : 'dager'}</div>
    </div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.dayGrid}>
        <div>man</div>
        <div>tir</div>
        <div>ons</div>
        <div>tor</div>
        <div>fre</div>
        <div>lør</div>
        <div>søn</div>
        {
          days
        }
      </div>

      <Spacer />

      {
        Object.keys(savedDates).length !== 0 &&
          <div className={styles.summary}>
              <div className={styles.summaryHeader}>Sammenlagt for meldeperioden:</div>
            {summaryWork}
            {summaryIllness}
            {summaryMeasures}
            {summaryVacation}
          </div>
      }


      <Modal
        open={open}
        aria-label="Modal demo"
        closeButton={true}
        shouldCloseOnOverlayClick={false}
        onClose={() => setOpen((x) => !x)}
        aria-labelledby="modal-heading"
      >
        <Modal.Content>
          <Panel>
            <Heading spacing level="3" size="large" id="modal-heading">
              {selectedDate && format(selectedDate, "eeee dd")}
            </Heading>
            <div>
              <button
                type="button"
                className={styles.activityTypeButton + ' ' + styles.work + ' ' + ((selectedType == ActivityType.WORK) ? styles.selected : '')}
                onClick={() => dateTypeSelected(ActivityType.WORK)}>
                Arbeid
              </button>
              {
                (selectedType == ActivityType.WORK) ? hoursInput : ''
              }
            </div>
            <div>
              <button
                type="button"
                className={styles.activityTypeButton + ' ' + styles.illness + ' ' + ((selectedType == ActivityType.ILLNESS) ? styles.selected : '')}
                onClick={() => dateTypeSelected(ActivityType.ILLNESS)}>
                Syk
              </button>
            </div>
            <div>
              <button
                type="button"
                className={styles.activityTypeButton + ' ' + styles.measures + ' ' + ((selectedType == ActivityType.MEASURES) ? styles.selected : '')}
                onClick={() => dateTypeSelected(ActivityType.MEASURES)}>
                Tiltak
              </button>
            </div>
            <div>
              <button
                className={styles.activityTypeButton + ' ' + styles.vacation + ' ' + ((selectedType == ActivityType.VACATION) ? styles.selected : '')}
                onClick={() => dateTypeSelected(ActivityType.VACATION)}>
                Fravær/ferie
              </button>
            </div>
            <div>
              <button
                type="button"
                className={styles.activityTypeButton + ' ' + styles.none + ' ' + ((selectedType == null) ? styles.selected : '')}
                onClick={() => dateTypeSelected(null)}>
                Ingenting
              </button>
            </div>
          </Panel>
          <Panel className="navds-date__caption navds-link-panel__description">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Avbryt
            </Button>
            <Button variant="primary" onClick={() => saveDate()}>
              Lagre
            </Button>
          </Panel>
        </Modal.Content>
      </Modal>

    </div>
  );
}
