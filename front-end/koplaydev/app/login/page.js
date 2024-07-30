import styles from "./page.module.scss";
import JellyBtn from "./component/JellyBtn";
import PromLoginBg from "../component/background/PromLoginBg";

export default function Login() {
  return (
    <>
      <main className={styles.main}>
        <img className={styles.logo} src="/logo.png" />
        <div className={styles.statusButtonContainer}>
          <JellyBtn
            width={""}
            height={""}
            bg={"#ffd6e0"}
            shadow={"#e07a93"}
            text={"부모님"}
          />
          <JellyBtn
            width={""}
            height={""}
            bg={"#A2D2FF"}
            shadow={"#4DA3F3"}
            text={"학생"}
          />
        </div>
      </main>
      <PromLoginBg />
    </>
  );
}
