import styles from "./ParentBg.module.scss";

export default function ParentBg() {
    return (
        <div className={styles.parentBg}>
            <img className={styles.parentBgGround} src="/ground-parent-bg.png" alt=""/>
            <img className={styles.parentBgStars} src="/stars-parent-bg.png" alt="" />
            <img className={styles.parentBgUfo} src="/blueUfo-parent-bg.png" alt="" />
            <img className={styles.parentBgPlanet} src="/brownPlanet-parent-bg.png" alt="" />
            <img className={styles.parentBgConsole} src="/console-parent-bg.png" alt="" />
        </div>
    );
}