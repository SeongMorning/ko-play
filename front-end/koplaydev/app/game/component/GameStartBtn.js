"use client";
import { useState, useEffect } from "react";
import styles from "./GameStartBtn.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeLoadingIdx } from "@/redux/slices/loadingSlice";
import gameWordAxios from "@/app/axios/gameWordAxios";
import { changeGameWord } from "@/redux/slices/gameWordSlice";

export default function GameStartBtn() {
  const [countdown, setCountdown] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const dispatch = useDispatch();
  const gameIdx = useSelector((state) => state.game);
  const levelList = useSelector((state) => state.level);

  useEffect(() => {
    const fetchGameWord = async () => {
      const data = await gameWordAxios(
        gameIdx,
        // levelList[gameIdx - 1],
        1,
        [
          [10, 10, 10, 10, 10],
          [4, 4, 6, 6, 8],
          [3, 3, 3, 3, 3]
        ][gameIdx- 1][levelList[gameIdx - 1]-1]
      );
      if (data) {
        const changeData = ()=>{
          data.map((value)=>{
            let copy = value;
            copy["state"] = 0;
            value["left"] = `${Math.random() * 60 + 10}`
            return copy;
          })
          dispatch(changeGameWord(data));
        }
        changeData();

      }
    };
    fetchGameWord();
  }, [gameIdx, levelList]);

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
