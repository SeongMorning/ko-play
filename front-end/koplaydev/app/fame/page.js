"use client"

import { useSelector } from "react-redux";
import AlbumFameBg from "../component/background/AlbumFameBg";
import MainBg from "../component/background/MainBg";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import Podium from "./component/Podium";
import useSound from "@/app/utils/useSound";

export default async function fame() {
  const translationWords = useSelector((state) => state.translationWords);

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
