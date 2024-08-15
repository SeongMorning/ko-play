"use client";
import styles from "./Cabinet.module.scss";
import BtnContainer from "./BtnContainer";
import Cam from "./Cam";
import ChangeNation from "./ChangeNation";
import allAvatarAxios from "@/app/axios/allAvatarAxios";
import myAvatarAxios from "@/app/axios/myAvatarAxios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import modifyAvatarAxios from "@/app/axios/modifyAvatarAxios";
import { useDispatch } from "react-redux";
import { changeCurrentAvatar } from "@/redux/slices/currentAvatar";
import { setStudentAvatars } from "@/redux/slices/studentAvatarSlice";

export default function Cabinet() {
  const [allAvatars, setAllAvatars] = useState([]);
  const [myAvatars, setMyAvatars] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Korea");
  const [currentPage, setCurrentPage] = useState(1);
  const avatarsPerPage = 8; // 한 페이지에 표시할 아바타 수
  const [isAvatar, setIsAvatar] = useState(false);
  const [avatarFile, setAvatarFile] = useState("");
  const dispatch = useDispatch();

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

  const modifyAvatar = () => {
    const beforeAvatarIdx = 0
    console.log(myAvatars);
  }

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
  console.log(currentAvatars);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.cabinetContainer}>
      <img className={styles.cabinetImg} src="/cabinet.png" />
      <div className={styles.avatarContainer}>
        {currentAvatars.map((avatar, index) => {
          const isOwned =
            myAvatars === null
              ? null
              : myAvatars.some(
                  (myAvatar) => myAvatar.avatar.avatarIdx === avatar.avatarIdx
                );
          return (
            <motion.img
              whileHover={{
                scale: isOwned ? 1.1 : 1,
              }}
              onClick={async ()=>{
                if(isOwned){
                  let idx = myAvatars.findIndex((data) => data.currentUse === true);
                  if(idx === -1){
                    idx = 0;
                  }else{
                    idx = myAvatars[idx].avatar.avatarIdx;
                  }
  
                  const data = await modifyAvatarAxios({beforeAvatarIdx : idx, afterAvatarIdx : avatar.avatarIdx})
                  if(data){
                    dispatch(setStudentAvatars(data));
                  }
                  dispatch(changeCurrentAvatar(avatar.avatarFile))
                  setIsAvatar(true);
                }
              }}
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
      <Cam
        left="55vw"
        top="40vh"
        width="20vw"
        height="30vh"
        isAvatar={isAvatar}
        setIsAvatar={setIsAvatar}
      />
      <BtnContainer isAvatar={isAvatar} setIsAvatar={setIsAvatar} />
      <ChangeNation setSelectedCountry={setSelectedCountry} />
    </div>
  );
}
