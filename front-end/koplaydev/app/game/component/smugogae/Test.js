export default function Test() {
  const hint =
    "Hint1: 이 과일은 작고 둥글며 보라색 또는 녹색일 수 있어.\nHint2: 이 과일은 맛이 달고 씁니다.\nHint3: 이 과일은 포도주로 만들어진 음료수가 있어요.\nHint4: 이 과일은 가지고 있는 씨앗 때문에 조금 불편할 수도 있어.";
  const initialHints = [
    "이 식물은 여러 가지 색깔의 열매를 맺습니다.",
    "이 열매는 매우 달고 즐거운 맛이 납니다.",
    "이 열매는 한 알, 두 알, 세 알... 많은 알을 한 무리로 묶여 판매됩니다.",
    "이 열매는 주로 와인이나 주스 등으로 가공되어 소비됩니다.",
    "이 열매의 나무는 따뜻한 기후에서 잘 자랍니다. 정답은 무엇인가요?",
  ];
  const hints = hint.split("\n").map((h) => h.trim().replace(/Hint\d+: /, ""));
  console.log(hint);
  console.log(hints);
  console.log(hints[1]);
  return (
    <>
      {/* <div>{hint}</div> */}
      <div>{hints[1]}</div>
    </>
  );
}


"use client";
import { OpenAiUtill } from "@/app/utils/OpenAiUtill";
import { useState, useEffect } from "react";
import Hint from "./Hint";
import Options from "./Options";
import styles from "./Game.module.scss";

const words = [
  ["사과", "바나나", "포도"],
  ["오렌지", "딸기", "키위"],
  ["배", "수박", "복숭아"],
];

export default function Game() {
  const [currentWord, setCurrentWord] = useState([]);
  const [hints, setHints] = useState([]);
  const [attempts, setAttempts] = useState(0);
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

    const randomIndex = Math.floor(Math.random() * words.length);
    const chosenWord = words[randomIndex];
    setCurrentWord(chosenWord);
    let msg = `나는 한국 다문화 가정의 초등학교 저학년 아이와 놀이를 하고 있어. 나는 "${chosenWord}"에 대해 힌트를 줘야 해. 시작은 매우 광범위한 힌트부터 마지막에는 정답을 거의 알 수 있는 것으로 무조건 5개의 힌트를 줘. 응답 방식은 Hint1:... Hint2:... 이런 식으로 줘`;
    const initialHints = new Promise((resolve) => {
      resolve(OpenAiUtill.prompt(msg));
    })
      .then((result) => {
        return result.message.content
          .split("\n")
          .map((h) => h.trim().replace(/Hint\d+: /, ""));
      })
      .then((res) => {
        setHints(initialHints);
      })
      .catch((err) => {
        console.error("Error fetching hints:", err);
        return ["힌트를 가져오는 데 문제가 발생했습니다."];
      });
    setHints(initialHints);
    setAttempts(0);
    setGameOver(false);
    setResult("");
  };

  const handleGuess = (guess) => {
    if (guess === currentWord) {
      setResult("정답입니다!");
      setGameOver(true);
    } else {
      setAttempts(attempts + 1);
      if (attempts + 1 >= 5) {
        setResult(`오답입니다! 정답은 ${currentWord}입니다.`);
        setGameOver(true);
      } else {
        setResult("오답입니다! 다시 시도하세요.");
      }
    }
  };

  return (
    <div className={styles.gameContainer}>
      {hints[attempts] && <Hint hint={hints[attempts]} />}
      {gameOver ? (
        <div>
          <p>{result}</p>
          <button onClick={startGame}>다시 시작</button>
        </div>
      ) : (
        <Options words={words} onGuess={handleGuess} />
      )}
    </div>
  );
}
