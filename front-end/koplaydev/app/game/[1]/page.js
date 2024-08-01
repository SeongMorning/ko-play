// 단어비 게임 페이지.
import styles from "./page.module.scss";
import GameBg from "../../component/background/GameBg";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import GameStartBtn from "@/app/game/component/GameStartBtn";

export default function Game1() {
  return (
    <>
      <BackScoreBtn text="뒤로가기" left="1vw" />
      <GameStartBtn />
      <GameBg />
      <BackScoreBtn score="10" question="10" left="86vw" />
    </>
  );
}
