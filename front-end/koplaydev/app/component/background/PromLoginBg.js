"use client";

import styles from "./PromLoginBg.module.scss";
import { motion } from "framer-motion";

export default function PromLoginBg() {
  return (
    <>
      <motion.img
        className={styles.ufo}
        src="/ufo.svg"
        animate={{
          translateY: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 2,
          },
        }}
      />
      <motion.img
        className={styles.saturn}
        src="/saturn.svg"
        animate={{
          translateY: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 1,
          },
        }}
      />
      <motion.img
        className={styles.gamepadIcon}
        src="/gamepadIcon.svg"
        animate={{
          translateY: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 1.5,
          },
        }}
      />
      <motion.img
        animate={{
          translateY: [0, 5, 3, 1, 0],
          transition: {
            repeat: Infinity,
            duration: 4,
          },
        }}
        className={styles.cloud}
        src="/cloud.png"
      />
    </>
  );
}
