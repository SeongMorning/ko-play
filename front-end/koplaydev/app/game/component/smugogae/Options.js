"use client";

import styles from "./Options.module.scss";

export default function Options({ words, onGuess }) {
  return (
    <div className={styles.optionsContainer}>
      {words.map((word, index) => (
        <button key={index} onClick={() => onGuess(word)}>
          {word}
        </button>
      ))}
    </div>
  );
}
