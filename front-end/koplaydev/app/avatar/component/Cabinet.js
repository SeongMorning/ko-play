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
  const [currentPage, setCurrentPage] = useState(1);
  const avatarsPerPage = 8; // 한 페이지에 표시할 아바타 수

  useEffect(() => {
    const fetchAllAvatars = async () => {
      const data = await allAvatarAxios();
      if (data) {
        setAllAvatars(data);
        console.log(data);
      }
    };
    const fetchMyAvatars = async () => {
      const data = await myAvatarAxios();
      if (data) {
        setMyAvatars(data);
        console.log(data);
      }
    };

    fetchAllAvatars();
    fetchMyAvatars();
  }, []);

  const filteredAvatars = allAvatars.filter(
    (avatar) => avatar.countryName === selectedCountry
  );

  // 현재 페이지의 아바타만 표시
  const indexOfLastAvatar = currentPage * avatarsPerPage;
  const indexOfFirstAvatar = indexOfLastAvatar - avatarsPerPage;
  const currentAvatars = filteredAvatars.slice(
    indexOfFirstAvatar,
    indexOfLastAvatar
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.cabinetContainer}>
      <img className={styles.cabinetImg} src="/cabinet.png" />
      <div className={styles.avatarContainer}>
        {currentAvatars.map((avatar, index) => {
          const isOwned =
            myAvatars == null
              ? null
              : myAvatars.some(
                  (myAvatar) => myAvatar.avatarIdx === avatar.avatarIdx
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
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button
            className={styles.pageButton}
            onClick={() => paginate(currentPage - 1)}
          >
            이전
          </button>
        )}
        {indexOfLastAvatar < filteredAvatars.length && (
          <button
            className={styles.pageButton}
            onClick={() => paginate(currentPage + 1)}
          >
            다음
          </button>
        )}
      </div>
      <Cam left="55vw" top="40vh" width="20vw" height="30vh" />
      <BtnContainer />
      <ChangeNation setSelectedCountry={setSelectedCountry} />
    </div>
  );
}
