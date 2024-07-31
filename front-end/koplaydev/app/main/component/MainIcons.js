"use client";

import { useDispatch } from "react-redux";
import styles from "./MainIcons.module.scss";
import { motion } from "framer-motion";
import { changeModalIdx } from "@/redux/slices/modalSlice";

export default function MainIcons() {
  const dispatch = useDispatch();
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
      <motion.img
        className={styles.normalGame}
        src="/normal-game2.png"
        alt=""
        onClick={() => {
          dispatch(changeModalIdx(1));
        }}
        whileHover={{
          scale: 1.1,
          rotate: "10deg",
        }}
      />
      <motion.img className={styles.rankGame} src="rank-game.png" alt="" />
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
