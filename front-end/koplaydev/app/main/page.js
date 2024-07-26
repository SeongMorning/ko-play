import styles from "./page.module.scss";
import SelectStatus from "./SelectStatus";
import LoginInput from "../component/loginInput";

export default function Main() {
  return (
    <main className={styles.main}>
      <img className={styles.logo} src="/logo.png" />
      <SelectStatus />
      <LoginInput />
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
