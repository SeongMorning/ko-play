"use client";

import styles from "./PlayJellyBtn.module.scss";
import { motion } from "framer-motion";

// props : left, top, bg, shadow, imgSrc, onClick
export default function PlayJellyBtn(props) {
  return (
    <motion.div
      style={{ left: props.left, top: props.top }}
      className={styles.playJellyBtn}
      onClick={props.onClick}
      whileHover={{
        scale: 1.1,
      }}
    >
      <motion.div
        className={styles.playJellyBtnHover}
        whileTap={{
          translateY: "1vh",
          zIndex: 20,
          transition: {
            duration: 0.1,
          },
        }}
      >
        <div
          style={{ backgroundColor: `${props.bg}` }}
          className={styles.playJellyBtnTop}
        />
        <div className={styles.playJellyBtnDot1} />
        <div className={styles.playJellyBtnDot1} />
        <img src={props.imgSrc} alt="Button Icon" />
      </motion.div>
      <div
        style={{ backgroundColor: `${props.shadow}` }}
        className={styles.playJellyBtnBottom}
      />
    </motion.div>
  );
}
