import styles from "./StyledLink.module.css";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export type StyledLinkProps = {
  href: string;
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
