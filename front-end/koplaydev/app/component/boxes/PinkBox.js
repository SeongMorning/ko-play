import styles from "./PinkBox.module.scss";

export default function PinkBox(props) {
  return (
    <div className={styles.PinkBox}>
      <div
        className={styles.PinkBoxTop}
        style={{
          width: `${props.width}`,
          height: `${props.height}`,
        }}
      >{props.text}</div>
      <div
        className={styles.PinkBoxBottom}
        style={{
          width: `${props.width}`,
          height: `${props.height}`,
        }}
      />
    </div>
  );
}
