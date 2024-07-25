import styles from "./page.module.scss";
import StartButton from "./StartButton";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.promotionTitle}>
          <h1>누구나 쉽게 배우는 한글</h1>
          <h3>한글로 연결되는 우리, 문화로 풍부해지는 세상</h3>
        </div>
        <div className={styles.logo}>
          <img src="/logo.png" />
        </div>
        <div className={styles.startButtons}>
          <StartButton />
          <StartButton />
        </div>
        <div className={styles.bottomBackGround}>
          <img className={styles.ufo} src="/ufo.svg" />
          <img className={styles.saturn} src="/saturn.svg" />
          <img className={styles.gamepadIcon} src="/gamepadIcon.svg" />
          <img className={styles.cloud} src="/cloud.png" />
        </div>
      </main>
    </>
  );
}
