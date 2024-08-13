"use client";

import { useSelector } from "react-redux";
import CompleteBox from "./CompleteBox";
import DetailBox from "./DetailBox";
import styles from "./InputChildInfo.module.scss";
import insertChildAxios from "@/app/axios/insertChildAxios";
import effectSound from '@/app/utils/effectSound'

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';
const keydownSound = "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/keydownSound.wav";

export default function InputChildInfo({ onClose, onAllClose, childInfo, setChildInfo }) {
    const translationWords = useSelector((state) => state.translationWords);
    const buttonEs = effectSound(buttonSound, 1);
    const keydownEs = effectSound(keydownSound, 1);

    // 닫기 버튼 클릭 시 실행되는 함수
    const handleClose = () => {
        buttonEs.play();
        // 상태 초기화
        setChildInfo({
            name: '',
            id: '',
            pw: '',
            birth: '',
        });
        // 모달 닫기
        onAllClose();
    };

    const createProfile = () => {
        buttonEs.play();
        onClose();
    };

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.modalBg}></div>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    {/* 닫기 버튼에 handleClose 핸들러 추가 */}
                    <h2>{translationWords.childRegister}</h2>
                    <img className={styles.closeButton} onClick={handleClose} src="close.png" alt="Close" />
                    <img className={styles.star} src="Star-bg.png" alt="" />
                    <img className={styles.planet} src="planet-bg.png" alt="" />
                    <img className={styles.ufo} src="ufo-bg.png" alt="" />
                    <div className={styles.inputTotal}>
                    <div className={styles.inputContainer}>
                            <div className={styles.detailBox}>
                                <DetailBox text={translationWords.name} width={68} height={92} />
                            </div>
                            <div>
                                <input
                                    className={styles.input}
                                    value={childInfo.name}
                                    onChange={(e) => {
                                        keydownEs.play();
                                        setChildInfo((prevState) => ({
                                            ...prevState,
                                            name: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text={translationWords.id} width={68} height={92} /></div> <div><input
                            className={styles.input}
                            onChange={(e) => {
                                keydownEs.play();
                                setChildInfo((prevState) => ({
                                    ...prevState,
                                    id: e.target.value,
                                }))
                            }}
                            value={childInfo.id}
                        /></div></div>
                        <div className={styles.inputContainer}><div className={styles.detailBox}><DetailBox text={translationWords.pw} width={68} height={92} /></div> <div><input
                            className={styles.input}
                            value={childInfo.pw}
                            onChange={(e) => {
                                keydownEs.play();
                                setChildInfo((prevState) => ({
                                    ...prevState,
                                    pw: e.target.value,
                                }))
                            }}
                        /></div></div>
                        <div className={styles.inputContainer}>
                            <div className={styles.detailBox}>
                                <DetailBox text={translationWords.birth} width={68} height={92} />
                            </div>
                            <div>
                                <input type="date"
                                    className={styles.input}
                                    value={childInfo.birth}
                                    onChange={(e) => {
                                        setChildInfo((prevState) => ({
                                            ...prevState,
                                            birth: e.target.value,
                                        }))
                                    }}
                                    max={new Date().toISOString().split("T")[0]} // 오늘 날짜까지만 선택 가능
                                /></div></div>
                    </div>
                    <div className={styles.generateBoxContainer} onClick={createProfile}>
                        <CompleteBox text={translationWords.next} width={46} height={88} />
                    </div>
                </div>
            </div>
        </>
    );
}
