// 단어비 게임 페이지.
import GameBg from "../../../component/background/GameBg";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import WordRainGame from "../WordRainGame";

export default function WordRain() {
  return (
    <>
      <GameBg />
      <BackScoreBtn score="10" question="10" left="86vw" top="3vh" />
      <WordRainGame />
    </>
  );
}
