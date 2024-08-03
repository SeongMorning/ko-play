"use client";

import { useSelector } from "react-redux";
import styles from "./SmuGameEnd.module.scss";
import { motion } from "framer-motion";
import GameJellyBtn from "@/app/game/component/GameJellyBtn";

export default function SmuGameEnd() {
  const wrongList = useSelector((state) => state.wrong);
  const Incorrect = useSelector((state) => state.incorrect);
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const wrongVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <>
      <div className={styles.EndPage}>
        <motion.div
          className={styles.ExpBar}
          initial={{
            opacity: 0,
          }}
          animate={{
            translateY: `${Incorrect ? null : "120%"}`,
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
        >
          <motion.div
            className={styles.Exp}
            initial={{
              width: 0,
            }}
            animate={{
              width: "50%",
              transition: {
                delay: `${Incorrect ? "0" : "1"}`,
                duration: 3,
                ease: "easeInOut",
              },
            }}
          ></motion.div>
        </motion.div>
        {Incorrect ? (
          <motion.div
            className={styles.Incorrect}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {wrongList.map((data, index) => (
              <motion.div
                className={styles.wrong}
                variants={wrongVariants}
                key={index}
              >
                <div className={styles.KoreaWord}>
                  {data.word}
                  <img src="/WordSound.png" />
                </div>
                <div className={styles.ForeignWord}>
                  {data.word2}
                  <img src="/WordSound.png" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <img
            className={styles.character}
            src="/character-dancingMachine.gif"
          />
        )}
      </div>
      <motion.div
        className={styles.GoMain}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
            delay: 5,
          },
        }}
      >
        <GameJellyBtn
          width="100"
          height="100"
          bg="#FFD6E0"
          shadow="#E07A93"
          text="나가기"
        />
      </motion.div>
    </>
  );
}
