import styles from "./YellowBox.module.scss";

export default function YellowBox(props) {
  return (
    <div className={styles.YellowBox}>
      <div
        style={{
          width: `${props.width}`,
          height: `${props.height}`,
        }}
        className={styles.YellowBoxTop}
      >
        <img src="/star-bg.png" />
        <img src="/ufo-bg.png" />
        <img src="/planet-bg.png" />
        {props.children}
      </div>
      <div
        style={{
          width: `${props.width}`,
          height: `${props.height}`,
        }}
        className={styles.YellowBoxBottom}
      />
    </div>
  );
}