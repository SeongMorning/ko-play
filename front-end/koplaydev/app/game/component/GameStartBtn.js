"use client";
import { useState, useEffect } from "react";
import styles from "./GameStartBtn.module.scss";
import { useDispatch } from "react-redux";
import { changeLoadingIdx } from "@/redux/slices/loadingSlice";

export default function GameStartBtn() {
  const [countdown, setCountdown] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const dispatch = useDispatch();

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
    setCountdown(3);
  };

  return (
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
  );
}
