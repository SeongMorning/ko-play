"use client";

import { useState, useEffect } from "react";
import styles from "./Options.module.scss";
import CardText from "./CardText";

export default function Options({ words, onGuess, correctWord, reset }) {
  const [selectedWord, setSelectedWord] = useState(null);

  useEffect(() => {
    setSelectedWord(null);
  }, [reset]);

  const handleCardClick = (word) => {
    setSelectedWord(word);
    onGuess(word);
  };

  return (
    <div className={styles.optionsContainer}>
      {words.map((wordObj, index) => (
        <CardText
          key={index}
          left={`${index * 10}px`}
          top="20px"
          width="calc(9vw + 11vh)"
          height="calc(9vw + 11vh)"
          text={wordObj.wordKor}
          imgUrl={wordObj.imgUrl}
          isCorrect={
            selectedWord === null
              ? null
              : wordObj.wordKor === correctWord
              ? true
              : wordObj.wordKor === selectedWord
              ? false
              : false
          }
          onClick={() => handleCardClick(wordObj.wordKor)}
        />
      ))}
    </div>
  );
}
