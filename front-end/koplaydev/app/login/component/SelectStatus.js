"use client";
import { useState, useEffect } from "react";
import ParentStudentBtn from "./ParentStudentBtn";
import effectSound from '@/app/utils/effectSound'
import { useSelector } from "react-redux";

const mouseClickSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/mouseClickSound.mp3';

export default function SelectStatus({ initialText, onSelect }) {
  const translationWords = useSelector((state) => state.translationWords);

  const [selectedButton, setSelectedButton] = useState(initialText);

  const es = effectSound(mouseClickSound, 0.5);

  useEffect(() => {
    onSelect(selectedButton);
  }, [selectedButton, onSelect]);

  return (
    <div>
      <ParentStudentBtn
        text={translationWords.parent}
        isSelected={selectedButton === "부모님"}
        onClick={() => {
          es.play();
          setSelectedButton("부모님")}}
      />
      <ParentStudentBtn
        text={translationWords.student}
        isSelected={selectedButton === "학생"}
        onClick={() => {
          es.play();
          setSelectedButton("학생")}}
      />
    </div>
  );
}
