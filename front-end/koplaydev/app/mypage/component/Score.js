import { useEffect, useState } from "react";
import styles from "./Score.module.scss";

export default function Score(props) {
  const [correctCnt, setCorrectCnt] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  const calcDay = (date) => {
    const today = new Date().getTime();
    const pastDate = new Date(date).getTime();

    const diff = Math.abs(today - pastDate);

    const diffMin = Math.floor(diff / (1000 * 60));
    const diffHour = Math.floor(diff / (1000 * 60 * 60));
    const diffInDay = Math.floor(diff / (1000 * 60 * 60 * 24));
    if(diffInDay >= 1){
      return `${diffInDay}일`;
    }else if(diffHour >= 1){
      return `${diffHour}시간`;
    }else{
      return `${diffMin}분`;
    }
  }

  useEffect(()=>{
    props.score.forEach((data)=>{
      setCorrectCnt(correctCnt + data.correct);
      setTotalCnt(totalCnt + data.question);
    })
  },[props.score])
  return (
    <div className={styles.ScoreMain}>
      <span className={styles.ScoreTotal}>
        정답개수 : {correctCnt}개, 총 문제 수 : {totalCnt}개
      </span>
      <div className={styles.recordBox}>
        {props.score.map((data, index) => 
          <div key={index} className={styles.recordItem}>
            <span>{data.gamePurpose}({data.gameLevel})</span>
            <div className={styles.recordInfo}>
                <span>총 문제 수 : {data.question}개, 정답 개수 : {data.correct}개</span>
                <span>정답률 {Math.floor((data.correct / data.question) * 100)}%</span>
            </div>
            <span>{`${calcDay(data.date)} 전`}</span>
          </div>
        )}
      </div>
    </div>
  );
}
