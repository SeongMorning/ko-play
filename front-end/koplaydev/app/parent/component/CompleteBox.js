import styles from "./CompleteBox.module.scss";

export default function CompleteBox(props) {
  return (
    <div
      className={styles.Box}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
    >
      <div className={styles.BoxTop}>{props.text}</div>
      <div className={styles.BoxBottom} />
    </div>
  );
}
