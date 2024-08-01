import styles from "./YellowBox.module.scss";

export default function YellowBox(props) {
  return (
    <>
      <div
        className={styles.YellowBox}
        style={{
          width: `${props.width}%`,
          height: `${props.height}%`,
        }}
      >
        <div className={styles.YellowBoxTop}>
          <img src="/star-bg.png" />
          <img src="/ufo-bg.png" />
          <img src="/planet-bg.png" />

          {props.children}
        </div>
        <div className={styles.YellowBoxBottom} />
      </div>
    </>
  );
}
