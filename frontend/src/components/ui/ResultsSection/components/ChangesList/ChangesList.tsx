import styles from "./ChangesList.module.css";

interface ChangesListProps {
    changes: string[] | null;
}

const ChangesList: React.FC<ChangesListProps> = ({ changes }) => {
    const changeItems: string[] = changes ?? ['No changes were logged.'];

    return (
        <ul className={styles.changeList}>
            {changeItems.map((change, idx) => (
                <li key={idx}>{change}</li>
            ))}
        </ul>
    );
};

export default ChangesList;