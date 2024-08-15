"use client"

import { useSelector } from "react-redux";
import AlbumFameBg from "../component/background/AlbumFameBg";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import Cabinet from "./component/Cabinet";
import useSound from "@/app/utils/useSound";

const avatarBGM = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/albumBGM.wav';

export default function Avatar() {
  const translationWords = useSelector((state) => state.translationWords);
  useSound(avatarBGM, 0.8, 0);

  return (
    <>
      <BackScoreBtn text={translationWords.backScoreBtn} left="1vw" top="2vh" />
      <Cabinet />
      <AlbumFameBg />
    </>
  );
}
