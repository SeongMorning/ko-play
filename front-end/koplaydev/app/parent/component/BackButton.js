"use client"

import { useSelector } from "react-redux";
import styles from "./BackButton.module.scss";

export default function BackButton() {
    const translationWords = useSelector((state) => state.translationWords);

    return (
        <div className={styles.backButton}>
            <img className={styles.triangle} src="/triangle.png" alt="뒤로가기" />
            <span className={styles.backText}>{translationWords.backScoreBtn}</span>
        </div>
    );
}
