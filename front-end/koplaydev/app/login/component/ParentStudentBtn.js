"use client";
import styles from "./ParentStudentBtn.module.scss";

export default function ParentStudentBtn({ text, isSelected, onClick }) {
  return (
    <button
      className={`${styles.button} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
