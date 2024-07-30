"use client";
import { useState } from "react";
import ParentStudentBtn from "./ParentStudentBtn";

export default function SelectStatus() {
  const [selectedButton, setSelectedButton] = useState("학생");

  return (
    <div>
      <ParentStudentBtn
        text={"부모님"}
        isSelected={selectedButton === "부모님"}
        onClick={() => setSelectedButton("부모님")}
      />
      <ParentStudentBtn
        text={"학생"}
        isSelected={selectedButton === "학생"}
        onClick={() => setSelectedButton("학생")}
      />
    </div>
  );
}
