import { useSelector } from "react-redux";
import styles from "./Progress.module.scss";

export default function Progress() {
  // 데이터 가져오기
  const recordList = useSelector((state) => state.parentChaildStatistic)[0] || [];

  // 데이터 그룹화: 날짜 및 분야별
  const groupedData = recordList.reduce((acc, record) => {
    const { date, gamePurpose, correctAnswer = 0, totalQuestion = 10 } = record;
    const key = `${date}-${gamePurpose}`;

    if (!acc[key]) {
      acc[key] = {
        date,
        gamePurpose,
        totalCorrect: 0,
        totalQuestions: 0
      };
    }

    acc[key].totalCorrect += correctAnswer;
    acc[key].totalQuestions += totalQuestion;

    return acc;
  }, {});

  // 그룹화된 데이터를 배열로 변환
  const groupedArray = Object.values(groupedData);

  // 날짜별로 집계
  const aggregatedByDate = groupedArray.reduce((acc, group) => {
    const { date, gamePurpose, totalCorrect, totalQuestions } = group;

    if (!acc[date]) {
      acc[date] = {
        date,
        total: {
          '말하기': { totalCorrect: 0, totalQuestions: 0 },
          '읽기': { totalCorrect: 0, totalQuestions: 0 },
          '듣기': { totalCorrect: 0, totalQuestions: 0 }
        }
      };
    }

    acc[date].total[gamePurpose].totalCorrect += totalCorrect;
    acc[date].total[gamePurpose].totalQuestions += totalQuestions;

    return acc;
  }, {});

  // 집계된 데이터를 배열로 변환
  const aggregatedArray = Object.values(aggregatedByDate);

  return (
    <div className={styles.ScoreMain}>
      {aggregatedArray.map((group, index) => (
        <div key={index} className={styles.recordBox}>
          <span className={styles.groupDate}>{group.date}</span>
          {Object.keys(group.total).map(purpose => {
            const { totalCorrect, totalQuestions } = group.total[purpose];
            const accuracy = totalQuestions ? (totalCorrect / totalQuestions) * 100 : 0;
            if(totalQuestions != 0){
              return (
                <div key={purpose} className={styles.recordItem}>
                  <span>분야: {purpose}</span>
                  <span>총 문제 수: {totalQuestions}개</span>
                  <span>정답 개수: {totalCorrect}개</span>
                  <span>정답률: {Math.round(accuracy)}%</span>
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
}
