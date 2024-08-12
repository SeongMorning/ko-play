"use client";

import { useDispatch } from "react-redux";
import styles from "./MainIcons.module.scss";
import { motion } from "framer-motion";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import effectSound from '@/app/utils/effectSound'

const planetButtonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/planetButtonSound.wav';
const planetButtonSound2 = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/planetButtonSound2.mp3';
const planetButtonSound3 = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/planetButtonSound3.wav';


export default function MainIcons() {
  const dispatch = useDispatch();
  const es = effectSound(planetButtonSound3, 0.5);

  return (
    <>
      <motion.img
        className={styles.hehe}
        src="/hehe.png"
        alt=""
        animate={{
          translateY: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 2,
          },
        }}
      />
      <div className={styles.normalGameContainer}>
        <motion.img
          className={styles.normalGame}
          src="/realnormal.png"
          alt=""
          onClick={() => {
            es.play();
            dispatch(changeModalIdx(1));
          }}
          whileHover={{
            scale: 1.1,
            rotate: "10deg",
          }}
        />
        <div className={styles.normalGameText}>일반게임</div>
      </div>
      <div className={styles.rankGameContainer}>
        <motion.img
          className={styles.rankGame}
          src="rank-game.png"
          alt=""
          onClick={() => {
            es.play();
            dispatch(changeModalIdx(4));
          }}
          whileHover={{
            scale: 1.1,
            rotate: "-10deg",
          }}
        />
        <div className={styles.rankGameText}>
          랭크
          <br />
          게임
        </div>
      </div>
      <motion.img
        className={styles.speechBubble}
        src="speechBubble.png"
        alt=""
        animate={{
          translateY: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 2,
          },
        }}
      />
    </>
  );
}
