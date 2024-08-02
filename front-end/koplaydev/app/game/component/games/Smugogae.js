import styles from "./Smugogae.module.scss";
import GameBg from "../../../component/background/GameBg";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import GameStartBtn from "@/app/game/component/GameStartBtn";
import Game from "../smugogae/Game";
// import Test from /"../smugogae/test";

// 스무고개 게임 페이지
export default function Smugogae() {
  return (
    <>
      <BackScoreBtn text="뒤로가기" left="1vw" top="3vh" />
      {/* <GameStartBtn /> */}
      {/* <video
        className={styles.myVideo}
        src="/character_dancing.mp4"
        autoPlay
        loop
      /> */}
      <img className={styles.myVideo} src="/character-dancingMachine.gif" />
      <div className={styles.container}>
        <Game />
      </div>
      <GameBg />
      <BackScoreBtn score="5" question="5" left="86vw" top="3vh" />
    </>
  );
}
