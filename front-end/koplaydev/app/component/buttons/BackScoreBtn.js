"use client";
import styles from "./BackScoreBtn.module.scss";
import { motion } from "framer-motion";

// props : left, top, score, question, text
export default function BackScoreBtn(props) {
  // 뒤로가기 기능 단순 구현
  const handleClick = () => {
    if (props.text) {
      history.go(-1);
    }
  };
  return (
    <div
      className={styles.BackScoreBtn}
      onClick={handleClick}
      style={{ left: props.left, top: props.top }}
    >
      <motion.div
        className={styles.BackScoreBtnTop}
        whileTap={{
          translateY: "0.5vh",
          zIndex: 20,
          transition: {
            duration: 0.1,
          },
          translateX: "-0.2vw",
          zIndex: 20,
          transition: {
            duration: 0.1,
          },
        }}
      >
        <img src="/Back.png" />
        {props.score ? `점수 : ${props.score} / ${props.question}` : props.text}
      </motion.div>
      <div className={styles.BackScoreBtnBottom} />
    </div>
  );
}
