import AlbumFameBg from "../component/background/AlbumFameBg";
import MainBg from "../component/background/MainBg";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import Podium from "./component/Podium";
import useSound from "@/app/utils/useSound";

const fanfareBGM = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/fanfareBGM.wav';

export default async function fame() {

  useSound(fanfareBGM, 0.8, 0);

  return (
    <>
      <BackScoreBtn text={translationWords.backScoreBtn} left="1vw" top="1vh" />
      <Podium left="25vw" top="40vh" />
      {/* <Podium left="25vw" top="50vh" users={users} /> */}
      <AlbumFameBg />
      <MainBg />
    </>
  );
}
