"use client";
import styles from "./YellowRoundBtn.module.scss";
import { motion } from "framer-motion";

export default function YellowRoundBtn(props) {
  // 뒤로가기 기능 단순 구현
  const handleClick = () => {
    if (props.text) {
      history.go(-1);
    }
  };
  return (
    <div
      className={styles.YellowRoundBtn}
      onClick={handleClick}
      style={{ left: props.left, top: props.top }}
    >
      <div className={styles.YellowRoundBtnBottom} />
      <div className={styles.YellowRoundBtnTop}>
        {props.score ? `점수 : ${props.score} / ${props.question}` : props.text}
      </div>
    </div>
  );
}
