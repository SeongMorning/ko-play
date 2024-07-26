import styles from "./page.module.scss";
import ZellyButton from "../component/buttons/ZellyButton";
import Icon from "../Home/Icon";

export default function Login() {
  return (
    <>
      <main className={styles.main}>
        <img className={styles.logo} src="/logo.png" />
        <div className={styles.statusButtonContainer}>
          <ZellyButton bg={"#ffd6e0"} shadow={"#e07a93"} text={"부모님"} />
          <ZellyButton bg={"#A2D2FF"} shadow={"#4DA3F3"} text={"학생"} />
        </div>
      </main>
      <Icon />
    </>
  );
}
