"use client";

import YellowBox from "@/app/component/boxes/YellowBox";
import styles from "./Setting.module.scss";
import WhiteBox from "@/app/component/boxes/WhiteBox";
import { useDispatch, useSelector } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { setSchoolName, setNickname } from "@/redux/slices/studentInfoSlice";
import { useEffect, useState } from "react";
import modifyStudentInfo from "../../../axios/modifyStudentInfoAxios";
import PwPinkBox from "../PwPinkBox";

export default function Setting() {
  const userInfo = useSelector((state) => state.studentInfo);
  const dispatch = useDispatch();

  // 상태 변수 선언
  const [myNickname, setMyNickname] = useState(userInfo.nickname);
  const [mySchoolName, setMySchoolName] = useState(userInfo.schoolName);
  const [pwFlag, setPwFlag] = useState(false);
  const [afterPw, setAfterPw] = useState("");
  const [afterPwOK, setAfterPwOK] = useState("");

  // userInfo가 변경될 경우 상태 업데이트
  useEffect(() => {
    setMyNickname(userInfo.nickname);
    setMySchoolName(userInfo.schoolName);
  }, [userInfo]);

  const nickNameHandleClick = async () => {
    dispatch(setNickname(myNickname));

    const response = await modifyStudentInfo(userInfo);
    if (response != null) {
      console.log("변경완료");
    }
  };
  const schoolNameHandleClick = async () => {
    dispatch(setSchoolName(mySchoolName));

    const response = await modifyStudentInfo(userInfo);
    if (response != null) {
      console.log("변경완료");
    }
  };

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
          <img
            className={styles.profileImg}
            src={userInfo.profileImg || "/hehe.png"}
            onError={(e) => { e.target.src = "hehe.png"; }}
          />
          <img className={styles.profileSetting} src="/settingIcon2.png" />
        </div>
        {pwFlag ? (
          <>
            <WhiteBox width="60" height="10">
              <input
                placeholder="변경할 비밀번호(10글자 이상)"
                value={afterPw}
                onChange={(e) => setAfterPw(e.target.value)}
              />
            </WhiteBox>
            <WhiteBox width="60" height="10">
              <input
                placeholder="비밀번호 확인"
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
              >
                <span>변 경 하 기</span>
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
                >
                  <span>취 소</span>
                </PwPinkBox>
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "calc((3vw + 2vh)/2)",
                  }}
                >
                  비밀번호를 확인하세요.
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
                placeholder="닉네임"
              />
              <img
                className={styles.modifyImg}
                src="/modify.png"
                onClick={() => nickNameHandleClick()}
              />
            </WhiteBox>
            <WhiteBox width={"60"} height={"10"}>
              <input
                value={mySchoolName}
                onChange={(e) => setMySchoolName(e.target.value)}
                placeholder="학교 이름"
              />
              <img
                className={styles.modifyImg}
                src="/modify.png"
                onClick={() => schoolNameHandleClick()}
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
            >
              <span>비밀번호 재설정</span>
            </PwPinkBox>
          </>
        )}
      </div>
    </YellowBox>
  );
}
