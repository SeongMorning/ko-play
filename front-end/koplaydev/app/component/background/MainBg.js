import styles from "./MainBg.module.scss";

export default function MainBg() {
  return (
    <div className={styles.mainBg}>
      <img className={styles.mainBgWhite} src="/main-bg.png" alt="" />
    </div>
  );
}
