import DetailBox from "./DetailBox";
import styles from "./MypageChildProfileCard.module.scss";

export default function MypageChildProfileCard( {isBgBlue, name} ) {

    return (
        <>
            <div className={`${styles.profileCardBg} ${isBgBlue ? styles.blueProfileCardBg : ''}`}>
            </div>
            <div className={`${styles.profileCard} ${isBgBlue ? styles.blueProfileCard : ''}`}>
                <img className={styles.settingIcon} src="/settingIcon2.png" />
                <div className={styles.profileInput}>
                    <img className={styles.profileImg} src="/hehe.png" />
                </div>
                    <h1 className={styles.profileName}>{name}</h1>
            </div>

            <div className={styles.inputTotal}>
                    <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text="분야별, 레벨별 정답률" width={220} height={92}/></div></div>
                    <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text="학습 진도 현황" width={220} height={92}/></div></div>
                    <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text="학습 성취도 비교" width={220} height={92}/></div></div>
                    <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text="주간 학습 리포트" width={220} height={92}/></div></div>
                    <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text="스냅샷" width={220} height={92}/></div></div>
                    </div>
        </>
    )
}