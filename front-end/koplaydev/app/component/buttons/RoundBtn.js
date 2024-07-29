"use client";
import styles from "./RoundBtn.module.scss";

export default function RoundButton({ text, isSelected, onClick }) {
  return (
    <button
      className={`${styles.button} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
