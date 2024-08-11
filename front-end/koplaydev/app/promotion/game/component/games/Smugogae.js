import styles from "./Smugogae.module.scss";
import GameBg from "@/app/component/background/GameBg";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import GameStartBtn from "@/app/game/component/GameStartBtn";
import SmuGame from "../smugogae/SmuGame";
// import Test from /"../smugogae/test";

// 스무고개 게임 페이지
export default function Smugogae() {
  return (
    <>
      {/* <BackScoreBtn text="뒤로가기" left="1vw" top="3vh" /> */}
      <BackScoreBtn score="3" question="3" left="86vw" top="3vh" />
      <GameBg />
      <SmuGame />
    </>
  );
}
