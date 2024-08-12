"use client"

import BackScoreBtn from "../component/buttons/BackScoreBtn";
import AlbumFameBg from "../component/background/AlbumFameBg";
import styles from "./page.module.scss";
import Embla from "./component/Embla/Embla";
import useSound from "@/app/utils/useSound";

const albumBGM = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/albumBGM.wav';

export default function Album() {
  // useSound(albumBGM, 0.8, 2000);
  useSound(albumBGM, 0.8, 0);

  return (
    <>
      <BackScoreBtn text="뒤로가기" left="1vw" top="1vh" />
      <div className={styles.emblaCarousel}>
        <Embla />
      </div>
      <AlbumFameBg />
    </>
  );
}
