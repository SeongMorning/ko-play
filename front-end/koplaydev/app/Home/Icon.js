"use client";

import styles from "./Icon.module.scss";
import { motion } from "framer-motion";

export default function Icon() {
  return (
    <>
      <motion.img
        className={styles.ufo}
        src="/ufo.svg"
        initial="hidden"
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
      <motion.img className={styles.cloud} src="/cloud.png" />
    </>
  );
}
