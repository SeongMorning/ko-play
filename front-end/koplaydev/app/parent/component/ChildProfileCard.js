import styles from "./ChildProfileCard.module.scss";

export default function ChildProfileCard( {isBgBlue, name, birth} ) {

    return (
        <>
            <div className={`${styles.profileCardBg} ${isBgBlue ? styles.blueProfileCardBg : ''}`}>
            </div>
            <div className={`${styles.profileCard} ${isBgBlue ? styles.blueProfileCard : ''}`}>
                <img className={styles.closeButton} src="close.png" alt="" />
                <div className={styles.profileInput}>
                    <img className={styles.profileImg} src="hehe.png" alt="" />
                </div>
                    <h1 className={styles.profileName}>{name}</h1>
                    <h2 className={styles.profileBirth}>{birth}</h2> 
            </div>
        </>
    )
}