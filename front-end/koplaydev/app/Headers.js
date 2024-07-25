import styles from "./Header.module.scss";

export default function Headers() {
  return (
    <header className={styles.header}>
      <img className={styles.korea} src="/korea-3.png" />
      <img className={styles.usa} src="/unitedstate-3.png" />
      <img className={styles.china} src="/china-3.png" />
      <img className={styles.vietnam} src="/vietnam-3.png" />
    </header>
  );
}
