import styles from "./AddProfileCard.module.scss";

export default function AddProfileCard() {
    // const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className={styles.addProfileCardBg}>
                <img className={styles.plusIcon} src="plus.png" alt="" />
            </div>
        </>
    )
}