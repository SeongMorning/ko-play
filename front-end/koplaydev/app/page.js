import Icon from "./Home/Icon";
import styles from "./page.module.scss";
import StartButton from "./Home/StartButton";
import Title from "./Home/Title";

export default function Home() {
  let title1 = Array.from("누구나 쉽게 배우는 한글");
  let title2 = Array.from("한글로 연결되는 우리, 문화로 풍부해지는 세상");

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
      <Icon />
    </>
  );
}
