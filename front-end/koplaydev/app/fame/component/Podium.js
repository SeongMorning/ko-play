"use client";

import { useEffect, useState } from "react";
import styles from "./Podium.module.scss";
import fameAxios from "@/app/axios/fameAxios";

// props : left, top, users[name, image, plays, level]
export default function Podium(props) {
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetchUserList = async () => {
      const data = await fameAxios();
      if (data) {
        console.log(data);
        setUsers(data);
      }
    };
    fetchUserList();
  }, []);
  return (
    <>
      {users ? (
        <>
          <div
            className={styles.podium}
            style={{ left: props.left, top: props.top }}
          >
            <img src="/podium.png" alt="시상대" />
            <div className={`${styles.face1}`}>
              <img
                src={users[0].student.profileImg || "hehe.png"}
                alt="1등"
                onError={(e) => {
                  e.target.src = "hehe.png";
                }}
              />
            </div>
            <div className={styles.light1}></div>
            <div className={`${styles.face2}`}>
              <img
                src={users[1].student.profileImg || "hehe.png"}
                alt="2등"
                onError={(e) => {
                  e.target.src = "hehe.png";
                }}
              />
            </div>
            <div className={styles.light2}></div>
            <div className={`${styles.face3}`}>
              <img
                src={users[2].student.profileImg || "hehe.png"}
                alt="3등"
                onError={(e) => {
                  e.target.src = "hehe.png";
                }}
              />
            </div>
            <div className={styles.light3}></div>
          </div>
          <div className={styles.info}>
            <div className={`${styles.info} ${styles.info1}`}>
              이름 : {users[0].student.name}
              <br />
              주간 판 수 : {users[0].gameCount}
            </div>
            <div className={`${styles.info} ${styles.info2}`}>
              이름 : {users[1].student.name}
              <br />
              주간 판 수 : {users[1].gameCount}
            </div>
            <div className={`${styles.info} ${styles.info3}`}>
              이름 : {users[2].student.name}
              <br />
              주간 판 수 : {users[2].gameCount}
            </div>
          </div>{" "}
        </>
      ) : null}
    </>
  );
}
