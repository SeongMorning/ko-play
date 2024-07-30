import PromLoginBg from "./component/background/PromLoginBg";
import styles from "./page.module.scss";
import StartButton from "./promotion/component/StartButton";
import Title from "./promotion/component/Title";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Title />
        <img className={styles.logo} src="/logo.png" />
        <StartButton
          fontColor={"black"}
          bg={"#78F860"}
          shadow={"#23C505"}
          text={"회원"}
        />
        <StartButton
          fontColor={"white"}
          bg={"#FF61A3"}
          shadow={"#FF237F"}
          text={"비회원"}
        />
      </main>
      <PromLoginBg />
    </>
  );
}
