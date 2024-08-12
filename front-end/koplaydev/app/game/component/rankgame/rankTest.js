// 단어비 게임 페이지.
import GameBg from "../../../component/background/GameBg";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import WordRainGame from "../WordRainGame";
import RankWordRainGame from "../RankWordRainGame";
import OpenViduItem from "@/app/utils/openvidu/OpenVidu";

export default function rankTest() {
  return (
    <>
      <OpenViduItem />
      <GameBg />
      <BackScoreBtn score="10" question="20" left="86vw" top="3vh" />
      <RankWordRainGame />
    </>
  );
}