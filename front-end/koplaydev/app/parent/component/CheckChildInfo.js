import CompleteBox from "./CompleteBox";
import DetailBox from "./DetailBox";
import styles from "./CheckChildInfo.module.scss";

// 자녀 정보 확인 모달
export default function CheckChildInfo({ onClose }) {

    return (
        <>
            <div className={styles.overlay} ></div>
            <div className={styles.modalBg}></div>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>자녀 정보</h2>
                    {/* close x표시 이미지 뺌 */}
                    {/* <img className={styles.closeButton} src="/close.png" alt="" /> */}
                    <img className={styles.star} src="/Star-bg.png" alt="" />
                    <img className={styles.planet} src="/planet-bg.png" alt="" />
                    <img className={styles.ufo} src="/ufo-bg.png" alt="" />
                    <div className={styles.inputTotal}>
                        <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text="이름" width={68} height={92} /></div> <div className={styles.box}>김철수</div></div>
                        <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text="아이디" width={68} height={92} /></div> <div className={styles.box}>ssafy</div></div>
                        <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text="비밀번호" width={68} height={92} /></div> <div className={styles.box}>ssafy</div></div>
                        <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text="생년월일" width={68} height={92} /></div> <div className={styles.box}>2024.07.30</div></div>
                    </div>
                    <div className={styles.checkBoxContainer} onClick={onClose}>
                        <CompleteBox text="확인" width={46} height={88} />
                    </div>
                </div>
            </div>
        </>
    );
}