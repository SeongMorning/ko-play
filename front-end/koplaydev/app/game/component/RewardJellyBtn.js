"use client";
import { motion } from "framer-motion";
import styles from "./RewardJellyBtn.module.scss";

export default function RewardJellyBtn(props) {
  return (
    <motion.div
      className={styles.LevelJellyBtn}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
        bottom: `${props.bottom}vh`,
      }}
      whileHover={{
        scale: [1, 1.1, 1],
        transition: {
          duration: 0.3,
        },
      }}
      onClick={props.onClick}
    >
      <motion.div
        className={styles.LevelJellyBtnHover}
        whileTap={{
          translateY: "6px",
        }}
      >
        <div
          className={styles.LevelJellyBtnTop}
          style={{
            background: `${props.bg}`,
            color: props.color,
          }}
        >
          {props.text}
        </div>
        <div className={styles.LevelJellyBtnDot} />
        <div className={styles.LevelJellyBtnDot2} />
      </motion.div>
      <div
        className={styles.LevelJellyBtnBottom}
        style={{ background: `${props.shadow}` }}
      />
    </motion.div>
  );
}
