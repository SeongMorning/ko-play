"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import JellyBtn from "./component/JellyBtn";
import PromLoginBg from "../component/background/PromLoginBg";
import StudentLogin from "./component/StudentLogin";
import SelectStatus from "./component/SelectStatus";
import ParentLogin from "./component/ParentLogin";
// import Loading from "../game/loading";

// async function fetchData() {
//   // 실제 데이터 패칭
//   await new Promise((resolve) => setTimeout(resolve, 3000)); // 1초 대기 (데이터 패칭 시뮬레이션)
// }

export default function Login() {
  const [selectedStatus, setSelectedStatus] = useState("");
  // const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // useEffect(() => {
  //   const loadData = async () => {
  //     await fetchData(); // 데이터 패칭
  //     setLoading(false);  // 로딩 완료
  //   };
  //   loadData();
  // }, []);

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
  };

  // if(loading){
  //   return <Loading/>
  // }

  return (
    <>
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
