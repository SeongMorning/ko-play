import styles from "./CardFrontText.module.scss";

export default function CardFrontText(props) {
  return (
    <div className={styles.cardOuter}>
      <div className={styles.cardInner}>
        <span className={styles.cardText}>{props.text}</span>
      </div>
    </div>
  );
}
