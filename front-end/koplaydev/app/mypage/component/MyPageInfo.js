"use client";

import { useSelector } from "react-redux";
import ClickedPinkBtn from "./ClickedPinkBtn";
import styles from "./MyPageInfo.module.scss";
import YellowBox from "./YellowBox";
import Score from "./Score";
import Correct from "./Correct";
import { useEffect, useState } from "react";
import studentStatisticsAxios from "@/app/axios/studentStatisticsAxios";
import ExpBar from "./ExpBar";

let myPageList = ["최근 전적", "정답률", "경험치 변화", "레이팅"];

export default function MyPageInfo() {
  const translationWords = useSelector((state) => state.translationWords);

  const myPageIdx = useSelector((state) => state.myPage);

  useEffect(() => {
    myPageList[0] = translationWords.recent;
    myPageList[1] = translationWords.correctRatio;
    myPageList[2] = translationWords.expDiff;
    myPageList[3] = translationWords.rating;
  }, [translationWords]); 

  return (
    <div className={styles.MyPageInfo}>
      <div className={styles.MyPagePink}>
        {myPageList.map((data, index) => (
          <ClickedPinkBtn
            key={index}
            width={"100"}
            height={"15"}
            text={data}
            idx={index + 1}
          />
        ))}
      </div>
      <div className={styles.MyPageYellow}>
        <YellowBox width={"100"} height={"100"}>
          <MyPageSelector idx={myPageIdx} />
        </YellowBox>
      </div>
    </div>
  );
}

const MyPageSelector = (props) => {
  const userInfo = useSelector((state) => state.studentInfo);
  const [statistic, setStatistic] = useState([[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]]);
  const [expDB, setExpDB] = useState([])
  const [score, setScore] = useState([])
  useEffect(() => {
    const fetchstudentStatistics = async () => {
      const res = await studentStatisticsAxios(userInfo.id);
      const today = new Date();
      
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
    };
    fetchstudentStatistics();
  }, [userInfo]);
  if (props.idx === 1) {
    return <Score score={score}/>;
  } else if (props.idx === 2) {
    return <Correct statistic={statistic}/>;
  } else if (props.idx === 3) {
    return <ExpBar expDB={expDB}/>;
  } else {
    return "    2차개발 드가자";
  }
};
