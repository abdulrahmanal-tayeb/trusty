import Logo from '@/components/assets/Logo';
import styles from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Lamira's Footer
 */
const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                {/* Logo Section */}
                <div className={styles.leftSection}>
                    <Image width={150} height={70} src="/logos/logo.svg" alt="Trusty logo" />
                </div>

                {/* Links Section */}
                <div className={styles.linksSection}>
                    <Link href="/privacy-policy" className={styles.footerLink}>
                        Privacy Policy
                    </Link>
                    <Link href="https://github.com/your-org/your-repo" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                        Clone Project
                    </Link>
                    <Link href="/download" className={styles.footerLink}>
                        Download App
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;