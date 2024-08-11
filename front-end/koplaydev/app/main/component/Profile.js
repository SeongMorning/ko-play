"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.scss";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { motion } from "framer-motion";
import ExpBar from "./ExpBar";
import { useEffect } from "react";
import studentInfo from "../../axios/studentInfo";
import { changeStudentInfo } from "@/redux/slices/studentInfoSlice";
import allAvatarAxios from "@/app/axios/allAvatarAxios";
import { setAvatars } from "@/redux/slices/avatarSlice";
import myAvatarAxios from "@/app/axios/myAvatarAxios";
import { setStudentAvatars } from "@/redux/slices/studentAvatarSlice"
import { changeListenLevel, changeReadLevel, changeSpeechLevel } from "@/redux/slices/levelSlice";
import { changeLoadingIdx } from "@/redux/slices/loadingSlice";
import effectSound from '@/app/utils/effectSound'

const slowMouseClickSound = '/audios/slowMouseClickSound.mp3';


export default function Profile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.studentInfo);
  const avatar = useSelector((state) => state.avatar);
  const myAvatar = useSelector((state) => state.myAvatar);
  const modal = useSelector((state) => state.modal);
  const es = effectSound(slowMouseClickSound, 0.5);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      const response = await studentInfo();
      if (response) {
        dispatch(changeStudentInfo(response)); // Redux 상태 업데이트
        // console.log('userinfo받아오기 성공');
      }
    };
    const fetchAllAvatarInfo = async () => {
      const response = await allAvatarAxios();
      if (response) {
        dispatch(setAvatars(response)); // Redux 상태 업데이트
        // console.log('userinfo받아오기 성공');
      }
    };

    const fetchMyAvatarInfo = async () => {
      const response = await myAvatarAxios();
      if (response) {
        dispatch(setStudentAvatars(response)); // Redux 상태 업데이트
        // console.log('userinfo받아오기 성공');
      }
    };

    fetchStudentInfo(); // 비동기 함수 호출
    fetchAllAvatarInfo();
    fetchMyAvatarInfo();

    dispatch(changeLoadingIdx(-1))
  }, []);

  useEffect(()=>{
    dispatch(changeListenLevel(userInfo.listeningLevel));
    dispatch(changeSpeechLevel(userInfo.speechLevel));
    dispatch(changeReadLevel(userInfo.readingLevel));

    if(!userInfo.visited){
      dispatch(changeModalIdx(1000))
    }else{
      if(modal != 2){
        dispatch(changeModalIdx(0));
      }
    }
  }, [userInfo])
  return (
    <motion.div
      className={styles.profile}
      whileHover={{
        scale: 1.05,
        background: "rgba(255, 255, 255, 1)",
      }}
      onClick={() => {
        es.play();
        dispatch(changeModalIdx(2));
      }}
    >
      <div className={styles.pictureBox}>
        <img
          src={userInfo.profileImg || "hehe.png"}
          onError={(e) => { e.target.src = "hehe.png"; }}
        />
      </div>

      <div className={styles.profileInfo}>
        <div className={styles.ExpBar}>
          <span>Lv.{Math.floor(userInfo.exp / 100) + 1}</span>
          <ExpBar />
        </div>
        <span className={styles.nickname}>{userInfo.nickname}</span>
        <span className={styles.games}>총 게임수 : 13판</span>
        <span className={styles.avatar}>
          열린코스튬 {myAvatar.avatars.length ? myAvatar.avatars.length : 0}/{avatar.avatars.length}
        </span>
      </div>
    </motion.div>
  );
}
