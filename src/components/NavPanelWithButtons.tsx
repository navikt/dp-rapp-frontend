import { Button, Panel } from "@navikt/ds-react";
import { Back, Next } from "@navikt/ds-icons";
import { FormEventHandler } from "react";

export type NavPanelWithSubmitProps = {
  backText?: string;
  backOnClick?: FormEventHandler;
  nextText?: string;
  nextOnClick?: FormEventHandler;
  showLoader?: boolean;
  nextDisabled?: boolean;
};

export default function NavPanelWithSubmit(props: NavPanelWithSubmitProps) {
  if (props.showLoader) {
    return (
      <Panel
        border
        className="navds-date__caption navds-link-panel__description"
      >
        <div />
        <Button loading>Loading</Button>
      </Panel>
    );
  }

  let backButton = <div />;
  if (props.backOnClick != undefined) {
    backButton = (
      <Button
        icon={<Back aria-hidden />}
        variant="secondary"
        type="button"
        onClick={props.backOnClick}
      >
        {props.backText}
      </Button>
    );
  }

  let nextButton = <div />;
  if (props.nextOnClick != undefined) {
    nextButton = (
      <>
        {props.nextDisabled && <p>Kan ikke sende meldekort før 14. februar</p>}
        <Button
          icon={<Next aria-hidden />}
          iconPosition="right"
          type="button"
          onClick={props.nextOnClick}
          disabled={props.nextDisabled}
        >
          {props.nextText}
        </Button>
      </>
    );
  }

  return (
    <Panel border className="navds-date__caption navds-link-panel__description">
      {backButton}
      {nextButton}
    </Panel>
  );
}
