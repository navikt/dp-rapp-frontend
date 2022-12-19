export type CustomStepperProps = {
  numberOfSteps: number;
  currentStep: number;
}

export default function CustomStepper(props: CustomStepperProps) {
  return (
    <div className="customStepper">
      <div className="navds-label">
        Steg {props.currentStep} av {props.numberOfSteps}
      </div>
      <div className="customStepperContent">
        <div className="customStepperBall" />
        <div className="customStepperLine" />
        <div className="customStepperBall" />

        <div className="customStepperOverlay" style={{ width: 100 * props.currentStep / props.numberOfSteps + "%" }} />
      </div>
    </div>
  );
}