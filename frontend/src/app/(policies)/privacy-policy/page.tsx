import styles from './page.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Privacy Policy</h1>
      <p className={styles.lol}>You won't read it, but anyway...</p>

      <section className={styles.section}>
        <h2 className={styles.subheading}>1. Information We Collect</h2>
        <p className={styles.paragraph}>
          We do not collect any personally identifiable information. The text you input into the application is processed temporarily for the sole purpose of generating humanized content. We do not store, share, or sell this data.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>2. Usage Data</h2>
        <p className={styles.paragraph}>
          We may collect limited technical information such as browser type, operating system, and anonymized usage statistics to improve our services. This data does not include any personal information or user-submitted content.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>3. Cookies</h2>
        <p className={styles.paragraph}>
          We may use cookies or similar technologies to enhance the user experience. You can disable cookies through your browser settings if you prefer not to allow them.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>4. Third-Party Services</h2>
        <p className={styles.paragraph}>
          If third-party services (e.g., analytics or AI APIs) are used, their privacy policies apply independently. We ensure that such integrations respect user privacy and do not retain personally identifiable data.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>5. Data Security</h2>
        <p className={styles.paragraph}>
          We take reasonable measures to protect your data during transmission and processing. However, please be aware that no method of transmission over the internet is 100% secure.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>6. Changes to This Policy</h2>
        <p className={styles.paragraph}>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>7. Contact</h2>
        <p className={styles.paragraph}>
          If you have any questions or concerns about this Privacy Policy, please contact us at info@amtcode.com.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
