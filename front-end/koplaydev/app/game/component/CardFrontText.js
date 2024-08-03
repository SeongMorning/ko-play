"use client";
import styles from "./CardFrontText.module.scss";

// props : left, top, width, height, text
export default function CardFrontText(props) {
  return (
    <div
      className={styles.cardOuter}
      styles={{
        left: `${props.left}`,
        top: `${props.top}`,
        width: `${props.width}`,
        height: `${props.height}`,
      }}
    >
      <div className={styles.cardInner}>
        <span>{props.text}</span>
      </div>
    </div>
  );
}
