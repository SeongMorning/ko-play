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
      style={{
        left: props.left,
        top: props.top,
        cursor: props.score ? "default" : "pointer",
      }}
    >
      <motion.div
        className={styles.BackScoreBtnTop}
        whileTap={
          props.score
            ? {}
            : {
                translateY: "0.5vh",
                translateX: "-0.2vw",
                transition: {
                  duration: 0.1,
                },
              }
        }
      >
        {props.score ? (
          `점수 : ${props.score} / ${props.question}`
        ) : (
          <img src="/Back.png" />
        )}
        {props.score ? null : props.text}
      </motion.div>
      <div className={styles.BackScoreBtnBottom} />
    </div>
  );
}
