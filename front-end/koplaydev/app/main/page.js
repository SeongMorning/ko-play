import styles from "./page.module.scss";
import SelectStatus from "./SelectStatus";
import Icon from "../Home/Icon";
import LoginBox from "../component/LoginBox.js";

export default function Main() {
  return (
    <>
      <main className={styles.main}>
        <img className={styles.logo} src="/logo.png" />
        <SelectStatus />
        <LoginBox />
      </main>
      <Icon />
    </>
  );
}
