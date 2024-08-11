"use client";
import styles from "./CardFrontImage.module.scss";

// props : left, top, width, height
export default function CardFrontImage(props) {
  return (
    <div
      className={styles.cardOuter}
      style={{
        left: `${props.left}%`,
        top: `${props.top}%`,
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
    >
      <div style={{backgroundImage : `url(${props.imgSrc})`, backgroundSize : "cover"}} className={styles.cardInner}>
        {/* <img src={props.imgSrc} alt="Card Front" className={styles.cardImage} /> */}
      </div>
    </div>
  );
}
