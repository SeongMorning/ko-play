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
      {words.map((word, index) => (
        <CardText
          key={index}
          left={`${index * 10}px`}
          top="20px"
          width="14vw"
          height="14vw"
          text={word}
          isCorrect={
            selectedWord === null
              ? null
              : word === correctWord
              ? true
              : word === selectedWord
              ? false
              : false
          }
          onClick={() => handleCardClick(word)}
        />
      ))}
    </div>
  );
}
