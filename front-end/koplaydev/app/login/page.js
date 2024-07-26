import styles from "./page.module.scss";
import StatusButton from "./StatusButton";

export default function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <img src="/logo.png" />
      </div>
      <div className={styles.statusButtonContainer}>
        <StatusButton />
        <StatusButton />
      </div>
      <div className={styles.bottomBackGround}>
        <img className={styles.rocket} src="/rocket.svg" />
        <img className={styles.ufo} src="/ufo.svg" />
        <img className={styles.saturn} src="/saturn.svg" />
        <img className={styles.gamepadIcon} src="/gamepadIcon.svg" />
        <img className={styles.cloud} src="/cloud.png" />
      </div>
    </main>
  );
}
