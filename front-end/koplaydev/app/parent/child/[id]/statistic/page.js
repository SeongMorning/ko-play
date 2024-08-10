"use client";
import { useSearchParams } from "next/navigation";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import styles from "./page.module.scss";
import StatisticBg from "@/app/component/background/StatisticBg";
import CorrectAnswerRate from "./component/CorrectAnswerRate";
import Correct from "./component/Correct";
import Progress from "./component/Progress";

export default function Statistic({ params }) {
  const id = params.id;
  const searchParams = useSearchParams();
  const viewIdx = searchParams.get("view");

  const renderContent = () => {
    switch (viewIdx) {
      case "1":
        return <Correct />;
      case "2":
        return <Progress />;
      case "3":
        return <CorrectAnswerRate />;
      case "snapshot":
        return <div>추가예정</div>;
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
        text="뒤로가기"
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
