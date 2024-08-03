"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeWrong } from "@/redux/slices/wrongList";
import { changeCorrectIdx } from "@/redux/slices/correct";
import Hint from "./Hint";
import Options from "./Options";
import { motion } from "framer-motion";
import YellowBox from "@/app/component/boxes/YellowBox";
import GameJellyBtn from "../GameJellyBtn";
import styles from "./SmuGameStart.module.scss";
import { OpenAiUtill } from "@/app/utils/OpenAiUtill";

const words = [
  ["사과", "바나나", "포도"],
  ["오렌지", "딸기", "키위"],
  ["배", "수박", "복숭아"],
];

export default function SmuGameStart() {
  const [currentWord, setCurrentWord] = useState([]);
  const [hints, setHints] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [correctWord, setCorrectWord] = useState(null);
  const [reset, setReset] = useState(false);
  const [playHint, setPlayHint] = useState(false);

  const dispatch = useDispatch();
  const wrongAnswers = useSelector((state) => state.wrong);
  const correctAnswers = useSelector((state) => state.correct);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    const chosenWords = words.map(
      (wordSet) => wordSet[Math.floor(Math.random() * wordSet.length)]
    );
    setCurrentWord(chosenWords);
    // try {
    //   const hintsResponse = await Promise.all(
    //     chosenWords.map((word) => {
    //       return new Promise((resolve) => {
    //         let msg = `나는 한국 다문화 가정의 초등학교 저학년 아이와 놀이를 하고 있어. 나는 "${word}"에 대해 힌트를 줘야 해. 시작은 매우 광범위한 힌트부터 마지막으로 갈수록 구체적으로 무조건 5개의 힌트를 줘. 정답을 알려주면 안 돼. 응답 방식은 Hint1:... Hint2:... 이런 식으로 줘`;
    //         resolve(OpenAiUtill.prompt(msg));
    //       })
    //         .then((result) => {
    //           return result.message.content
    //             .split("\n")
    //             .map((h) => h.trim().replace(/Hint\d+: /, ""));
    //         })
    //         .catch((err) => {
    //           console.error("Error fetching hints:", err);
    //           return ["힌트를 가져오는 데 문제가 발생했습니다."];
    //         });
    //     })
    //   );
    //   setHints(hintsResponse);
    // } catch (error) {
    //   console.error("Error fetching hints:", error);
    //   setHints(
    //     chosenWords.map(() => ["힌트를 가져오는 데 문제가 발생했습니다."])
    //   );
    // }

    dispatch(changeCorrectIdx(0));
    dispatch(changeWrong([]));
    setCurrentHintIndex(0);
    setGameOver(false);
    setCurrentQuestion(0);
    setCorrectWord(null);
    setReset((prev) => !prev);
    setModal(false);
  };

  const handleNextHint = () => {
    window.speechSynthesis.cancel();

    if (currentHintIndex < hints[currentQuestion].length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
      setPlayHint(true);
    } else {
      // 힌트가 끝났음을 알리는 UI 표시가 필요할 경우 여기에 추가 가능
    }
  };

  const handleGuess = (guess) => {
    window.speechSynthesis.cancel();
    setCorrectWord(currentWord[currentQuestion]);
    if (guess === currentWord[currentQuestion]) {
      dispatch(changeCorrectIdx(correctAnswers + 1));
    } else {
      dispatch(changeWrong([...wrongAnswers, currentWord[currentQuestion]]));
    }
    setTimeout(handleNextQuestion, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentWord.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentHintIndex(0);
      setCorrectWord(null);
      setReset((prev) => !prev);
      setPlayHint(false);
    } else {
      setGameOver(true);
      setModal(true);
    }
  };

  return (
    <>
      <img className={styles.myVideo} src="/character-dancingMachine.gif" />
      {gameOver && modal && (
        <motion.div
          className={styles.modal}
          initial={{
            opacity: 0,
            translateY: 10,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
        >
          <YellowBox width="40" height="70">
            <div className={styles.text}>
              <span className={styles.finish}>게임종료</span>
              <span className={styles.correct}>
                정답 개수 : {correctAnswers}
              </span>
              <span className={styles.incorrect}>
                오답 개수 : {wrongAnswers.length}
              </span>
              <span className={styles.retry}>
                틀린 단어를 다시 학습하시겠습니까?
              </span>
              <span className={styles.addExp}>
                학습 시 추가 경험치가 있습니다.
              </span>
              <div className={styles.buttons}>
                <div className={styles.Yes}>
                  <GameJellyBtn bg="#FFD6E0" shadow="#E07A93" text="예" />
                </div>
                <div className={styles.No}>
                  <GameJellyBtn bg="#A2D2FF" shadow="#4DA3F2" text="아니요" />
                </div>
              </div>
            </div>
          </YellowBox>
        </motion.div>
      )}
      <div className={styles.gameContainer}>
        <Hint
          hint={hints[currentQuestion]?.[currentHintIndex]}
          playHint={playHint}
        />
        {!gameOver && (
          <div style={{ width: "100%" }}>
            <Options
              words={words[currentQuestion]}
              onGuess={handleGuess}
              correctWord={currentWord[currentQuestion]}
              reset={reset}
            />
            <div className={styles.hintInfo}>
              <p>
                남은 힌트 개수:{" "}
                {hints[currentQuestion]?.length - currentHintIndex || 0}
              </p>
            </div>
            <button
              className={styles.nextHintButton}
              onClick={handleNextHint}
              disabled={
                currentHintIndex >= (hints[currentQuestion]?.length || 0)
              }
            >
              힌트 듣기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
