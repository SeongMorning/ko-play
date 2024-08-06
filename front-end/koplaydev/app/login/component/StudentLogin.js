"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./StudentLogin.module.scss";
import login from "../../axios/login";
import YellowBox from "@/app/component/boxes/YellowBox";
import LoginModalBtn from "./LoginModalBtn";
import {motion} from 'framer-motion';

export default function StudentLogin() {
  const router = useRouter();

  // 각각의 입력 필드에 대한 useRef 선언
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginModal, setLoginModal] = useState(0);

  // 버튼 클릭 시 실행되는 함수
  const handleClick = async () => {
    const formData = new FormData();

    // 입력 필드의 값을 올바르게 가져와서 FormData에 추가
    formData.append("id", idRef.current.value);
    formData.append("password", passwordRef.current.value);
    // 값 확인을 위해 콘솔에 출력
    const response = await login(formData);

    if (response != null) {
      //null이 아니면 성공
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
              <span className={styles.text1}>로그인 실패</span>
              <span className={styles.text2}>
                아이디 및 비밀번호를 확인하세요.
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
                  <span>확 인</span>
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
              <span className={styles.text3}>로그인 성공</span>
              <span className={styles.text2}>
                KoPlay에 오신 것을 환영합니다.
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
                  <span>확 인</span>
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
              placeholder="아이디를 입력하세요"
              onKeyDown={(event) => {
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
              placeholder="비밀번호를 입력하세요"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleClick();
                }
              }}
              required
            />
          </div>
          <button className={styles.loginBtn} onClick={handleClick}>
            로그인
          </button>
        </div>
        <div className={styles.infoText}>
          아이디와 비밀번호는 부모님 계정에서 발급 가능합니다.
        </div>
      </div>
    </>
  );
}
