import PromLoginBg from "./component/background/PromLoginBg";
import styles from "./page.module.scss";
import MainModal from "./promotion/component/MainModal";
import StartButton from "./promotion/component/StartButton";
import Title from "./promotion/component/Title";
import ButtonsContainer from "./promotion/component/ButtonsContainer";

// app/page.js (서버 컴포넌트)
async function fetchData() {
  // 여기서 실제 데이터 패칭을 수행
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기 (데이터 패칭 시뮬레이션)
}

export default async function Home() {
  await fetchData(); // 데이터 패칭

  return (
    <>
      <main className={styles.main}>
        <Title />
        <img className={styles.logo} src="/logo.png" />
        <ButtonsContainer />
      </main>
      <MainModal />
      <PromLoginBg />
    </>
  );
}
