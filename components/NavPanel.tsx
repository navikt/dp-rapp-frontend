import Link from "next/link";
import { Button, Panel } from "@navikt/ds-react";
import { Back, Next } from "@navikt/ds-icons";

export type NavPanelProps = {
  backHref?: string;
  backText?: string;
  nextHref?: string
  nextText?: string
}

export default function NavPanel(props: NavPanelProps) {
  let backButton = <div />
  if(props.backHref != undefined) {
    backButton = <Link href={props.backHref} passHref>
      <Button icon={<Back aria-hidden />} variant="secondary">
        {props.backText}
      </Button>
    </Link>
  }

  let nextButton = <div />
  if(props.nextHref != undefined) {
    nextButton = <Link href={props.nextHref} passHref>
      <Button icon={<Next aria-hidden />} iconPosition="right">
        {props.nextText}
      </Button>
    </Link>
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