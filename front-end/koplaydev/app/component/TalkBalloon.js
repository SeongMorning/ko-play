"use client";
import styles from "./TalkBalloon.module.scss";

export default function TalkBalloon(props) {
  return (
    <div
      className={styles.talkBalloonContainer}
      style={{
        left: props.left,
        right: props.right,
        top: props.top,
        bottom: props.bottom,
      }}
    >
      <img
        className={styles.talkBalloonImage}
        src="/talkBalloon.svg"
        alt="talk Balloon"
        style={{
          width: props.width,
          height: props.height,
        }}
      />
      <div className={styles.talkBalloonText}>{props.text}</div>
    </div>
  );
}
