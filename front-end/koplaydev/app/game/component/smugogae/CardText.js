"use client";
import { useState, useEffect } from "react";
import styles from "./CardText.module.scss";

// props : left, top, width, height, text, onClick, isCorrect, imgUrl
export default function CardText(props) {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (props.isCorrect === null) {
      setColor("");
    } else if (props.isCorrect) {
      setColor("correct");
    } else {
      setColor("incorrect");
    }
  }, [props.isCorrect]);

  return (
    <div
      className={styles.cardOuter}
      style={{
        left: `${props.left}`,
        top: `${props.top}`,
        width: `${props.width}`,
        height: `${props.height}`,
      }}
      onClick={props.onClick}
    >
      <div className={`${styles.cardInner} ${styles[color]}`}>
        <img
          src={props.imgUrl}
          alt="카드 이미지"
          className={styles.cardImage}
        />
      </div>
    </div>
  );
}
