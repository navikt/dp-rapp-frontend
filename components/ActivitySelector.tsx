import styles from "./ActivitySelector.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Heading, Modal, Panel, TextField } from "@navikt/ds-react";
import { addDays, format } from "date-fns";

export type ActivitySelectorProps = {
  startDate: Date;
  endDate: Date;
}

export default function ActivitySelector(props: ActivitySelectorProps) {

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedHours, setSelectedHours] = useState<string | null>(null);
  const [savedDates, setSavedDates] = useState<{ [key: number]: { type: string, hours: number } }>({});

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  const dateSelected = (date: Date) => {
    setSelectedType(savedDates[date.getTime()]?.type);
    setSelectedHours(savedDates[date.getTime()]?.hours.toString());
    setSelectedDate(date);
    setOpen(true);
  }

  const dateTypeSelected = (type: string) => {
    setSelectedType(type);
    setSelectedHours("0");
  }

  const updateHours = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedHours(event.target.value);
  }

  const saveDate = () => {
    if (selectedDate == null || selectedType == null) {
      return;
    }

    const hoursNUmber = Number(selectedHours);
    if (isNaN(+hoursNUmber) || hoursNUmber < 0 || hoursNUmber > 24) {
      return;
    }


    const key = selectedDate.getTime();

    setSavedDates({
      ...savedDates,
      [key]: {
        type: selectedType,
        hours: hoursNUmber
      }
    });

    setOpen(false);
  }

  const days = [];
  for (let i = 0; i < 14; i++) {
    const currentDate = addDays(props.startDate, i);
    const currentDateStr = format(currentDate, "d.");
    const currentData = savedDates[currentDate.getTime()];

    let addClass = styles.none;
    if (currentData?.type == 'work') addClass = styles.work;
    else if (currentData?.type == 'illness') addClass = styles.illness;
    else if (currentData?.type == 'measures') addClass = styles.measures;
    else if (currentData?.type == 'vacation') addClass = styles.vacation;

    let hours = <></>;
    if (currentData?.type == 'work') {
      hours = <div className={styles.workHours}>{currentData.hours}t</div>;
    }

    days.push(
      <div key={currentDate.getTime()}>
        <button className={styles.activityGridButton + ' ' + addClass}
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
                className={styles.activityTypeButton + ' ' + styles.work + ' ' + ((selectedType == 'work') ? styles.selected : '')}
                onClick={() => dateTypeSelected('work')}>
                Arbeid
              </button>
              {
                (selectedType == 'work') ? hoursInput : ''
              }
            </div>
            <div>
              <button
                className={styles.activityTypeButton + ' ' + styles.illness + ' ' + ((selectedType == 'illness') ? styles.selected : '')}
                onClick={() => dateTypeSelected('illness')}>
                Syk
              </button>
            </div>
            <div>
              <button
                className={styles.activityTypeButton + ' ' + styles.measures + ' ' + ((selectedType == 'measures') ? styles.selected : '')}
                onClick={() => dateTypeSelected('measures')}>
                Tiltak
              </button>
            </div>
            <div>
              <button
                className={styles.activityTypeButton + ' ' + styles.vacation + ' ' + ((selectedType == 'vacation') ? styles.selected : '')}
                onClick={() => dateTypeSelected('vacation')}>
                Fravær/ferie
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
