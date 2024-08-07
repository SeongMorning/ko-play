import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import styles from "./page.module.scss";
import StatisticBg from "@/app/component/background/StatisticBg";
// import CorrectAnswerRate from "./CorrectAnswerRate";
// import Comparison from "../[id]/statistic/Comparison";
// import Progress from "./Progress";


export default function Statistic() {
    return (
        <>
            <div><BackScoreBtn className={styles.backButton} left={27} top={20} text="뒤로가기" /></div>
            <div className={styles.section}>
                <div className={styles.data}>
                {/* <CorrectAnswerRate />
                < */}
                {/* <Progress /> */}
                {/* <Comparison /> */}
                <img className={styles.boardImg} src="/databoard.png" alt="" />
                </div>
                <div className={styles.characterSection}>
                    <img className={styles.bubble} src="/bubble2.png" alt="" />
                    <img className={styles.character} src="/hehe.png" alt="" />
                </div>
                <StatisticBg />
            </div>
        </>
    );
}