import styles from "./Score.module.scss";

let recordList = [
  {
    title: "읽기",
    correct: 5,
    time: "30분전",
  },
  {
    title: "말하기",
    correct: 3,
    time: "30분전",
  },
  {
    title: "말하기",
    correct: 6,
    time: "30분전",
  },
  {
    title: "듣기",
    correct: 1,
    time: "30분전",
  },
  {
    title: "읽기",
    correct: 10,
    time: "30분전",
  },
];

export default function Score() {
  return (
    <div className={styles.ScoreMain}>
      <span className={styles.ScoreTotal}>
        정답개수 : 0개, 총 문제 수 : 0개
      </span>
      <div className={styles.recordBox}>
        {recordList.map((data, index) => 
          <div className={styles.recordItem}>
            <span>{data.title}</span>
            <div className={styles.recordInfo}>
                <span>총 문제 수 : 10개, 정답 개수 : {data.correct}개</span>
                <span>정답률 {data.correct * 10}%</span>
            </div>
            <span>{data.time}</span>
          </div>
        )}
      </div>
    </div>
  );
}

