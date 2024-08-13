import CompleteBox from "./CompleteBox";
import styles from "./CheckChildInfo.module.scss";
import DetailBox from "./DetailBox";
import { useSelector } from "react-redux";

// 자녀 정보 확인 모달
export default function CheckChildInfo({ onClose, child }) {
    const translationWords = useSelector((state) => state.translationWords);

    return (
        <>
            <div className={styles.overlay} ></div>
            <div className={styles.modalBg}></div>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>{translationWords.childInfo}</h2>
                    {/* close x표시 이미지 뺌 */}
                    {/* <img className={styles.closeButton} src="/close.png" alt="" /> */}
                    <img className={styles.star} src="/Star-bg.png" alt="" />
                    <img className={styles.planet} src="/planet-bg.png" alt="" />
                    <img className={styles.ufo} src="/ufo-bg.png" alt="" />
                    <div className={styles.inputTotal}>
                        <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text={translationWords.name} width={68} height={92} /></div> <div className={styles.box}>{child.name}</div></div>
                        <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text={translationWords.id} width={68} height={92} /></div> <div className={styles.box}>{child.id}</div></div>
                        {/* <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text="비밀번호" width={68} height={92} /></div> <div className={styles.box}>{child.schoolName}</div></div> */}
                        <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text={translationWords.birth} width={68} height={92} /></div> <div className={styles.box}>{child.birth}</div></div>
                    </div>
                    <div className={styles.checkBoxContainer} onClick={onClose}>
                        <CompleteBox text={translationWords.ok} width={46} height={88} />
                    </div>
                </div>
            </div>
        </>
    );
}