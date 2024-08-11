import styles from "./CardFrontText.module.scss";

export default function CardFrontText({text, isMatch}) {
  return (
<div
      className={`${styles.cardOuter} ${isMatch ? styles.match : ""}`}
    >
<div className={styles.cardInner}>
        <span className={styles.cardText}>{text}</span>
      </div>
    </div>
  );
}

CardFrontText.js


