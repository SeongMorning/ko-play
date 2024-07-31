import styles from "./FirstVisitModal.module.scss"; 

export default function FirstVisitModal() {
    // DB parent 테이블의 nationality가 null이면 모달?
    return (
        <>
            <div className={styles.overlay} ></div>
            <div className={styles.modalBg}></div>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h1>당신의 국적을 선택하세요</h1>
                    <div className={styles.imgContent}>
                    <img src="korea-parent-choice.png" alt="" />
                    <img src="thailand-parent-choice.png" alt="" />
                    <img src="china-parent-choice.png" alt="" />
                    <img src="vietnam-parent-choice.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );   
}