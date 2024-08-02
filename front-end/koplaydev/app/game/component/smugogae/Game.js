"use client";
import { OpenAiUtill } from "@/app/utils/OpenAiUtill";
import { useState, useEffect } from "react";
import Hint from "./Hint";
import Options from "./Options";
import styles from "./Game.module.scss";

const words = ["사과", "바나나", "포도"]; // 예시 단어 리스트

export default function Game() {
  const [currentWord, setCurrentWord] = useState("");
  const [hints, setHints] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const chosenWord = words[randomIndex];
    setCurrentWord(chosenWord);
    let msg = `I am playing a game with a korean child. I have to give hints about the word "${chosenWord}" in Korean. Please provide 5 hints that become progressively more specific. Start with a very general in hint in korean.`;
    const initialHints = new Promise((resolve) => {
      resolve(OpenAiUtill.prompt(msg));
    })
      .then((result) => {
        console.log(result.message.content);
        return result.message.content
          .trim()
          .split("\n")
          .filter((hint) => hint);
      })
      .catch((err) => {
        console.error("Error fetching hints:", err);
        return ["힌트를 가져오는 데 문제가 발생했습니다."];
      });
    console.log(initialHints);
    // const initialHints = await getHintsFromGPT(chosenWord);
    setHints(initialHints);
    setAttempts(0);
    setGameOver(false);
    setResult("");
  };

  // const getHintsFromGPT = async (word) => {
  //   try {
  //     const response = await axios.post(
  //       "https://api.openai.com/v1/completions",
  //       {
  //         prompt: `I am playing a game with a child. I have to give hints about the word "${word}" in Korean. Please provide 3 hints that become progressively more specific. Start with a very general hint.`,
  //         max_tokens: 100,
  //         model: "text-davinci-003",
  //       },
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer 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",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     return response.data.choices[0].text
  //       .trim()
  //       .split("\n")
  //       .filter((hint) => hint);
  //   } catch (error) {
  //     console.error("Error fetching hints:", error);
  //     return ["힌트를 가져오는 데 문제가 발생했습니다."];
  //   }
  // };

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
      <Hint hint={hints[attempts]} />
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
