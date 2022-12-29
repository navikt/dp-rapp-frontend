import styles from "./Menu.module.css";
import { Panel } from "@navikt/ds-react";
import { Helptext, Historic, Information, Send } from "@navikt/ds-icons";
import StyledLink from "./StyledLink";

export default function Menu() {

  return (
    <Panel className={styles.menu}>
      <StyledLink href="/">
        {<Send aria-hidden />}
        Send
      </StyledLink>
      <StyledLink href="/history">
        {<Historic aria-hidden />}
        Tidligere meldekort
      </StyledLink>
      <StyledLink href="/about">
        {<Information aria-hidden />}
        Om meldekort
      </StyledLink>
      <StyledLink href="/faq">
        {<Helptext aria-hidden />}
        Ofte stilte spørsmål
      </StyledLink>
    </Panel>
  );
}
