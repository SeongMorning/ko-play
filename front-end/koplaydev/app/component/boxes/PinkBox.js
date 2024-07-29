import styles from "./PinkBox.module.scss";

export default function PinkBox(props) {
  return (
    <div
      className={styles.PinkBox}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
    >
      <div className={styles.PinkBoxTop}>{props.text}</div>
      <div className={styles.PinkBoxBottom} />
    </div>
  );
}
