"use client";
import { useState, useEffect } from "react";
import Hint from "./Hint";
import Options from "./Options";
import styles from "./Game.module.scss";
import { OpenAiUtill } from "@/app/utils/OpenAiUtill";

const words = [
  ["사과", "바나나", "포도"],
  ["오렌지", "딸기", "키위"],
  ["배", "수박", "복숭아"],
];

export default function Game() {
  const [currentWord, setCurrentWord] = useState([]);
  const [hints, setHints] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

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
    //         let msg = `나는 한국 다문화 가정의 초등학교 저학년 아이와 놀이를 하고 있어. 나는 "${word}"에 대해 힌트를 줘야 해. 시작은 매우 광범위한 힌트부터 마지막에는 정답을 거의 알 수 있는 것으로 무조건 5개의 힌트를 줘. 응답 방식은 Hint1:... Hint2:... 이런 식으로 줘`;
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

    setCorrectAnswers(0);
    setCurrentHintIndex(0);
    setGameOver(false);
    setResult("");
    setCurrentQuestion(0);
  };

  const handleNextHint = () => {
    // 현재 음성을 중지합니다.
    window.speechSynthesis.cancel();

    if (currentHintIndex < hints[currentQuestion].length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    } else {
      setResult(
        `힌트가 더 이상 없습니다! 정답은 ${currentWord[currentQuestion]}입니다.`
      );
      setTimeout(handleNextQuestion, 2000); // 2초 후에 다음 문제로 자동 이동
    }
  };

  const handleGuess = (guess) => {
    window.speechSynthesis.cancel();
    if (guess === currentWord[currentQuestion]) {
      setResult("정답입니다!");
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setResult(`오답입니다! 정답은 ${currentWord[currentQuestion]}입니다.`);
    }
    setTimeout(handleNextQuestion, 2000); // 2초 후에 다음 문제로 자동 이동
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentWord.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentHintIndex(0);
      setResult("");
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.statusContainer}>
        <p>총 문제 수: {words.length}</p>
        <p>정답 개수: {correctAnswers}</p>
      </div>
      {hints[currentQuestion] && hints[currentQuestion][currentHintIndex] && (
        <Hint hint={hints[currentQuestion][currentHintIndex]} />
      )}
      {gameOver ? (
        <div>
          <p className={styles.resultText}>{result}</p>
          <button onClick={startGame}>다시 시작</button>
        </div>
      ) : (
        <div>
          <Options words={words[currentQuestion]} onGuess={handleGuess} />
          <button
            className={styles.nextHintButton}
            onClick={handleNextHint}
            disabled={result !== ""}
          >
            다음 힌트 듣기
          </button>
          <p className={styles.resultText}>{result}</p>
        </div>
      )}
    </div>
  );
}
