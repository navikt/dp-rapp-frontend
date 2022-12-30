import styles from "./Menu.module.css";
import { Panel } from "@navikt/ds-react";
import { Helptext, Historic, Information, Send } from "@navikt/ds-icons";
import StyledLink from "./StyledLink";
import { useTranslation } from "react-i18next";

export default function Menu() {

  const { t } = useTranslation();

  return (
    <Panel className={styles.menu}>
      <StyledLink href="/">
        <Send aria-hidden />
        {t("menuSend")}
      </StyledLink>
      <StyledLink href="/history">
        <Historic aria-hidden />
        {t("menuHistory")}
      </StyledLink>
      <StyledLink href="/about">
        <Information aria-hidden />
        {t("menuAbout")}
      </StyledLink>
      <StyledLink href="/faq">
        <Helptext aria-hidden />
        {t("menuFaq")}
      </StyledLink>
    </Panel>
  );
}
