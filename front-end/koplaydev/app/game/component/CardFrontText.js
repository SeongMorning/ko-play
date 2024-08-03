"use client";
import { useState, useEffect } from "react";
import styles from "./CardFrontText.module.scss";

// props : left, top, width, height, text, onClick, isCorrect
export default function CardFrontText(props) {
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
        <span>{props.text}</span>
      </div>
    </div>
  );
}
