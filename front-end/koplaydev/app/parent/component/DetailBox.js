import styles from "./DetailBox.module.scss";

export default function DetailBox(props) {
  return (
    <div
      className={styles.Box}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
      onClick={props.onClick}
    >
      <div className={styles.BoxTop}>{props.text}</div>
      <div className={styles.BoxBottom} />
    </div>
  );
}
