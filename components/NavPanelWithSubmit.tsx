import Link from "next/link";
import { Button, Panel } from "@navikt/ds-react";
import { Back, Next } from "@navikt/ds-icons";

export type NavPanelWithSubmitProps = {
  backHref?: string;
  backText?: string;
  nextHref?: string
  nextText?: string
}

export default function NavPanelWithSubmit(props: NavPanelWithSubmitProps) {
  let backButton = <div />
  if (props.backHref != undefined) {
    backButton = <Link href={props.backHref} passHref>
      <Button icon={<Back aria-hidden />} variant="secondary">
        {props.backText}
      </Button>
    </Link>
  }

  const nextButton =
    <Button icon={<Next aria-hidden />} iconPosition="right" type="submit">
      {props.nextText}
    </Button>


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