import styles from "./CenteredLoader.module.css";
import { Loader } from "@navikt/ds-react";

export default function CenteredLoader() {
  return (
    <div className={styles.loader}>
      <Loader size="3xlarge" title="venter..." variant="interaction" />
    </div>
  );
}
