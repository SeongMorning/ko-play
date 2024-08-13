"use client";

import { useSelector } from "react-redux";
import CompleteBox from "./CompleteBox";
import DetailBox from "./DetailBox";
import styles from "./InputChildInfo.module.scss";
import insertChildAxios from "@/app/axios/insertChildAxios";
import effectSound from "@/app/utils/effectSound";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const buttonSound =
  "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3";
  const keydownSound = "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/keydownSound.wav";

export default function InputChildInfo({
  onClose,
  onAllClose,
  childInfo,
  setChildInfo,
}) {
  const translationWords = useSelector((state) => state.translationWords);
  const es = effectSound(buttonSound, 1);
  const buttonEs = effectSound(buttonSound, 1);
  const keydownEs = effectSound(keydownSound, 1);

  const [flag, setFlag] = useState(false);
  const [click, setClick] = useState(true);
  const [blue1, setBlue1] = useState(false);
  const [blue2, setBlue2] = useState(false);
  const [blue3, setBlue3] = useState(false);
  const [blue4, setBlue4] = useState(false);
//   const [red1, setRed1] = useState(false);
//   const [red2, setRed2] = useState(false);
//   const [red3, setRed3] = useState(false);
//   const [red4, setRed4] = useState(false);
  const regex = /^[a-zA-Z0-9!@#$%^&*()_+={}|;:',.<>?/`~\-]+$/;
  const lengthValid = childInfo.pw.length >= 6 && childInfo.pw.length <= 20;
  const valid =
    lengthValid && regex.test(childInfo.pw) && !/\s/.test(childInfo.pw);

  // 닫기 버튼 클릭 시 실행되는 함수
  const handleClose = () => {
    es.play();
    // 상태 초기화
    setChildInfo({
      name: "",
      id: "",
      pw: "",
      birth: "",
    });
    // 모달 닫기
    onAllClose();
  };

  useEffect(() => {
    if (
      /^[가-힣]{1,6}$/.test(childInfo.name) &&
      !/\s/.test(childInfo.name) &&
      /^[a-z0-9]{1,10}$/.test(childInfo.id) &&
      !/\s/.test(childInfo.id) &&
      valid &&
      childInfo.birth
    ) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [childInfo]);

  const createProfile = () => {
    // if (/^[가-힣]{1,6}$/.test(childInfo.name) && !/\s/.test(childInfo.name)) {
    //   setRed1(false);
    // } else {
    //   setRed1(true);
    //   setTimeout(setRed1(false), 100);
    // }
    // if (/^[a-z0-9]{1,10}$/.test(childInfo.id) && !/\s/.test(childInfo.id)) {
    //   setRed2(false);
    // } else {
    //   setRed2(true);
    //   setTimeout(setRed2(false), 100);
    // }
    // if (lengthValid && valid) {
    //   setRed3(false);
    // } else {
    //   setRed3(true);
    //   setTimeout(setRed3(false), 100);
    // }
    // if (childInfo.birth) {
    //   setRed4(false);
    // } else {
    //   setRed1(true);
    //   setTimeout(setRed4(false), 100);
    // }

    if (
      /^[가-힣]{1,6}$/.test(childInfo.name) &&
      !/\s/.test(childInfo.name) &&
      /^[a-z0-9]{1,10}$/.test(childInfo.id) &&
      !/\s/.test(childInfo.id) &&
      valid &&
      childInfo.birth
    ) {
      setFlag(true);
    }
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
          <img
            className={styles.closeButton}
            onClick={handleClose}
            src="close.png"
            alt="Close"
          />
          <img className={styles.star} src="Star-bg.png" alt="" />
          <img className={styles.planet} src="planet-bg.png" alt="" />
          <img className={styles.ufo} src="ufo-bg.png" alt="" />
          <div className={styles.inputTotal}>
            <div className={styles.inputContainer}>
              <div className={styles.detailBox}>
                <DetailBox
                  text={translationWords.name}
                  width={68}
                  height={92}
                />
              </div>
              <div>
                <input
                  className={`${styles.input} ${blue1 ? styles.blue : ""} ${
                    red1 ? styles.red : ""
                  }`}
                  value={childInfo.name}
                  placeholder="한국 이름을 작성하세요."
                  onChange={(e) => {
                    keydownEs.play();
                    setChildInfo((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }));
                    if (
                      /^[가-힣]{1,6}$/.test(e.target.value) &&
                      !/\s/.test(e.target.value)
                    ) {
                      setBlue1(true);
                    } else {
                      setBlue1(false);
                    }
                  }}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.detailBox}>
                <DetailBox text={translationWords.id} width={68} height={92} />
              </div>{" "}
              <div>
                <input
                  placeholder="영문 소문자 및 숫자 10글자 이내"
                  className={`${styles.input} ${blue2 ? styles.blue : ""} ${
                    red2 ? styles.red : ""
                  }`}
                  onChange={(e) => {
                    keydownEs.play();
                    setChildInfo((prevState) => ({
                      ...prevState,
                      id: e.target.value,
                    }));
                    if (
                      /^[a-z0-9]{1,10}$/.test(e.target.value) &&
                      !/\s/.test(e.target.value)
                    ) {
                      setBlue2(true);
                    } else {
                      setBlue2(false);
                    }
                  }}
                  value={childInfo.id}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.detailBox}>
                <DetailBox text={translationWords.pw} width={68} height={92} />
              </div>
              <div>
                <input
                  placeholder="영문, 숫자 및 특수문자 20글자 이내"
                  type={click ? "password" : "text"}
                  className={`${styles.input} ${blue3 ? styles.blue : ""} ${
                    red3 ? styles.red : ""
                  }`}
                  value={childInfo.pw}
                  onChange={(e) => {
                    keydownEs.play();
                    setChildInfo((prevState) => ({
                      ...prevState,
                      pw: e.target.value,
                    }));
                    const regex = /^[a-zA-Z0-9!@#$%^&*()_+={}|;:',.<>?/`~\-]+$/;
                    const lengthValid =
                      e.target.value.length >= 6 && e.target.value.length <= 20;
                    const valid =
                      lengthValid &&
                      regex.test(e.target.value) &&
                      !/\s/.test(e.target.value);
                    if (valid) {
                      setBlue3(true);
                    } else {
                      setBlue3(false);
                    }
                  }}
                />
                <motion.img
                  className={styles.eye}
                  src="/eye.png"
                  alt="123"
                  onTapStart={() => setClick(false)}
                  onTap={() => setClick(true)}
                  onTapCancel={() => setClick(true)}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.detailBox}>
                <DetailBox
                  text={translationWords.birth}
                  width={68}
                  height={92}
                />
              </div>
              <div>
                <input
                  type="date"
                  className={`${styles.input} ${blue4 ? styles.blue : ""} ${
                    red4 ? styles.red : ""
                  }`}
                  value={childInfo.birth}
                  onChange={(e) => {
                    setChildInfo((prevState) => ({
                      ...prevState,
                      birth: e.target.value,
                    }));
                    if (e.target.value !== "") {
                      setBlue4(true);
                    } else {
                      setBlue4(false);
                    }
                  }}
                  max={new Date().toISOString().split("T")[0]} // 오늘 날짜까지만 선택 가능
                />
              </div>
            </div>
          </div>
          {flag ? (
            <div
              className={styles.generateBoxContainer}
              onClick={createProfile}
            >
              <CompleteBox
                text={translationWords.next}
                width={46}
                height={88}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
