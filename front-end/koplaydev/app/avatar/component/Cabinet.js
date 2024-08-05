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
  const [selectedCountry, setSelectedCountry] = useState("Korea");

  useEffect(() => {
    const fetchAllAvatars = async () => {
      const data = await allAvatarAxios();
      if (data) {
        setAllAvatars(data);
      }
    };
    const fetchMyAvatars = async () => {
      const data = await myAvatarAxios();
      if (data) {
        setMyAvatars(data.data);
      }
    };

    fetchAllAvatars();
    fetchMyAvatars();
  }, []);

  const filteredAvatars = allAvatars.filter(
    (avatar) => avatar.countryName === selectedCountry
  );

  return (
    <div className={styles.cabinetContainer}>
      <img className={styles.cabinetImg} src="/cabinet.png" />
      <div className={styles.avatarContainer}>
        {filteredAvatars.map((avatar, index) => {
          const isOwned = myAvatars.some(
            (myAvatar) => myAvatar.studentUsableAvatarIdx === avatar.avatarIdx
          );
          return (
            <img
              key={index}
              src={avatar.avatarFile}
              alt={`Avatar ${index}`}
              className={`${styles.avatar} ${!isOwned ? styles.grayscale : ""}`}
            />
          );
        })}
      </div>
      <Cam left="55vw" top="40vh" width="20vw" />
      <BtnContainer />
      <ChangeNation setSelectedCountry={setSelectedCountry} />
    </div>
  );
}
