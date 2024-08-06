"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./SmuGameEnd.module.scss";
import CardFrontImage from "../CardFrontImage";
import { motion, useAnimation } from "framer-motion";
import GameJellyBtn from "@/app/game/component/GameJellyBtn";
import gameResultAxios from "@/app/axios/gameResultAxios";

export default function SmuGameEnd() {
  const userInfo = useSelector((state) => state.studentInfo);
  const wrongList = useSelector((state) => state.wrong);
  const Incorrect = useSelector((state) => state.incorrect);
  const exp = useSelector((state) => state.exp);
  const gameIdx = useSelector((state) => state.game);
  const gameList = useSelector((state) => state.level);
  const beforeExp = userInfo.exp % 100;
  const afterExp = 120;

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [showRewardButton, setShowRewardButton] = useState(false);

  useEffect(() => {
    const postGameResult = async () => {
      const res = await gameResultAxios(
        gameIdx,
        3 - wrongList.length,
        3,
        gameList[2],
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

  const expAnimation = useAnimation();

  useEffect(() => {
    if (afterExp > 100) {
      setShowLevelUp(true);
      expAnimation
        .start({
          width: "100%",
          transition: {
            duration: (100 - beforeExp) / 30,
            ease: "easeInOut",
          },
        })
        .then(() => {
          setShowRewardButton(true);
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

  const handleRewardClick = () => {
    setShowBlackScreen(true);
    setShowRewardButton(false);
    setTimeout(() => {
      document
        .querySelector(`.${styles.blackScreen}`)
        .classList.add(styles.show);
    }, 10);
  };

  return (
    <>
      {showBlackScreen && (
        <div className={styles.blackScreen}>
          <div className={styles.nationSelect}>
            <h2>국가를 선택하세요</h2>
            <button onClick={() => setShowBlackScreen(false)}>확인</button>
          </div>
        </div>
      )}
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
          {showLevelUp && (
            <div className={styles.levelUpImage}>
              <img src="/level-up.png" alt="Level Up" />
            </div>
          )}
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
                  {data.wordVietnam}
                  <img
                    src="/WordSound.png"
                    onClick={() => speakForeignWord(data.wordVietnam)}
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
      {showRewardButton && (
        <motion.div
          className={styles.RewardButton}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, delay: 5 } }}
        >
          <button onClick={handleRewardClick}>보상 열기</button>
        </motion.div>
      )}
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
