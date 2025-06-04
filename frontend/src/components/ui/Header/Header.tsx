import Image from 'next/image';
import styles from './Header.module.css';

const Header: React.FC = () => (
  <header className={styles.header}>
    <Image width={350} height={170} src="/logos/logo.svg" alt="Trusty logo" />
    <p className={styles.subtitle}>
      Transform AI-generated content into natural, authentic human writing with customizable language styles and tones.
    </p>
  </header>
);

export default Header;
