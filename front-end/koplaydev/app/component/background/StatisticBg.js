import styles from "./StatisticBg.module.scss";

export default function StatisticBg() {
    return (
        <div className={styles.statisticBg}>
            <img className={styles.statisticBgGround} src="/ground-parent-bg.png" alt=""/>
            <img className={styles.statisticBgStars} src="/stars-parent-bg.png" alt="" />
            <img className={styles.statisticBgPlanet} src="/brownPlanet-parent-bg.png" alt="" />
            <img className={styles.statisticBgConsole} src="/console-parent-bg.png" alt="" />
        </div>
    );
}