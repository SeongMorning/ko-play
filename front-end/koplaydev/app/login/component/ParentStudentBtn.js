"use client";
import styles from "./ParentStudentBtn.module.scss";
import effectSound from '@/app/utils/effectSound'

const mouseClickSound = '/audios/mouseClickSound.mp3';

export default function ParentStudentBtn({ text, isSelected, onClick }) {
  const es = effectSound(mouseClickSound, 0.7);

  return (
    <button
      className={`${styles.button} ${isSelected ? styles.selected : ""}`}
      // onClick={onClick}
      onClick={onClick}

    >
      {text}
    </button>
  );
}
