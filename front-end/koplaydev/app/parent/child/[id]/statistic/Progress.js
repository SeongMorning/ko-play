import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Progress.module.scss";
import parentChildStatisticsAxios from "@/app/axios/parentChildStatisticsAxios";

export default function Progress({ childId }) {
  const [correctCnt, setCorrectCnt] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const [scoreData, setScoreData] = useState([]);

  const gameList = useSelector((state) => state.level);

  const getQuestion = () => {
    if (gameList[0]) {
      return 10;
    }
    if (gameList[1] === 1 || gameList[1] === 2) {
      return 4;
    } else if (gameList[1] === 3 || gameList[1] === 4) {
      return 6;
    } else if (gameList[1] === 5) {
      return 8;
    }
    if (gameList[2]) {
      return 3;
    }
    return 0;
  }

  const calcDay = (date) => {
    const today = new Date().getTime();
    const pastDate = new Date(date).getTime();

    const diff = Math.abs(today - pastDate);

    const diffMin = Math.floor(diff / (1000 * 60));
    const diffHour = Math.floor(diff / (1000 * 60 * 60));
    const diffInDay = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffInDay >= 1) {
      return `${diffInDay}일`;
    } else if (diffHour >= 1) {
      return `${diffHour}시간`;
    } else {
      return `${diffMin}분`;
    }
  }


  
  useEffect(() => {
    const fetchParentStatistics = async () => {
      try {
        const data = await parentChildStatisticsAxios(childId);

        function formatDate(date) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        }

        const getPastDate = (daysAgo) => {
          const today = new Date();
          const pastDate = new Date(today);
          pastDate.setDate(today.getDate() - daysAgo);
          return formatDate(pastDate);
        };

        if(res[2]){
          setScore(res[2]);
        }
  
  
        if(res[1]){
          setExpDB(res[1]);
        }
        
        if (res[0]) {
          for (let k = 0; k < 3; k++) {
            for (let i = 0; i < 5; i++) {
              for (let j = 0; j < 7; j++) {
                let list = res[0].filter((data) => data.date === getPastDate(j) && data.level === i+1);
                if(k===0){
                  list = list.filter((data) => data.gamePurpose === "말하기");
                }else if(k===1){
                  list = list.filter((data) => data.gamePurpose === "읽기");
                }else{
                  list = list.filter((data) => data.gamePurpose === "듣기");
                }
                if(list.length > 0){
                  statistic[k][i][j] = Math.floor((list[0].correctAnswer / list[0].totalQuestion) * 100)
                }else{
                  statistic[k][i][j] = 0;
                }
              }
            }
          }
        }

        // if (data && data[0]) {
        //   setScoreData(data[0]);

        //   const total = getQuestion();
        //   setTotalCnt(total);

        //   let correct = 0;
        //   data[0].forEach(item => {
        //     correct += item.count;
        //   });

        //   setCorrectCnt(correct);
        // }
      } catch (error) {
        console.error("데이터를 가져오는 도중 오류가 발생했습니다:", error);
      }
    }

    fetchParentStatistics();
  }, [childId, gameList]);

  return (
    <div className={styles.Main}>
      <span className={styles.ScoreTotal}>
        정답개수 : {correctCnt}개, 총 문제 수 : {totalCnt}개
      </span>
      <div className={styles.recordBox}>
        {scoreData.map((data, index) => 
          <div key={index} className={styles.recordItem}>
            <span>{data.purposeName}</span>
            <div className={styles.recordInfo}>
                <span>총 문제 수 : {data.totalQuestion}개, 정답 개수 : {data.correctAnswer}개</span>
                <span>정답률 {Math.floor((data.correctAnswe / data.totalQuestion) * 100)}%</span>
            </div>
            <span>{/* 날짜 데이터가 없다면 표시하지 않음 */}</span>
          </div>
        )}
      </div>
    </div>
  );
}
