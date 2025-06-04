import styles from './ScoreChart.module.css';

interface ScoreChartProps {
  score: number;
  size?: number;
}

const ScoreChart: React.FC<ScoreChartProps> = ({ score, size = 120 }) => {
  const strokeDasharray = '100';
  const strokeDashoffset = 100 - (score);

  return (
    <div className={styles.container}>
      <div
        className={styles.chart}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <svg viewBox="0 0 36 36" className={styles.svg}>
          <path
            className={styles.bg}
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={styles.progress}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="19" y="21.5" className={styles.percentage} textAnchor="middle">
            {score}%
          </text>
        </svg>
      </div>
      <h3 className={styles.title}>Humanized Text</h3>
    </div>
  );
};

export default ScoreChart;
