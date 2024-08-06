import styles from "./CardFrontImage.module.scss";

export default function CardFrontImage({ imgSrc, isMatch }) {
  return (
    <div
      className={`${styles.cardOuter} ${isMatch ? styles.match : ""}`}
    >
      <div className={styles.cardInner}>
        <img src={imgSrc} className={styles.cardImage} />
      </div>
    </div>
  );
}
