"use client";

import YellowBox from "@/app/component/boxes/YellowBox";
import styles from "./Setting.module.scss";
import WhiteBox from "@/app/component/boxes/WhiteBox";
import { useDispatch, useSelector } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { setSchoolName, setNickname } from "@/redux/slices/studentInfoSlice";
import { useEffect, useState } from "react";
import modifyStudentInfo from "../../../axios/modifyStudentInfoAxios"


export default function Setting() {
  const userInfo = useSelector((state) => state.studentInfo)
  const dispatch = useDispatch();

  // 상태 변수 선언
  const [myNickname, setMyNickname] = useState(userInfo.nickname);
  const [mySchoolName, setMySchoolName] = useState(userInfo.schoolName);

  // userInfo가 변경될 경우 상태 업데이트
  useEffect(() => {
    setMyNickname(userInfo.nickname)
    setMySchoolName(userInfo.schoolName)
  }, [userInfo]);

  const nickNameHandleClick = async()=> {
    dispatch(setNickname(myNickname));

    const response = await modifyStudentInfo(userInfo);
    if(response != null){
      console.log('변경완료')
    }
  }
  const schoolNameHandleClick = async()=> {
    dispatch(setSchoolName(mySchoolName));

    const response = await modifyStudentInfo(userInfo);
    if(response != null){
      console.log('변경완료')
    }
  }

  return (
    <YellowBox width={"30"} height={"80"}>
      <img
        src="/close.png"
        className={styles.backBtn}
        onClick={() => {
          dispatch(changeModalIdx(0));
        }}
      ></img>
      <div className={styles.settingMain}>
        <div className={styles.profileBox}>
          <img className={styles.profileImg} src={userInfo.profileImg == null ? "hehe.png" : userInfo.profileImg}/>
          <img className={styles.profileSetting}src="/settingIcon2.png"/>
        </div>
        <WhiteBox width={"60"} height={"10"}>
          <input value={myNickname}
          onChange={(e) => setMyNickname(e.target.value)} 
          placeholder="닉네임"/>
          <img className={styles.modifyImg} src="/modify.png" onClick={()=>nickNameHandleClick()}/>
        </WhiteBox>
        <WhiteBox width={"60"} height={"10"}>
        <input value={mySchoolName}
        onChange={(e) => setMySchoolName(e.target.value)}
        placeholder="학교 이름"/>
        <img className={styles.modifyImg} src="/modify.png" onClick={()=>schoolNameHandleClick()}/>
        </WhiteBox>
        <WhiteBox width={"60"} height={"10"}>
          <span>비밀번호 재설정</span>
        </WhiteBox>
      </div>
    </YellowBox>
  );
}
