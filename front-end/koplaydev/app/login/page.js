"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import JellyBtn from "./component/JellyBtn";
import PromLoginBg from "../component/background/PromLoginBg";
import StudentLogin from "./component/StudentLogin";
import SelectStatus from "./component/SelectStatus";
import ParentLogin from "./component/ParentLogin";
import { useDispatch, useSelector } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { changeStudentInfo } from "@/redux/slices/studentInfoSlice";
import BackScoreBtn from "../component/buttons/BackScoreBtn";

export default function Login() {
  const translationWords = useSelector((state) => state.translationWords);

  const [selectedStatus, setSelectedStatus] = useState("");
  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
  };
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(changeModalIdx(0));
  },[])

  return (
    <>
      <BackScoreBtn text={translationWords.backScoreBtn} left="1vw" top="1vh" test={translationWords.backScoreBtn}/>

      <main className={styles.main}>
        <img className={styles.logo} src="/logo.png" />

        {selectedStatus ? (
          <>
            <SelectStatus
              initialText={selectedStatus}
              onSelect={handleSelectStatus}
            />
            {selectedStatus === "학생" ? <StudentLogin /> : <ParentLogin />}
          </>
        ) : (
          <div className={styles.statusButtonContainer}>
            <JellyBtn
              width={""}
              height={""}
              bg={"#ffd6e0"}
              shadow={"#e07a93"}
              text={translationWords.parent}
              onClick={() => setSelectedStatus("부모님")}
            />
            <JellyBtn
              width={""}
              height={""}
              bg={"#A2D2FF"}
              shadow={"#4DA3F3"}
              text={translationWords.student}
              onClick={() => setSelectedStatus("학생")}
            />
          </div>
        )}
      </main>
      <PromLoginBg />
    </>
  );
}
