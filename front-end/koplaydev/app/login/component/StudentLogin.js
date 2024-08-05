"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./StudentLogin.module.scss";
import login from "../../axios/login"

export default function StudentLogin() {
  const router = useRouter();

  // 각각의 입력 필드에 대한 useRef 선언
  const idRef = useRef(null);
  const passwordRef = useRef(null);

  // 버튼 클릭 시 실행되는 함수
  const handleClick = async () => {
    const formData = new FormData();

    // 입력 필드의 값을 올바르게 가져와서 FormData에 추가
    formData.append('id', idRef.current.value);
    formData.append('password', passwordRef.current.value);
    // 값 확인을 위해 콘솔에 출력
    const response = await login(formData);

    if(response != null){
      //null이 아니면 성공
      // 첫방문인지 확인하고 모달띄울지 말지 정해주기
      router.push("/main")
    }
  };

  return (
    <>
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
