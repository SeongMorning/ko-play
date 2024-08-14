"use client";

import styles from "./Title.module.scss";
import { motion } from "framer-motion";
import useSound from "@/app/utils/useSound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import translations from "@/app/axios/translations";
import { changeTranslationWords } from "@/redux/slices/translationWords";
import currNation, { changeCurrNation } from "@/redux/slices/currNationSlice";
import { Router } from "next/router";

const loginBGM = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/loginBGM.wav';
const loginBGM2 = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/loginBGM2.mp3';

export default function Title() {
  const dispatch = useDispatch();
  useSound(loginBGM2, 0.6, 0);
  const translationWords = useSelector((state) => state.translationWords);

  const [title1, setTitle1] = useState([]);
  const [title2, setTitle2] = useState([]);

  useEffect(() => {
    // console.log(translationWords.title1)
    if (translationWords.title1) {
      setTitle1(Array.from(translationWords.title1));
      setTitle2(Array.from(translationWords.title2));
    }
  }, [translationWords]);

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };


  return (
    <div className={styles.promotionTitle}>
      {title1 && title1.length > 0 && (
        <motion.div
          className={styles.promotionTitle1}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {title1.map((data, index) => (
            <motion.span key={index} variants={letterVariants}>
              {data}
            </motion.span>
          ))}
        </motion.div>
      )}
      {title2 && title2.length > 0 && (
        <motion.div className={styles.promotionTitle2}>
          {title2.map((data, index) =>
            index < 12 ? (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {data}
              </motion.span>
            ) : (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                {data}
              </motion.span>
            )
          )}
        </motion.div>
      )}
    </div>
  );
}
