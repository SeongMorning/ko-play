import styles from "./YellowRoundBtn.module.scss";

export default function YellowRoundBtn(props) {
  return (
    <div className={styles.YellowRoundBtn}>
      <div
        style={{
          width: `${props.width}`,
          height: `${props.height}`,
        }}
        className={styles.YellowRoundBtnBottom}
      />
      <div
        style={{
          width: `${props.width}`,
          height: `${props.height}`,
        }}
        className={styles.YellowRoundBtnTop}
      >
        점수 : {props.correct} / {props.question}
      </div>
    </div>
  );
}
