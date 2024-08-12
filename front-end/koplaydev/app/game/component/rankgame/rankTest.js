// 단어비 게임 페이지.
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import RankWordRainGame from "../RankWordRainGame";
import OpenViduItem from "@/app/utils/openvidu/OpenVidu";
import RankGameBg from "@/app/component/background/RankGameBg";

export default function rankTest() {
  return (
    <>
      <OpenViduItem />
      <RankGameBg />
      <BackScoreBtn score="10" question="20" left="86vw" top="3vh" />
      <RankWordRainGame />
    </>
  );
}