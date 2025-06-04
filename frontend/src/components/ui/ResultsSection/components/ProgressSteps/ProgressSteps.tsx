import styles from './ProgressSteps.module.css';

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
  isComplete: boolean;
  isCancelled: boolean;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  isComplete,
  isCancelled,
}) => {
  return (
    <div className={`${styles.phasesProgress} glassy-container`}>
      {steps.map((step, index) => {
        const isLastStep = index === steps.length - 1;
        const isDone = index < currentStep || (isLastStep && isComplete);
        const isCurrent = index === currentStep;
        const showSpinner = isCurrent && !isCancelled && !isComplete;

        return (
          <div key={index} className={styles.phaseItem}>
            <div
              className={`${styles.phaseCircle} ${
                isDone
                  ? styles.completed
                  : showSpinner
                  ? styles.active
                  : styles.pending
              }`}
            >
              {showSpinner ? <div className={styles.spinner} /> : index + 1}
            </div>
            <span className={styles.phaseLabel}>{step}</span>
            {index < steps.length - 1 && <div className={styles.phaseLine} />}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
