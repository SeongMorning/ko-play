"use client";

import gameResultAxios from "@/app/axios/gameResultAxios";
import { useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import FlipFlipGameJellyBtn from "./FlipFlipGameJellyBtn";
import CardFrontImage from "../CardFrontImage";
import styles from "./FlipFlipGameEnd.module.scss";

export default function FlipFlipGameEnd() {
  const userInfo = useSelector((state) => state.studentInfo);
  const wrongList = useSelector((state) => state.wrong);
  const Incorrect = useSelector((state) => state.incorrect);
  const correctCnt = useSelector((state) => state.correct);
  const gameIdx = useSelector((state) => state.game);
  const gameList = useSelector((state) => state.level);
  const exp = useSelector((state) => state.exp);
  const beforeExp = userInfo.exp % 100;
  const afterExp = beforeExp + exp;

  const getQuestion = () => {
    if (gameList[1] === 1 || gameList[1] === 2) {
      return 4;
    } else if (gameList[1] === 3 || gameList[1] === 4) {
      return 6;
    } else {
      return 8;
    }
  }

  const question = getQuestion();

  useEffect(() => {
    const postGameResult = async () => {
      const res = await gameResultAxios(
        gameIdx,
        correctCnt,
        question,
        gameList[1],
        exp
      );
    };
    postGameResult();
  }, []);

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

  const expAnimation = useAnimation();

  let nation = "kr-KR";
  if (userInfo.nation === "Thailand") {
    nation = "th-TH";
  } else if (userInfo.nation === "Vietnam") {
    nation = "vi-VN";
  } else if (userInfo.nation === "China") {
    nation = "zh-CN";
  }

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "kr-KR";
    window.speechSynthesis.speak(utterance);
  };

  const speakForeignWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = nation;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (afterExp > 100) {
      expAnimation
        .start({
          width: "100%",
          transition: {
            duration: (100 - beforeExp) / 30,
            ease: "easeInOut",
          },
        })
        .then(() => {
          expAnimation.set({ width: "0%" });
          expAnimation.start({
            width: `${afterExp % 100}%`,
            transition: {
              duration: (afterExp % 100) / 30,
              ease: "easeInOut",
            },
          });
        });
    } else {
      expAnimation.start({
        width: `${afterExp}%`,
        transition: {
          duration: exp / 30,
          ease: "easeInOut",
        },
      });
    }
  }, [afterExp, beforeExp, expAnimation]);

  // 중복된 항목을 제거한 wrongList
  //  const uniqueWrongList = Array.from(new Set(wrongList.map(item => item.idx)))
  //  .map(idx => wrongList.find(item => item.idx === idx));

  const uniqueWrongList = Array.from(new Set(wrongList.map(item => item.wordIdx)))
    .map(wordIdx => wrongList.find(item => item.wordIdx === wordIdx));

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
              width: `${beforeExp}%`,
            }}
            animate={expAnimation}
          ></motion.div>
        </motion.div>
        {Incorrect ? (
          <motion.div
            className={styles.Incorrect}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {uniqueWrongList.map((data, index) => (
              <motion.div
                key={index}
                className={styles.wrong}
                variants={wrongVariants}
              >
                <CardFrontImage width="18" height="100" imgSrc={data.imgUrl} />
                <div className={styles.KoreaWord}>
                  {data.wordKor}
                  <img
                    src="/WordSound.png"
                    onClick={() => speakWord(data.wordKor)}
                  />
                </div>
                <div className={styles.ForeignWord}>
                  {data.wordThailand}
                  <img
                    src="/WordSound.png"
                    onClick={() => speakForeignWord(data.wordThailand)}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className={styles.characterContainer}>
            <img
              className={styles.character}
              src="/character-dancingMachine.gif"
            />
            <div className={styles.videoBack}></div>
          </div>
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
        <FlipFlipGameJellyBtn
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