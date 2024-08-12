"use client"

import AlbumFameBg from "../component/background/AlbumFameBg";
import MainBg from "../component/background/MainBg";
import FameBtn from "./component/FameBtn";
import MainIcons from "./component/MainIcons";
import MainMenu from "./component/MainMenu";
import MainModal from "./component/MainModal";
import Profile from "./component/Profile";
import useSound from "@/app/utils/useSound";

const mainBGM = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/mainBGM.mp3';
const mainBGM2 = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/mainBGM2.wav';

export default function Main() {

   useSound(mainBGM2, 1, 0);  

  return (
    <>
      <AlbumFameBg/>
      <MainModal/>
      <FameBtn />
      <MainMenu/>
      <MainBg />
      <MainIcons />
      <Profile />
    </>
  );
}
