"use client";
import styles from "./GameIcons.module.scss";
import { motion } from "framer-motion";

export default function GameIcons() {
  return (
    <>
      <motion.img
        className={styles.star}
        src="/Star-game-bg.png"
        style={{
          left: "10vw",
          top: "20vh",
        }}
        animate={{
          translateX: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 2,
          },
        }}
      />
      <motion.img
        className={styles.star}
        src="/Star-game-bg.png"
        style={{
          left: "20vw",
          top: "40vh",
        }}
        animate={{
          translateY: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 1.5,
          },
        }}
      />
      <motion.img
        className={styles.star}
        src="/Star-game-bg.png"
        style={{
          left: "8vw",
          top: "60vh",
        }}
        animate={{
          translateX: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 3,
          },
        }}
      />
      <motion.img
        className={styles.star}
        src="/Star-game-bg.png"
        style={{
          right: "25vw",
          top: "20vh",
        }}
        animate={{
          translateX: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 2,
          },
        }}
      />
      <motion.img
        className={styles.star}
        src="/Star-game-bg.png"
        style={{
          right: "13vw",
          top: "25vh",
        }}
        animate={{
          translateY: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 1.5,
          },
        }}
      />
      <motion.img
        className={styles.star}
        src="/Star-game-bg.png"
        style={{
          right: "8vw",
          top: "40vh",
        }}
        animate={{
          translateX: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 3,
          },
        }}
      />
      <img className={styles.rocket} src="/rocket-game-bg.png" />
      <img className={styles.planet} src="/planet-game-bg.png" />
    </>
  );
}
