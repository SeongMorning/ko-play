// 단어비 게임 페이지.
import styles from "./page.module.scss";
import GameBg from "../../component/background/GameBg";
import YellowRoundBtn from "@/app/component/buttons/YellowRoundBtn";
import GameStartBtn from "@/app/component/buttons/GameStartBtn";

export default function Game1() {
  return (
    <>
      <YellowRoundBtn text="뒤로가기" left="1vw" />
      <GameStartBtn />
      <GameBg />
      <YellowRoundBtn score="10" question="10" left="91vw" />
    </>
  );
}
