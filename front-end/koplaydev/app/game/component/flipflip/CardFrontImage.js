import Image from "next/image";
import styles from "./CardFrontImage.module.scss";

export default function CardFrontImage({ imgSrc, alt, isMatch }) {
  return (
    <div
      className={`${styles.cardOuter} ${isMatch ? styles.match : ""}`}
    >
      <div className={styles.cardInner}>
        <Image src={imgSrc} alt={alt} className={styles.cardImage} />
      </div>
    </div>
  );
}
