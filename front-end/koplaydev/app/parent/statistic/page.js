import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import styles from "./page.module.scss";
import StatisticBg from "@/app/component/background/StatisticBg";


export default function Statistic() {
    return (
        <>
            <div><BackScoreBtn  className={styles.backButton} left={27} top={20} width="10vw" height="50px" /></div>
            <div className={styles.section}>
                <img className={styles.boardImg} src="/databoard.png" alt="" />
                <div className={styles.characterSection}>
                    <img className={styles.character} src="/hehe.png" alt="" />
                </div>
                <StatisticBg />
            </div>
        </>
    );
}