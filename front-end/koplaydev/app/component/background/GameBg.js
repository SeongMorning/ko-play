import styles from "./GameBg.module.scss";
import Star from "../Star";
import Cam from "@/app/avatar/component/Cam";
import OpenViduItem from "@/app/utils/openvidu/OpenVidu";

export default function GameBg() {
  return (
    <>
      <Star left="10vw" top="20vh" duration="2" />
      <Star left="20vw" top="40vh" duration="1.5" />
      <Star left="8vw" top="60vh" duration="3" />
      <Star right="25vw" top="20vh" duration="2" />
      <Star right="13vw" top="25vh" duration="1.5" />
      <Star right="8vw" top="40vh" duration="3" />
      <img className={styles.rocket} src="/rocket-game-bg.png" />
      <img className={styles.planet} src="/planet-game-bg.png" />
      <Cam right="2.7vh" bottom="1.3vh" width="17vw"/>
    </>
  );
}
