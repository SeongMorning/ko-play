"use client";
import styles from "./Cabinet.module.scss";
import BtnContainer from "./BtnContainer";
import Cam from "./Cam";
import ChangeNation from "./ChangeNation";
import allAvatarAxios from "@/app/axios/allAvatarAxios";
import myAvatarAxios from "@/app/axios/myAvatarAxios";
import { useEffect, useState } from "react";

export default function Cabinet() {
  const [allAvatars, setAllAvatars] = useState([]);
  const [myAvatars, setMyAvatars] = useState([]);
  useEffect(() => {
    const fetchAllAvatars = async () => {
      const data = await allAvatarAxios();
      console.log(data);
      if (data) {
        setAllAvatars(data);
      }
    };
    const fetchMyAvatars = async () => {
      const data = await myAvatarAxios();
      console.log(data.data);
      if (data) {
        setMyAvatars(data.data);
      }
    };

    fetchAllAvatars();
    fetchMyAvatars();
  }, []);
  // 내가 가지고 있는 것일 때는 색깔이 보이게
  // 모든 애들 중에서 내가 가지고 있지 않은 것일 때는 흑백으로 보이게.
  return (
    <div className={styles.cabinetContainer}>
      <img className={styles.cabinetImg} src="/cabinet.png" />
      <div className={styles.avatarContainer}>
        {allAvatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar.avatarFile}
            alt={`Avatar ${index}`}
            className={styles.avatar}
          />
        ))}
      </div>
      <Cam left="55vw" top="40vh" width="20vw" />
      <BtnContainer />
      <ChangeNation />
    </div>
  );
}
