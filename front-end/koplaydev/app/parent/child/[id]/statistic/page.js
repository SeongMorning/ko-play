"use client";
import { useSearchParams } from 'next/navigation';
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import styles from "./page.module.scss";
import StatisticBg from "@/app/component/background/StatisticBg";
import Comparison from "./Comparison";
import CorrectAnswerRate from './CorrectAnswerRate';
import Progress from './Progress';

export default function Statistic({params}) {
    const id = params.id;
    const searchParams = useSearchParams();
    const view = searchParams.get('view');

    if (!view) {
        console.error("유효하지 않은 뷰입니다.");
        return <div>유효하지 않은 뷰입니다.</div>;
    }

    const renderContent = () => {
        switch (view) {
            case 'correctAnswerRate':
                return <CorrectAnswerRate childId={id}/>;
            case 'progress':
                return <Progress childId={id}/>;
            case 'comparison':
                return <Comparison childId={id}/>;
            case 'snapshot':
                return <div>스냅샷 내용</div>;
            default:
                return <div>선택된 내용이 없습니다.</div>;
        }
    };

    return (
        <>
            <div>
                <BackScoreBtn className={styles.backButton} left={27} top={20} text="뒤로가기" />
            </div>
            <div className={styles.data}>
                <img className={styles.boardImg} src="/databoard.png" alt="" />
            </div>
            <div className={styles.section}>
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
