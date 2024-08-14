"use client";
import { useSearchParams } from "next/navigation";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import styles from "./page.module.scss";
import StatisticBg from "@/app/component/background/StatisticBg";
import CorrectAnswerRate from "./component/CorrectAnswerRate";
import Correct from "./component/Correct";
import Progress from "./component/Progress";
import useSound from "@/app/utils/useSound";
import { useSelector } from "react-redux";
import { OpenAiStreamUtill } from "@/app/utils/OpenAiStreamUtill";
import { OpenAiUtill } from "@/app/utils/OpenAiUtill";
import { useState, useEffect } from "react";
import Album from "./component/Album";

const mypageBGM2 =
  "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/mypageBGM2.mp3";

export default function Statistic({ params }) {
  const translationWords = useSelector((state) => state.translationWords);
  const parent = useSelector((state) => state.parent);

  useSound(mypageBGM2, 1, 0, 0.9);

  const statisticData = useSelector((state) => state.parentChaildStatistic);
  const [curStatistic, setCurStatistic] = useState(statisticData);
  const [aiText, setAiText] = useState(null);
  // const [parentNation, setParentNation] = useState(parent.nationality);
  const [parentNation, setParentNation] = useState("Korea");

  useEffect(() => {
    // setParentNation(parent.nationality);
  }, [parent]);

  const id = params.id;
  const searchParams = useSearchParams();
  const viewIdx = searchParams.get("view");

  const getExplanation = async (question, parentNation) => {

    useEffect(() => {

      if (statisticData) {
        // setParentNation(parent.nationality);
        console.log(statisticData);
        let question = "";

        switch (viewIdx) {
          case "1":
            question = `I'll explain the data for ${JSON.stringify(
              statisticData[0]
            )}. 
          The date is the date the game was played. 
          The key "gamePurpose" is composed of reading, listening, and speaking. 
          The key "level" is from 1 to 5. It gets harder as you go to 5. 
          The key "correctAnswer" is the number of correct answers, and the key "totalQuestion" is the total number of questions according to gamePurpose on that date. 
          We're only interested in getting the data interpreted correctly. 
          Please brief the data by gamePurpose, Date and correct Ratio.Except Level in short and simple words. And suggest the direction of study.
            `;
            if(statisticData[0].length === 0){
              question = null;
            }
            break;
          case "2":
            // 목적별 전체 판수.
            // selectedData = statisticData[1]; // 진도 현황 데이터
            question = `I'll explain the data for ${JSON.stringify(
              statisticData[0]
            )}. 
          The date is the date the game was played. 
          The key "gamePurpose" is composed of reading, listening, and speaking. 
          The key "level" is from 1 to 5. It gets harder as you go to 5. 
          The key "correctAnswer" is the number of correct answers, and the key "totalQuestion" is the total number of questions according to gamePurpose on that date. 
          We're only interested in getting the data interpreted correctly. 
          Please brief the data by gamePurpose and Level in short and simple words. And suggest the direction of study.
            `;
            if(statisticData[0].length === 0){
              question = null;
            }
            break;
          case "3":
            // 전체 유저의 목적별 정답률 correct/total
            // selectedData = statisticData[2]; // 성취도 비교 데이터
            question = `I'll explain two data for 
          ${JSON.stringify(statisticData[0])},
          \\n 
          this is my child's data.
          The date is the date the game was played. 
          The key "gamePurpose" is composed of reading, listening, and speaking. 
          The key "level" is from 1 to 5. It gets harder as you go to 5. 
          The key "correctAnswer" is the number of correct answers, and the key "totalQuestion" is the total number of questions according to gamePurpose on that date. 
          ${JSON.stringify(statisticData[2])}.
          \\n 
          this is other user's data.
          the key "date" is the date the game was played.
          the key "correct" is the number of correct answers
          the key "total" is the number of total questions
          The key "gamePurpose" is composed of reading, listening, and speaking. 
          But the difference of two data is that second one is for the total users.
          
          We're only interested in getting the data interpreted correctly. 
          Please brief the weekly data based on difference of the total users' and my child's in short and simple words.
          we don't need actual data.  
          But suggest the direction of study.
            `;
            if(statisticData[0].length === 0){
              question = null;
            }
            break;
          default:
            break;
        }

        if (question) {
          // 전체 유저의 목적별 정답률 correct/total
          // getExplanation(selectedData, question, parentNation).then(
            streamPrompt(question)
          getExplanation(question, parentNation).then((explanation) => {
            setAiText(explanation);
          });
        }else{
          setAiText("아이가 아직 플레이 하지 않았습니다.");
        }
      }
    }, [statisticData, viewIdx, parent]);

    const renderContent = () => {
      switch (viewIdx) {
        case "1":
          return <Correct />;
        case "2":
          return <Progress />;
        case "3":
          return <CorrectAnswerRate />;
        case "4":
          return <Album id={id} />;
        default:
          return <div>선택된 내용이 없습니다.</div>;
      }
    };

    return (
      <>
        <BackScoreBtn
          className={styles.backButton}
          left={27}
          top={20}
          text={translationWords.backScoreBtn}
        />
        <div className={styles.data}>
          <img className={styles.boardImg} src="/databoard.png" alt="" />
          {renderContent()}
        </div>
        <div className={styles.characterSection}>
          <div className={styles.bubbleContainer}>
            <img className={styles.bubble} src="/bubble2.png" alt="" />
            <div className={styles.aiText}>{aiText}</div>
          </div>
          <img className={styles.character} src="/hehe.png" alt="" />
        </div>
        <StatisticBg />
      </>
    );
  }
}

