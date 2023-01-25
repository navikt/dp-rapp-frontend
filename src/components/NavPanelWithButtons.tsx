import { Button, Link, Panel } from "@navikt/ds-react";
import { Next } from "@navikt/ds-icons";
import { FormEventHandler } from "react";
import styles from "./NavPanelWithButtons.module.css";

export type NavPanelWithButtonsProps = {
  backText?: string;
  backOnClick?: FormEventHandler;
  nextText?: string;
  nextOnClick?: FormEventHandler;
  showLoader?: boolean;
  nextDisabled?: boolean;
};

export default function NavPanelWithButtons(props: NavPanelWithButtonsProps) {
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

  let nextButton = <div />;
  if (props.nextOnClick != undefined) {
    nextButton = (
      <Button
        icon={<Next aria-hidden />}
        iconPosition="right"
        type="button"
        onClick={props.nextOnClick}
        disabled={props.nextDisabled}
      >
        {props.nextText}
      </Button>
    );
  }

  return (
    <Panel border className={styles.panel}>
      {props.nextDisabled && (
        <div className={styles.info}>
          <p>Meldekortet kan ikke sendes inn før i morgen!</p>
        </div>
      )}
      <div className={styles.buttons}>
        <Link href="/">Fortsett senere</Link>
        {nextButton}
      </div>
    </Panel>
  );
}
