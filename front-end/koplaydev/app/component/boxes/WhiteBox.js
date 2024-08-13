import styles from "./WhiteBox.module.scss";

export default function WhiteBox(props) {
  return (
    <div
      className={styles.WhiteBox}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
    >
      <div className={`${styles.WhiteBoxTop} ${props.red ? styles.Red : ""} ${props.red2 ? styles.Red2 : ""}` }>{props.children}</div>
      <div className={styles.WhiteBoxBottom} />
    </div>
  );
}
