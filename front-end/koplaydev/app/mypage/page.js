"use client"

import { useSelector } from "react-redux";
import AlbumFameBg from "../component/background/AlbumFameBg";
import MainBg from "../component/background/MainBg";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import MyPageInfo from "./component/MyPageInfo";
import useSound from "@/app/utils/useSound";

// const mypageBGM = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/mypageBGM.mp3';
const mypageBGM2 = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/mypageBGM2.mp3'

export default function mypage() {
  const translationWords = useSelector((state) => state.translationWords);


  useSound(mypageBGM2, 0.2, 0, 0.9);

  return (
    <>
      <AlbumFameBg/>
      <BackScoreBtn text={translationWords.backScoreBtn} top="2vh"left="2vw"/>
      <MainBg/>
      <MyPageInfo />
    </>
  );
}
