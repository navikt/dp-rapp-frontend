import styles from "./CustomStepper.module.css";

export type CustomStepperProps = {
  numberOfSteps: number;
  currentStep: number;
}

export default function CustomStepper(props: CustomStepperProps) {
  const width = 100 * props.currentStep / props.numberOfSteps + "%";

  return (
    <div className={styles.customStepper}>
      <div className="navds-label">
        Steg {props.currentStep} av {props.numberOfSteps}
      </div>
      <div className={styles.customStepperContent}>
        <div className={styles.customStepperBall} />
        <div className={styles.customStepperLine} />
        <div className={styles.customStepperBall} />

        <div className={styles.customStepperOverlay} style={{ width: width }} />
      </div>
    </div>
  );
}
