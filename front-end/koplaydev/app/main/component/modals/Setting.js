"use client";

import YellowBox from "@/app/component/boxes/YellowBox";
import styles from "./Setting.module.scss";
import WhiteBox from "@/app/component/boxes/WhiteBox";
import { useDispatch, useSelector } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import {
  setSchoolName,
  setNickname,
  setProfileImg,
} from "@/redux/slices/studentInfoSlice";
import { useEffect, useState, useRef } from "react";
import modifyStudentInfo from "../../../axios/modifyStudentInfoAxios";
import modifyStudentInfoImg from "../../../axios/modifyStudentInfoImgAxios";
import PwPinkBox from "../PwPinkBox";
import { motion } from "framer-motion";
import effectSound from "@/app/utils/effectSound";

const buttonSound =
  "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3";
const mouseClickSound =
  "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/mouseClickSound.mp3";
const pencilSound =
  "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/pencilSound.wav";
const pencilSound2 =
  "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/pencilSound2.wav";

export default function Setting() {
  const translationWords = useSelector((state) => state.translationWords);

  const userInfo = useSelector((state) => state.studentInfo);
  const dispatch = useDispatch();
  const buttonEs = effectSound(buttonSound, 1);
  const mouseClickEs = effectSound(mouseClickSound, 1);
  const pencilEs = effectSound(pencilSound2, 1);

  // 상태 변수 선언
  const [myNickname, setMyNickname] = useState(userInfo.nickname);
  const [mySchoolName, setMySchoolName] = useState(userInfo.schoolName);
  const [pwFlag, setPwFlag] = useState(false);
  const [afterPw, setAfterPw] = useState("");
  const [afterPwOK, setAfterPwOK] = useState("");
  const [isPwChange, setIsPwChange] = useState(false);
  const [profileImg, setProfileImgState] = useState(userInfo.profileImg);
  const fileInputRef = useRef("");

  // userInfo가 변경될 경우 상태 업데이트
  useEffect(() => {
    setMyNickname(userInfo.nickname);
    setMySchoolName(userInfo.schoolName);
    setProfileImgState(userInfo.profileImg);
  }, [userInfo]);

  const nickNameHandleClick = async () => {
    dispatch(setNickname(myNickname));

    const response = await modifyStudentInfo({
      ...userInfo,
      nickname: myNickname,
    });
    if (response != null) {
      console.log("변경완료");
    }
  };
  const schoolNameHandleClick = async () => {
    dispatch(setSchoolName(mySchoolName));

    const response = await modifyStudentInfo({
      ...userInfo,
      schoolName: mySchoolName,
    });
    if (response != null) {
      console.log("변경완료");
    }
  };
  const changeImgClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const imagePath = await modifyStudentInfoImg(file);

    // 백엔드에서 반환된 URL을 프론트엔드의 기본 URL에 맞게 조정
    const newImageUrl = `${process.env.customKey}/static${imagePath}`;
    dispatch(setProfileImg(newImageUrl));
    setProfileImgState(newImageUrl);
  };

  return (
    <>
      {isPwChange ? (
        <YellowBox width="40" height="40">
          <div className={styles.pwChangeModal}>
            <span className={styles.text}>{translationWords.passwordChangeComplete}</span>
            <span className={styles.text2}>
              {translationWords.changePasswordNotification}
            </span>
            <span className={styles.text3}>{translationWords.warning}</span>
            <div className={styles.OKBox}>
              <PwPinkBox
                setPwFlag={setPwFlag}
                pwFlag={pwFlag}
                width={"30"}
                height={"60"}
                bg="#cdb4db"
                shadow="#9b5de5"
                afterPw={afterPw}
                setIsPwChange={setIsPwChange}
                isPwChange={isPwChange}
              >
                <span>{translationWords.check}</span>
              </PwPinkBox>
            </div>
          </div>
        </YellowBox>
      ) : (
        <YellowBox width={"30"} height={"80"}>
          <img
            src="/close.png"
            className={styles.backBtn}
            onClick={() => {
              buttonEs.play();
              dispatch(changeModalIdx(0));
            }}
          ></img>
          <div className={styles.settingMain}>
            <div className={styles.profileBox}>
              <img
                className={styles.profileImg}
                src={`${process.env.customKey}/static${profileImg}`}
                onError={(e) => {
                  e.target.src = "hehe.png";
                }}
              />
              <div>
                <img
                  className={styles.profileSetting}
                  src="/settingIcon2.png"
                  onClick={changeImgClick}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
            </div>
            {pwFlag ? (
              <>
                <WhiteBox width="60" height="10">
                  <input
                    placeholder={translationWords.changePassword}
                    value={afterPw}
                    onChange={(e) => setAfterPw(e.target.value)}
                  />
                </WhiteBox>
                <WhiteBox width="60" height="10">
                  <input
                    placeholder={translationWords.checkpassword}
                    value={afterPwOK}
                    onChange={(e) => setAfterPwOK(e.target.value)}
                  />
                </WhiteBox>
                {/* afterPw.length >= 10 */}
                {afterPw !== "" && afterPw === afterPwOK ? (
                  <PwPinkBox
                    setPwFlag={setPwFlag}
                    pwFlag={pwFlag}
                    width={"60"}
                    height={"10"}
                    bg="#A1D2FF"
                    shadow="#4DA3F2"
                    afterPw={afterPw}
                    setIsPwChange={setIsPwChange}
                    isPwChange={isPwChange}
                  >
                    <span>{translationWords.doChange}</span>
                  </PwPinkBox>
                ) : (
                  <>
                    <PwPinkBox
                      setPwFlag={setPwFlag}
                      pwFlag={pwFlag}
                      width={"60"}
                      height={"10"}
                      bg="#FDD127"
                      shadow="#C89F02"
                      setAfterPw={setAfterPw}
                      setAfterPwOK={setAfterPwOK}
                      afterPw={afterPw}
                      setIsPwChange={setIsPwChange}
                      isPwChange={isPwChange}
                    >
                      <span>{translationWords.cancel}</span>
                    </PwPinkBox>
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "calc((3vw + 2vh)/2)",
                      }}
                    >
                      {translationWords.checkPasswordPleese}
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                <WhiteBox width={"60"} height={"10"}>
                  <input
                    value={myNickname}
                    onChange={(e) => setMyNickname(e.target.value)}
                    placeholder={translationWords.nickname}
                  />
                  <img
                    className={styles.modifyImg}
                    src="/modify.png"
                    onClick={() => {
                      pencilEs.play();
                      nickNameHandleClick();
                    }}
                  />
                </WhiteBox>
                <WhiteBox width={"60"} height={"10"}>
                  <input
                    value={mySchoolName}
                    onChange={(e) => setMySchoolName(e.target.value)}
                    placeholder={translationWords.schoolname}
                  />
                  <img
                    className={styles.modifyImg}
                    src="/modify.png"
                    onClick={() => {
                      pencilEs.play();
                      schoolNameHandleClick();
                    }}
                  />
                </WhiteBox>
                <PwPinkBox
                  setPwFlag={setPwFlag}
                  pwFlag={pwFlag}
                  width={"60"}
                  height={"10"}
                  bg="#FFD6E0"
                  shadow="#df8ca1"
                  setAfterPw={setAfterPw}
                  setAfterPwOK={setAfterPwOK}
                  afterPw={afterPw}
                  setIsPwChange={setIsPwChange}
                  isPwChange={isPwChange}
                >
                  <span>{translationWords.doChangePassword}</span>
                </PwPinkBox>
              </>
            )}
          </div>
        </YellowBox>
      )}
    </>
  );
}
