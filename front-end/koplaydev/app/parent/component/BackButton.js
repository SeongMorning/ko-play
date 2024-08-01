import styles from "./BackButton.module.scss";

export default function BackButton() {
    return (
        <div className={styles.backButton}>
            <img className={styles.triangle} src="/triangle.png" alt="뒤로가기" />
            <span className={styles.backText}>뒤로가기</span>
        </div>
    );
}
