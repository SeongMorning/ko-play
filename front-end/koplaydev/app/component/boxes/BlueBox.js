import styles from "./BlueBox.module.scss";

export default function BlueBox(props) {
  return (
    <div
      className={styles.BlueBox}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
    >
      <div className={styles.BlueBoxTop}>{props.text}</div>
      <div className={styles.BlueBoxBottom} />
    </div>
  );
}
