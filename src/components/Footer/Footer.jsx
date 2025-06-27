import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.innerWrapper}>
        <div className={styles.leftText}>
          © 모여락<br />
          서울특별시 중구 세종대로 1234
        </div>
        <div className={styles.rightText}>
          문의 : 02-000-0000
        </div>
      </div>
    </footer>
  );
};

export default Footer;
