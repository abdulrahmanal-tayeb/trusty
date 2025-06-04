import { useHumanizerResultsStore } from '@/config/stores/stores';
import { useState, useEffect } from 'react';
import ResultContent from './components/ResultContent/ResultContent';
import ProgressSteps from './components/ProgressSteps/ProgressSteps';

const ANALYSIS_STEPS: string[] = ['Analyzing', 'Rewriting', 'Scoring'];
const STEP_TRANSITION_DELAY_MS = 2000;

export const ResultsSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { result, changes, score, isLoading, resetState, updateLoading } = useHumanizerResultsStore();

  // Whenever a new request starts (isLoading turns true), reset local state
  useEffect(() => {
    if (isLoading) {
      setCurrentStep(0);
      setIsCancelled(false);
      setIsComplete(false);
    }
  }, [isLoading]);

  // Handle step transitions and mark completion once the result arrives
  useEffect(() => {
    // If there's no active request and no result, do nothing
    if (!isLoading && !result) return;
    if (isCancelled) return;

    // While still loading, advance step‐by‐step until reaching the last index
    if (isLoading) {
      if (currentStep < ANALYSIS_STEPS.length - 1) {
        const timer = setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
        }, STEP_TRANSITION_DELAY_MS);
        return () => clearTimeout(timer);
      }
      // If currentStep === last index, stay here until result arrives
      return;
    }

    // Once loading finishes, if a result is present, mark the process complete
    if (result) {
      setIsComplete(true);
    }
  }, [currentStep, isCancelled, result, isLoading]);

  const handleCancel = (): void => {
    setCurrentStep(0);
    setIsCancelled(true);
    updateLoading(false);
    resetState();
  };

  const handleCopy = (): void => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  // Only render the section if we're loading or we have a (non‐empty) result
  if (!isLoading && !result) {
    console.log('RETURNING NULL!!!!', result);
    return null;
  }

  return (
    <section className="phases-section">
      <div className="section-header" style={{ marginBottom: '2em' }}>
        <h3>Results</h3>
        <hr style={{ opacity: 0.3, marginTop: '1em' }} />
      </div>

      <ProgressSteps
        steps={ANALYSIS_STEPS}
        currentStep={currentStep}
        isComplete={isComplete}
        isCancelled={isCancelled}
      />

      {!isComplete && !isCancelled && (
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      )}

      {/* Show result content only once loading has finished and result is non‐empty */}
      {!isLoading && result && (
        <ResultContent
          result={result}
          changes={changes}
          score={score ?? 50}
          onCopy={handleCopy}
        />
      )}
    </section>
  );
};


