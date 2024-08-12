"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import JellyBtn from "./component/JellyBtn";
import PromLoginBg from "../component/background/PromLoginBg";
import StudentLogin from "./component/StudentLogin";
import SelectStatus from "./component/SelectStatus";
import ParentLogin from "./component/ParentLogin";
import { useDispatch } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { changeStudentInfo } from "@/redux/slices/studentInfoSlice";
import BackScoreBtn from "../component/buttons/BackScoreBtn";

export default function Login() {
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
      <BackScoreBtn text="뒤로가기" left="1vw" top="1vh" test="뒤로가기"/>

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
              text={"부모님"}
              onClick={() => setSelectedStatus("부모님")}
            />
            <JellyBtn
              width={""}
              height={""}
              bg={"#A2D2FF"}
              shadow={"#4DA3F3"}
              text={"학생"}
              onClick={() => setSelectedStatus("학생")}
            />
          </div>
        )}
      </main>
      <PromLoginBg />
    </>
  );
}
