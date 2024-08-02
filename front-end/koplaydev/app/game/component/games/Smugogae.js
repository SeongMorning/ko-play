import styles from "./Smugogae.module.scss";
import GameBg from "../../../component/background/GameBg";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import GameStartBtn from "@/app/game/component/GameStartBtn";
import CardFrontImage from "../CardFrontImage";
import CardFrontText from "../CardFrontText";

// 스무고개 게임 페이지
export default function Smugogae() {
  return (
    <>
      <BackScoreBtn text="뒤로가기" left="1vw" top="3vh" />
      {/* <GameStartBtn /> */}
      <video
        className={styles.myVideo}
        src="/character_dancing.mp4"
        autoPlay
        loop
      />
      <CardFrontText
        left="50vw"
        top="50vh"
        width="10vw"
        height="10vw"
        // imgSrc="/korea-3.png"
      />
      <GameBg />
      <BackScoreBtn score="5" question="5" left="86vw" top="3vh" />
    </>
  );
}
