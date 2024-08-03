"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeWrong } from "@/redux/slices/wrongList"; // 경로는 실제 프로젝트 구조에 맞게 수정하세요
import Hint from "./Hint";
import Options from "./Options";
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
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [correctWord, setCorrectWord] = useState(null);
  const [reset, setReset] = useState(false);
  const [playHint, setPlayHint] = useState(false);

  const dispatch = useDispatch();
  const wrongAnswers = useSelector((state) => state.wrong);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    const chosenWords = words.map(
      (wordSet) => wordSet[Math.floor(Math.random() * wordSet.length)]
    );
    setCurrentWord(chosenWords);
    try {
      const hintsResponse = await Promise.all(
        chosenWords.map((word) => {
          return new Promise((resolve) => {
            let msg = `나는 한국 다문화 가정의 초등학교 저학년 아이와 놀이를 하고 있어. 나는 "${word}"에 대해 힌트를 줘야 해. 시작은 매우 광범위한 힌트부터 마지막으로 갈수록 구체적으로 무조건 5개의 힌트를 줘. 정답을 알려주면 안 돼. 응답 방식은 Hint1:... Hint2:... 이런 식으로 줘`;
            resolve(OpenAiUtill.prompt(msg));
          })
            .then((result) => {
              return result.message.content
                .split("\n")
                .map((h) => h.trim().replace(/Hint\d+: /, ""));
            })
            .catch((err) => {
              console.error("Error fetching hints:", err);
              return ["힌트를 가져오는 데 문제가 발생했습니다."];
            });
        })
      );
      setHints(hintsResponse);
    } catch (error) {
      console.error("Error fetching hints:", error);
      setHints(
        chosenWords.map(() => ["힌트를 가져오는 데 문제가 발생했습니다."])
      );
    }

    setCorrectAnswers(0);
    setCurrentHintIndex(0);
    setGameOver(false);
    setCurrentQuestion(0);
    setCorrectWord(null);
    setReset((prev) => !prev);
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
      setCorrectAnswers(correctAnswers + 1);
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
    }
  };

  return (
    <>
      {/* <video
        className={styles.myVideo}
        src="/character_dancing.mp4"
        autoPlay
        loop
      /> */}
      <img className={styles.myVideo} src="/character-dancingMachine.gif" />
      <div className={styles.gameContainer}>
        <Hint
          hint={hints[currentQuestion]?.[currentHintIndex]}
          playHint={playHint}
        />
        {gameOver ? (
          <div>
            <p className={styles.resultText}>게임이 종료되었습니다!</p>
            <button onClick={startGame}>다시 시작</button>
          </div>
        ) : (
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
