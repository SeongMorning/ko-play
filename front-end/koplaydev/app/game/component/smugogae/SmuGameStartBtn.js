"use client";
import { useState, useEffect } from "react";
import styles from "./SmuGameStartBtn.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeLoadingIdx } from "@/redux/slices/loadingSlice";
import gameWordAxios from "@/app/axios/gameWordAxios";
import { changeGameWord } from "@/redux/slices/gameWordSlice";
import { OpenAiUtill } from "@/app/utils/OpenAiUtill";
import { changeHints } from "@/redux/slices/hintsSlice";

export default function SmuGameStartBtn() {
  const [countdown, setCountdown] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const dispatch = useDispatch();
  const gameIdx = useSelector((state) => state.game);
  const levelList = useSelector((state) => state.level);
  const hintList = useSelector((state) => state.hints);

  function convertTo3x3Grid(data) {
    const grid = [];
    for (let i = 0; i < 3; i++) {
      grid.push(data.slice(i * 3, i * 3 + 3));
    }
    return grid;
  }
  useEffect(() => {
    const fetchGameWord = async () => {
      const data = await gameWordAxios(
        gameIdx,
        // levelList[gameIdx - 1],
        1,
        [
          [10, 10, 10, 10, 10],
          [4, 4, 6, 6, 8],
          [9, 9, 9, 9, 9],
        ][gameIdx - 1][levelList[gameIdx - 1] - 1]
      );
      if (data) {
        const gridData = convertTo3x3Grid(data);
        dispatch(changeGameWord(gridData));

        const chosenWords = gridData.map(
          (wordSet) => wordSet[Math.floor(Math.random() * wordSet.length)]
        );
        const hintsResponse = await Promise.all(
          chosenWords.map((wordObj) => {
            return new Promise((resolve) => {
              let msg = `나는 한국 다문화 가정의 초등학교 저학년 아이와 놀이를 하고 있어. 나는 "${wordObj.wordKor}"에 대해 힌트를 줘야 해. 시작은 매우 광범위한 힌트부터 마지막으로 갈수록 구체적으로 무조건 5개의 힌트를 줘. 단, "${wordObj.wordKor}"라는 정답을 알려주지 않고 설명해야해. 응답 방식은 Hint1:... Hint2:... 이런 식으로 줘`;
              resolve(OpenAiUtill.prompt(msg));
            })
              .then((result) => {
                return result.message.content
                  .split("\n")
                  .map((h) => h.trim().replace(/Hint\d+: /, ""))
                  .filter((h) => h !== "")
                  .slice(0, 5);
              })
              .catch((err) => {
                console.error("Error fetching hints:", err);
                return ["힌트를 가져오는 데 문제가 발생했습니다."];
              });
          })
        );
        dispatch(changeHints({ hints: hintsResponse, chosenWords }));
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
