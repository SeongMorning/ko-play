import styles from "./ChildProfileCard.module.scss";

export default function ChildProfileCard() {

    return (
        <>
            <div className={styles.profileCardBg}>
            </div>
            <div className={styles.profileCard}>
                <div className={styles.profileInput}>
                    <img className={styles.profileImg} src="hehe.png" alt="" />
                </div>
                    <h1 className={styles.profileName}>김 철 수</h1>
                    <h2 className={styles.profileBirth}>2024.07.30</h2> 
            </div>
        </>
    )
}