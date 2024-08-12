"use client";

import { useRouter } from "next/navigation";
import styles from "./JellyBtn.module.scss";
import { motion } from "framer-motion";
import effectSound from '@/app/utils/effectSound'

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';

export default function JellyBtn(props) {
  const router = useRouter();
  const es = effectSound(buttonSound, 1);

  return (
    <motion.div
      className={styles.JellyBtn}
      onClick={() => {
        es.play();
        
        if (props.onClick) {
          props.onClick();
        }
      }}
      whileHover={{
        scale: 1.1,
      }}
    >
      <motion.div
        className={styles.JellyBtnHover}
        whileTap={{
          translateY: "1vh",
          transition: {
            duration: 0.1,
          },
        }}
      >
        <div className={styles.JellyBtnDot1} />
        <div className={styles.JellyBtnDot2} />
        <div
          style={{ background: `${props.bg}` }}
          className={styles.JellyBtnMain}
        />
        <h1 className={styles.text}>{props.text}</h1>
      </motion.div>
      <div
        style={{ background: `${props.shadow}` }}
        className={styles.JellyBtnShadow}
      />
    </motion.div>
  );
}
