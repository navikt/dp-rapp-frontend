import styles from "./StyledLink.module.css";
import { useRouter } from "next/router";
import { Link } from "@navikt/ds-react";
import React from "react";

export type StyledLinkProps = {
  href?: string;
  children?: React.ReactNode;
}

export default function StyledLink(props: StyledLinkProps) {
  const router = useRouter();

  return (
    <Link href={props.href} className={(router.pathname === props.href) ? styles.active : ''}>
      {props.children}
    </Link>
  );
}
