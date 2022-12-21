import { Button, Heading, Modal, Panel, UNSAFE_DatePicker } from "@navikt/ds-react";
import NavPanel from "../../components/NavPanel";
import CustomStepper from "../../components/CustomStepper";
import Spacer from "../../components/Spacer";
import Divider from "../../components/Divider";
import { useEffect, useState } from "react";
import CancelButton from "../../components/CancelButton";
import { format } from "date-fns";

export default function Page() {

  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [savedDates, setSavedDates] = useState<{ [key: number]: string }>({});

  // let savedDates: {[key: number]: object} = {};

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  const dateSelected = (dates: Date[] | undefined) => {
    if (dates == undefined) {
      return;
    }

    const tempSavedDates: { [key: number]: string } = {}
    for (let i = 0; i < dates.length; i++) {
      const key = dates[i].getTime();

      if (savedDates[key] == undefined) {
        tempSavedDates[key] = "";
        setCurrentDate(dates[i]);
        setOpen(true)
      } else {
        tempSavedDates[key] = savedDates[key];
      }
    }
    setSavedDates({ ...tempSavedDates });
  }

  const dateTypeSelected = (date: Date | null, type: string) => {
    if (date == null) {
      return;
    }

    const key = date.getTime();

    setSavedDates(
      {
        ...savedDates,
        [key]: type
      }
    );
    setOpen(false);
    console.log(savedDates);
  }

  return (
    <main>
      <Heading level="1" size="xlarge">Dagpenger rapportering</Heading>
      <Heading level="2" size="medium">Uke 49 - 50 (05.12.22 - 18.12.22)</Heading>

      <Divider />

      <CustomStepper numberOfSteps={4} currentStep={2} />

      <Heading level="3" size="large">Utfylling</Heading>

      <Spacer />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <UNSAFE_DatePicker.Standalone
          mode="multiple"
          fromDate={new Date("5 Dec 2022")}
          toDate={new Date("18 Dec 2022")}
          min={1}
          max={14}
          onSelect={(dates) => dateSelected(dates)}
        />
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
              {currentDate && format(currentDate, "eeee dd")}
            </Heading>
            <div>
              <button className="activityType work"
                      onClick={() => dateTypeSelected(currentDate, 'work')}>
                Arbeid
              </button>
            </div>
            <div>
              <button className="activityType illness"
                      onClick={() => dateTypeSelected(currentDate, 'illness')}>
                Syk
              </button>
            </div>
            <div>
              <button className="activityType measures"
                      onClick={() => dateTypeSelected(currentDate, 'measures')}>
                Tiltak
              </button>
            </div>
            <div>
              <button className="activityType vacation"
                      onClick={() => dateTypeSelected(currentDate, 'vacation')}>
                Fravær/ferie
              </button>
            </div>
          </Panel>
          <Panel className="navds-date__caption navds-link-panel__description">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Avbryt
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Lagre
            </Button>
          </Panel>
        </Modal.Content>
      </Modal>

      <NavPanel backHref="/steg1" backText="Forrige steg" nextHref="/steg3" nextText="Neste steg" />

      <CancelButton />
    </main>
  );
}
