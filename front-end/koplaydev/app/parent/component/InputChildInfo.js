import { useState } from "react";
import { useDispatch } from "react-redux";
import CompleteBox from "./CompleteBox";
import DetailBox from "./DetailBox";
import styles from "./InputChildInfo.module.scss";
import insertChildAxios from "@/app/axios/insertChildAxios";

export default function InputChildInfo({ onClose, onAllClose, childInfo, setChildInfo }) {

    // 닫기 버튼 클릭 시 실행되는 함수
    const handleClose = () => {
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
        onClose();
    };

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.modalBg}></div>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>자녀 등록</h2>
                    {/* 닫기 버튼에 handleClose 핸들러 추가 */}
                    <img className={styles.closeButton} onClick={handleClose} src="close.png" alt="Close" />
                    <img className={styles.star} src="Star-bg.png" alt="" />
                    <img className={styles.planet} src="planet-bg.png" alt="" />
                    <img className={styles.ufo} src="ufo-bg.png" alt="" />
                    <div className={styles.inputTotal}>
                        <div className={styles.inputContainer}>
                            <div className={styles.detailBox}>
                                <DetailBox text="이름" width={68} height={92} />
                            </div>
                            <div>
                                <input
                                    className={styles.input}
                                    value={childInfo.name}
                                    onChange={(e) => {
                                        setChildInfo((prevState) => ({
                                            ...prevState,
                                            name: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.detailBox}>
                                <DetailBox text="아이디" width={68} height={92} />
                            </div>
                            <div>
                                <input
                                    className={styles.input}
                                    value={childInfo.id}
                                    onChange={(e) => {
                                        setChildInfo((prevState) => ({
                                            ...prevState,
                                            id: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.detailBox}>
                                <DetailBox text="비밀번호" width={68} height={92} />
                            </div>
                            <div>
                                <input
                                    className={styles.input}
                                    value={childInfo.pw}
                                    onChange={(e) => {
                                        setChildInfo((prevState) => ({
                                            ...prevState,
                                            pw: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.detailBox}>
                                <DetailBox text="생년월일" width={68} height={92} />
                            </div>
                            <div>
                                <input
                                    type="date"
                                    className={styles.input}
                                    value={childInfo.birth}
                                    onChange={(e) => {
                                        setChildInfo((prevState) => ({
                                            ...prevState,
                                            birth: e.target.value,
                                        }));
                                    }}
                                    max={new Date().toISOString().split("T")[0]} // 오늘 날짜까지만 선택 가능
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.generateBoxContainer} onClick={createProfile}>
                        <CompleteBox text="다음" width={46} height={88} />
                    </div>
                </div>
            </div>
        </>
    );
}
