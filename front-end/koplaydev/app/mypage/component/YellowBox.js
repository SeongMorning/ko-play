import styles from "./YellowBox.module.scss";

export default function YellowBox(props) {
  return (
    <div
      className={styles.YellowBox}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
    >
      <div className={styles.YellowBoxTop}>
        {props.children}
      </div>
      <div className={styles.YellowBoxBottom} />
    </div>
  );
}