// "use client";
// import { useSearchParams } from "next/navigation";
// import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
// import styles from "./page.module.scss";
// import StatisticBg from "@/app/component/background/StatisticBg";
// import CorrectAnswerRate from "./component/CorrectAnswerRate";
// import Correct from "./component/Correct";
// import Progress from "./component/Progress";
// import useSound from "@/app/utils/useSound";
// import { useSelector } from "react-redux";
// import { OpenAiUtill } from "@/app/utils/OpenAiUtill";
// import { useState, useEffect } from "react";
// import Album from "./component/Album";

// const mypageBGM2 =
//   "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/mypageBGM2.mp3";

// export default function Statistic({ params }) {
//   const translationWords = useSelector((state) => state.translationWords);
//   const parent = useSelector((state) => state.parent);
//   const statisticData = useSelector((state) => state.parentChaildStatistic);
//   const [curStatistic, setCurStatistic] = useState(statisticData);
//   const [aiText, setAiText] = useState("");
//   const [parentNation, setParentNation] = useState("Korea");

//   useSound(mypageBGM2, 1, 0, 0.9);

//   useEffect(() => {
//     setParentNation(parent.nationality);
//   }, [parent]);

//   const id = params.id;
//   const searchParams = useSearchParams();
//   const viewIdx = searchParams.get("view");

//   // 스트리밍을 활용한 AI 응답 처리 함수
//   const getExplanation = async (question, parentNation) => {
//     try {
//       const res = await OpenAiUtill.streamPrompt(question);
//       res.data.on("data", (data) => {
//         const lines = data
//           .toString()
//           .split("\n")
//           .filter((line) => line.trim() !== "");
//         for (const line of lines) {
//           const message = line.replace(/^data: /, "");
//           if (message === "[DONE]") {
//             return; // 스트림 종료
//           }
//           try {
//             const parsed = JSON.parse(message);
//             setAiText((prevText) => prevText + parsed.choices[0].text);
//           } catch (error) {
//             console.error("스트림 메시지를 파싱할 수 없습니다", message, error);
//           }
//         }
//       });
//     } catch (error) {
//       console.error("OpenAI 요청 중 오류 발생", error);
//     }
//   };

//   useEffect(() => {
//     if (statisticData) {
//       let question = "";

//       switch (viewIdx) {
//         case "1":
//           question = `Explain the data for ${JSON.stringify(
//             statisticData[0]
//           )}...`; // 간단히 설명
//           break;
//         case "2":
//           question = `Explain the data for ${JSON.stringify(
//             statisticData[1]
//           )}...`;
//           break;
//         case "3":
//           question = `Explain the data for ${JSON.stringify(
//             statisticData[2]
//           )}...`;
//           break;
//         default:
//           break;
//       }

//       if (question) {
//         getExplanation(question, parentNation);
//       }
//     }
//   }, [statisticData, viewIdx, parentNation]);

//   const renderContent = () => {
//     switch (viewIdx) {
//       case "1":
//         return <Correct />;
//       case "2":
//         return <Progress />;
//       case "3":
//         return <CorrectAnswerRate />;
//       case "4":
//         return <Album id={id} />;
//       default:
//         return <div>선택된 내용이 없습니다.</div>;
//     }
//   };

//   return (
//     <>
//       <BackScoreBtn
//         className={styles.backButton}
//         left={27}
//         top={20}
//         text={translationWords.backScoreBtn}
//       />
//       <div className={styles.data}>
//         <img className={styles.boardImg} src="/databoard.png" alt="" />
//         {renderContent()}
//       </div>
//       <div className={styles.characterSection}>
//         <div className={styles.bubbleContainer}>
//           <img className={styles.bubble} src="/bubble2.png" alt="" />
//           <div className={styles.aiText}>{aiText}</div>
//         </div>
//         <img className={styles.character} src="/hehe.png" alt="" />
//       </div>
//       <StatisticBg />
//     </>
//   );
// }
