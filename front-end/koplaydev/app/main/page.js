"use client"

import AlbumFameBg from "../component/background/AlbumFameBg";
import MainBg from "../component/background/MainBg";
import FameBtn from "./component/FameBtn";
import MainIcons from "./component/MainIcons";
import MainMenu from "./component/MainMenu";
import MainModal from "./component/MainModal";
import Profile from "./component/Profile";
import useSound from "@/app/utils/useSound";
import { useEffect } from "react";


const mainBGM = '/audios/mainBGM.mp3';
const mainBGM2 = '/audios/mainBGM2.wav';

export default function Main() {

    useSound(mainBGM2, 0.6, 2000);  

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
