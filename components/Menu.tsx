import styles from "./Menu.module.css";
import { Panel } from "@navikt/ds-react";
import { Helptext, Historic, Information, Send } from "@navikt/ds-icons";
import StyledLink from "./StyledLink";
import { useRouter } from "next/router";
import allTexts, { LocalesType } from "../src/allTexts";

export default function Menu() {

  const router = useRouter();
  const texts = allTexts[(router.locale || router.defaultLocale) as keyof LocalesType];

  return (
    <Panel className={styles.menu}>
      <StyledLink href="/">
        <Send aria-hidden />
        {texts.menuSend}
      </StyledLink>
      <StyledLink href="/history">
        <Historic aria-hidden />
        {texts.menuHistory}
      </StyledLink>
      <StyledLink href="/about">
        <Information aria-hidden />
        {texts.menuAbout}
      </StyledLink>
      <StyledLink href="/faq">
        <Helptext aria-hidden />
        {texts.menuFaq}
      </StyledLink>
    </Panel>
  );
}
