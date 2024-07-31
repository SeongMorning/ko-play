"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import JellyBtn from "./component/JellyBtn";
import PromLoginBg from "../component/background/PromLoginBg";
import StudentLogin from "./component/StudentLogin";
import SelectStatus from "./component/SelectStatus";

export default function Login() {
  const [isStudentSelected, setIsStudentSelected] = useState(false);
  const [isParentSelected, setIsParentSelected] = useState(false);

  const handleStudentClick = () => {
    setIsStudentSelected(true);
    setIsParentSelected(false);
  };

  const handleParentClick = () => {
    setIsParentSelected(true);
    setIsStudentSelected(false);
  };

  return (
    <>
      <main className={styles.main}>
        <img className={styles.logo} src="/logo.png" />
        {isStudentSelected || isParentSelected ? (
          <>
            <SelectStatus
              text={isStudentSelected ? "학생" : "부모님"}
              isSelected={true}
              onClick={() => {}}
            />
            <StudentLogin />
          </>
        ) : (
          <div className={styles.statusButtonContainer}>
            <JellyBtn
              width={""}
              height={""}
              bg={"#ffd6e0"}
              shadow={"#e07a93"}
              text={"부모님"}
              onClick={handleParentClick}
            />
            <JellyBtn
              width={""}
              height={""}
              bg={"#A2D2FF"}
              shadow={"#4DA3F3"}
              text={"학생"}
              onClick={handleStudentClick}
            />
          </div>
        )}
      </main>
      <PromLoginBg />
    </>
  );
}
