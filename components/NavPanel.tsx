import Link from "next/link";
import { Button, Panel } from "@navikt/ds-react";
import { Back, Next } from "@navikt/ds-icons";

export type NavPanelProps = {
  backHref?: string;
  nextHref?: string
}

export default function NavPanel(props: NavPanelProps) {
  let backButton = <div />
  if(props.backHref != undefined) {
    backButton = <Link href={props.backHref} passHref>
      <Button icon={<Back aria-hidden />} variant="secondary">
        Tilbake
      </Button>
    </Link>
  }

  let nextButton = <div />
  if(props.nextHref != undefined) {
    nextButton = <Link href={props.nextHref} passHref>
      <Button icon={<Next aria-hidden />} iconPosition="right">
        Neste
      </Button>
    </Link>
  }

  return (
    <Panel border className="navds-date__caption">
      {
        backButton
      }
      {
        nextButton
      }
    </Panel>
  );
}