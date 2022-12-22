import { Button, Panel } from "@navikt/ds-react";
import { Back, Next } from "@navikt/ds-icons";
import { FormEventHandler } from "react";

export type NavPanelWithSubmitProps = {
  backText?: string;
  backOnClick?: FormEventHandler;
  nextText?: string;
  nextOnClick?: FormEventHandler;
}

export default function NavPanelWithSubmit(props: NavPanelWithSubmitProps) {
  let backButton = <div />
  if (props.backOnClick != undefined) {
    backButton = <Button icon={<Back aria-hidden />} variant="secondary" type="button" onClick={props.backOnClick}>
      {props.backText}
    </Button>
  }

  let nextButton = <div />
  if (props.nextOnClick != undefined) {
    nextButton = <Button icon={<Next aria-hidden />} iconPosition="right" type="button" onClick={props.nextOnClick}>
      {props.nextText}
    </Button>
  }

  return (
    <Panel border className="navds-date__caption navds-link-panel__description">
      {
        backButton
      }
      {
        nextButton
      }
    </Panel>
  );
}