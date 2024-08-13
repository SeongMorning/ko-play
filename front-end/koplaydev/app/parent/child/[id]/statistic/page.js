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
import { useState, useEffect } from "react";
import Album from "./component/Album";

const mypageBGM2 =
  "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/mypageBGM2.mp3";

export default function Statistic({ params }) {
  const translationWords = useSelector((state) => state.translationWords);

  useSound(mypageBGM2, 1, 0, 0.9);

  const statisticData = useSelector((state) => state.parentChaildStatistic);
  const [curStatistic, setCurStatistic] = useState(statisticData);
  const [aiText, setAiText] = useState(null);

  const parent = useSelector((state) => state.parent);
  const parentNation = parent.nationality;

  const id = params.id;
  const searchParams = useSearchParams();
  const viewIdx = searchParams.get("view");

  const getExplanation = async (curStatistic, question, parentNation) => {
    try {
      const msg = `나는 "${curStatistic}"에 대해서 초등학교 학부모에게 설명해야 해. ${question}과 ${parentNation}의 언어로 설명해줘.`;
      const result = await OpenAiStreamUtill.prompt(msg);
      console.log(result);
      return result.message.content;
    } catch (err) {
      console.error("Error fetching explanation:", err);
      return "응답을 가져오는 데 문제가 발생했습니다.";
    }
  };

  useEffect(() => {
    if (statisticData) {
      let question = "";
      let selectedData = null;
      switch (viewIdx) {
        case "1":
          selectedData = statisticData[0]; // 레벨별 정답률 데이터
          question = "레벨별 정답률을 분석하여";
          break;
        case "2":
          selectedData = statisticData[1]; // 진도 현황 데이터
          question = "진도 현황을 분석하여";
          break;
        case "3":
          selectedData = statisticData[2]; // 성취도 비교 데이터
          question = "성취도를 비교하여";
          break;
        default:
          break;
      }

      if (selectedData) {
        setCurStatistic(selectedData);
        getExplanation(selectedData, question, parentNation).then(
          (explanation) => {
            setAiText(explanation);
          }
        );
      }
    }
  }, [statisticData, viewIdx]);

  const renderContent = () => {
    switch (viewIdx) {
      case "1":
        return <Correct />;
      case "2":
        return <Progress />;
      case "3":
        return <CorrectAnswerRate />;
      case "4":
        return <Album id={id}/>;
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
        <img className={styles.bubble} src="/bubble2.png" alt="" />
        <img className={styles.character} src="/hehe.png" alt="" />
      </div>
      <StatisticBg />
    </>
  );
}
