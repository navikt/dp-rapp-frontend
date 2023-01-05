import { Alert } from "@navikt/ds-react";

export type ErrorProps = {
  showError?: boolean;
  error?: string;
}

export default function Error(props: ErrorProps) {
  if (props.showError) {
    return (
      <Alert variant="error">{props.error}</Alert>
    );
  } else {
    return <></>;
  }

}
