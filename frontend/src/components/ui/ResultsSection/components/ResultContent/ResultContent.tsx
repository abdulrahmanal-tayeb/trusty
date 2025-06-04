import styles from './ResultContent.module.css';
import ScoreChart from '../ScoreChart/ScoreChart';
import ChangesList from '../ChangesList/ChangesList';
import { useEffect, useRef } from 'react';
import Button from '@/components/common/Button/Button';

interface ResultContentProps {
    result: string;
    changes: string[] | null;
    score: number;
    onCopy: () => void;
}

const ResultContent: React.FC<ResultContentProps> = ({ result, changes, score, onCopy }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [result]);

    return (
        <div className={`${styles.resultSection} glassy-container`}>
            <div className={`${styles.resultBox} glassy-container`}>
                <textarea
                    ref={textareaRef}
                    readOnly
                    value={result}
                    className={styles.readonlyInput}
                />
                <div className={styles.copyActions}>
                    <Button
                        props={{
                            className: styles.iconButton,
                            title: "Copy text"
                        }}
                        onClick={onCopy}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                        </svg>
                    </Button>

                </div>
            </div>

            <div className={`${styles.analysisBox} glassy-container`}>
                <ScoreChart score={score} size={200} />
            </div>

            <div className={styles.changesSection}>
                <h3>Changes</h3>
                <div style={{ marginTop: '1em' }}>
                    <ChangesList changes={changes} />
                </div>
            </div>
        </div>
    );
};

export default ResultContent;
