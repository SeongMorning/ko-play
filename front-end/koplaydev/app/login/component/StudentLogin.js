"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./StudentLogin.module.scss";
import login from "../../axios/login";
import YellowBox from "@/app/component/boxes/YellowBox";
import LoginModalBtn from "./LoginModalBtn";
import {motion} from 'framer-motion';
import student from "@/app/axios/studentInfo";
import { useDispatch, useSelector } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { changeStudentInfo } from "@/redux/slices/studentInfoSlice";
import effectSound from '@/app/utils/effectSound'

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';
const keydownSound = "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/keydownSound.wav";

export default function StudentLogin() {
  const translationWords = useSelector((state) => state.translationWords);

  const router = useRouter();
  const dispatch = useDispatch();
  // 각각의 입력 필드에 대한 useRef 선언
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginModal, setLoginModal] = useState(0);
  const buttonEs = effectSound(buttonSound, 1);
  const keydownEs = effectSound(keydownSound, 1);

  // 버튼 클릭 시 실행되는 함수
  const handleClick = async () => {
    buttonEs.play();
    const formData = new FormData();

    // 입력 필드의 값을 올바르게 가져와서 FormData에 추가
    formData.append("id", idRef.current.value);
    formData.append("password", passwordRef.current.value);
    // 값 확인을 위해 콘솔에 출력
    const response = await login(formData);
    console.log(response)
    if (response != null) {
      //null이 아니면 성공
      let userInfo = await student();
      if(!userInfo.visited){
        dispatch(changeModalIdx(1000));
        dispatch(changeStudentInfo(userInfo));
      }else{
        dispatch(changeModalIdx(0));
        dispatch(changeStudentInfo(userInfo));
      }
      setLoginModal(1);
    } else {
      setLoginModal(-1);
    }
  };

  return (
    <>
      {loginModal === -1 && (
        <motion.div 
        className={styles.loginModal}
        initial={{
          translateY : "5px",
          opacity : 0
        }}

        animate={{
          translateY : "0px",
          opacity : 1
        }}
        >
          <YellowBox width="30" height="30">
            <div className={styles.textBox}>
              <span className={styles.text1}>{translationWords.loginFail}</span>
              <span className={styles.text2}>
                {translationWords.loginFailInfo}
              </span>
              <div className={styles.btn}>
                <LoginModalBtn
                  width={"30"}
                  height={"50"}
                  bg="#ffb703"  
                  shadow="#fb8500"
                  loginModal={loginModal}
                  setLoginModal={setLoginModal}
                >
                  <span>{translationWords.check}</span>
                </LoginModalBtn>
              </div>
            </div>
          </YellowBox>
        </motion.div>
      )}
      {loginModal === 1 && (
        <motion.div 
        className={styles.loginModal}
        initial={{
          translateY : "5px",
          opacity : 0
        }}

        animate={{
          translateY : "0px",
          opacity : 1
        }}
        >
          <YellowBox width="30" height="30">
            <div className={styles.textBox}>
              <span className={styles.text3}>{translationWords.loginSuccess}</span>
              <span className={styles.text2}>
                {translationWords.loginSuccessInfo}
              </span>
              <div className={styles.btn}>
                <LoginModalBtn
                  width={"30"}
                  height={"50"}
                  bg="#e4c1f9"
                  shadow="#9b5de5"
                  loginModal={loginModal}
                  setLoginModal={setLoginModal}
                >
                  <span>{translationWords.check}</span>
                </LoginModalBtn>
              </div>
            </div>
          </YellowBox>
        </motion.div>
      )}
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <div className={styles.inputs}>
            <input
              className={styles.idInput}
              type="text"
              id="username" // 고유한 ID 설정
              ref={idRef}
              placeholder={translationWords.idPlaceholder}
              onKeyDown={(event) => {
                keydownEs.play();
                if (event.key === "Enter") {
                  handleClick();
                }
              }}
            />
            <input
              className={styles.pwInput}
              type="password"
              id="password" // 고유한 ID 설정
              ref={passwordRef}
              placeholder={translationWords.pwPlaceholder}
              onKeyDown={(event) => {
                keydownEs.play();
                if (event.key === "Enter") {
                  handleClick();
                }
              }}
              required
            />
          </div>
          <button className={styles.loginBtn} onClick={handleClick}>
            {translationWords.login}
          </button>
        </div>
        <div className={styles.infoText}>
        {translationWords.loginInfo}
        </div>
      </div>
    </>
  );
}
