// 단어비 게임 페이지.
import GameBg from "../../../component/background/GameBg";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import GameStartBtn from "@/app/game/component/GameStartBtn";

export default function WordRain() {
  return (
    <>
      
      <BackScoreBtn text="뒤로가기" left="1vw" top="3vh" />
      <GameStartBtn />
      <GameBg />
      <BackScoreBtn score="10" question="10" left="86vw" top="3vh" />
    </>
  );
}