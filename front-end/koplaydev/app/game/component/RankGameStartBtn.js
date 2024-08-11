"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useState, useEffect } from "react";
import styles from "./RankGameStartBtn.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeLoadingIdx } from "@/redux/slices/loadingSlice";
import { changeGameWord } from "@/redux/slices/gameWordSlice";
import OpenViduItem from "@/app/utils/openvidu/OpenVidu";

export default function RankGameStartBtn() {
  const [countdown, setCountdown] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const dispatch = useDispatch();
  const wordList = useSelector((state) => state.gameWord);
  const wordleft = useSelector((state) => state.gameLeft);

  useEffect(() => {
    const copy = wordList.map((word) => ({ ...word }));
    copy.map((word, index) => {
      word["left"] = wordleft[index].left;
      word["state"] = wordleft[index].state;
    });
    console.log(copy);
    dispatch(changeGameWord(copy));
    handleStartClick();
    SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
  }, []);

  useEffect(() => {
    let timer;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setGameStarted(true);
      dispatch(changeLoadingIdx(0));
      setCountdown(null);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleStartClick = () => {
    setCountdown(5);
  };

  return (
    <>
      <div className={styles.GameStartBtn} onClick={handleStartClick}>
        {!gameStarted ? (
          <>
            {countdown === null ? (
              <>
                <div className={styles.GameStartBtnTop}>시작</div>
                <div className={styles.GameStartBtnBottom}>시작</div>
              </>
            ) : (
              <>
                <div className={styles.GameStartBtnTop}>{countdown}</div>
                <div className={styles.GameStartBtnBottom}>{countdown}</div>
              </>
            )}
          </>
        ) : (
          <>
            <div className={styles.GameStartBtnTop}>게임 화면!</div>
            <div className={styles.GameStartBtnBottom}>게임 화면!</div>
          </>
        )}
      </div>
    </>
  );
}
