import styles from "./StatusButton.module.scss";

export default function StatusButton() {
  return (
    <div className={styles.statusButton}>
      <div className={styles.statusButtonShadow} />
      <div className={styles.statusButtonMain} />
      <div className={styles.text}>부모님</div>
      <div className={styles.statusButtonDot} />
      <div className={styles.statusButtonDot2} />
    </div>
  );
}
