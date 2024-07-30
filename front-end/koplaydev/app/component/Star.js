"use client";

import styles from "./Star.module.scss";
import { motion } from "framer-motion";

//props : left, top, right, width
export default function Star(props) {
  return (
    <motion.img
      className={styles.star}
      src="/Star-game-bg.png"
      style={{
        left: props.left,
        top: props.top,
        right: props.right,
        width: props.width,
      }}
      animate={{
        translateX: [0, -5, 0],
        transition: {
          repeat: Infinity,
          duration: props.duration,
        },
      }}
    />
  );
}
