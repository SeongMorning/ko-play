// import { useEffect, useState } from "react";
// import styles from "./Score.module.scss";
// import parentChildStatisticsAxios from "@/app/axios/parentChildStatisticsAxios";

// export default function Progress() {
//   const [recordList, setRecordList] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await parentChildStatisticsAxios("/child/statistics");
//         const data = response.data;

//         // 변환된 데이터를 recordList 형식으로 변환
//         const transformedRecordList = data[0].map((item) => ({
//           title: item.gamePurpose,
//           correct: item.correctAnswer,
//           time: item.date,
//         }));

//         setRecordList(transformedRecordList);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const totalCorrect = recordList.reduce((sum, record) => sum + record.correct, 0);
//   const totalQuestions = recordList.reduce((sum, record) => sum + record.totalQuestions || 10, 0); // defaulting totalQuestions to 10 if undefined

//   return (
//     <div className={styles.ScoreMain}>
//       <span className={styles.ScoreTotal}>
//         정답개수 : {totalCorrect}개, 총 문제 수 : {totalQuestions}개
//       </span>
//       <div className={styles.recordBox}>
//         {recordList.map((data, index) => (
//           <div key={index} className={styles.recordItem}>
//             <span>{data.title}</span>
//             <div className={styles.recordInfo}>
//               <span>총 문제 수 : 10개, 정답 개수 : {data.correct}개</span>
//               <span>정답률 {Math.round((data.correct / 10) * 100)}%</span>
//             </div>
//             <span>{data.time}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
