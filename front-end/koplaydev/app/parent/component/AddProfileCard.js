import styles from "./AddProfileCard.module.scss";

export default function AddProfileCard() {

    return (
        <>
            <div className={styles.addProfileCardBg}>
                <img className={styles.plusIcon} src="plus.png" alt="" />
            </div>
        </>
    )
}