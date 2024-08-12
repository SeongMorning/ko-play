"use client"

import { useSelector } from "react-redux";
import AlbumFameBg from "../component/background/AlbumFameBg";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import Cabinet from "./component/Cabinet";

export default function Avatar() {
  const translationWords = useSelector((state) => state.translationWords);

  return (
    <>
      <BackScoreBtn text={translationWords.backScoreBtn} left="1vw" top="2vh" />
      <Cabinet />
      <AlbumFameBg />
    </>
  );
}
