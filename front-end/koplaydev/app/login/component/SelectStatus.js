"use client";
import { useState, useEffect } from "react";
import ParentStudentBtn from "./ParentStudentBtn";

export default function SelectStatus({ initialText, onSelect }) {
  const [selectedButton, setSelectedButton] = useState(initialText);

  useEffect(() => {
    onSelect(selectedButton);
  }, [selectedButton, onSelect]);

  return (
    <div>
      <ParentStudentBtn
        text="부모님"
        isSelected={selectedButton === "부모님"}
        onClick={() => setSelectedButton("부모님")}
      />
      <ParentStudentBtn
        text="학생"
        isSelected={selectedButton === "학생"}
        onClick={() => setSelectedButton("학생")}
      />
    </div>
  );
}
