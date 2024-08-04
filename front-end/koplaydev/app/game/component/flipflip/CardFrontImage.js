import Image from "next/image";
import styles from "./CardFrontImage.module.scss";

export default function CardFrontImage({ imgSrc, alt }) {
  return (
    <div className={styles.cardOuter}>
      <div className={styles.cardInner}>
        <Image src={imgSrc} alt={alt} className={styles.cardImage} />
      </div>
    </div>
  );
}

